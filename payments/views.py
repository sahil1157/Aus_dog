from django.conf import settings
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

import stripe

from orders.emails import send_order_confirmation
from orders.models import Order

from .models import PaymentEvent


class StripeWebhookView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        payload = request.body
        sig_header = request.META.get("HTTP_STRIPE_SIGNATURE", "")

        stripe.api_key = settings.STRIPE_SECRET_KEY

        if getattr(settings, "STRIPE_WEBHOOK_SECRET", ""):
            try:
                event = stripe.Webhook.construct_event(
                    payload=payload,
                    sig_header=sig_header,
                    secret=settings.STRIPE_WEBHOOK_SECRET,
                )
            except Exception:
                return Response({"detail": "Invalid webhook signature."}, status=400)
        else:
            # Local/dev fallback (no signature verification)
            try:
                event = stripe.Event.construct_from(request.data, stripe.api_key)
            except Exception:
                return Response({"detail": "Invalid webhook payload."}, status=400)

        PaymentEvent.objects.get_or_create(
            event_id=event["id"],
            defaults={
                "provider": "stripe",
                "event_type": event["type"],
                "payload": event,
            },
        )

        if event["type"] == "payment_intent.succeeded":
            intent = event["data"]["object"]
            intent_id = intent.get("id")
            if intent_id:
                order = (
                    Order.objects.select_related("shipping_address")
                    .prefetch_related("items")
                    .filter(stripe_payment_intent_id=intent_id)
                    .first()
                )
                if order and order.status != Order.Status.PAID:
                    order.status = Order.Status.PAID
                    order.save(update_fields=["status", "updated_at"])
                    send_order_confirmation(order=order)

        return Response({"received": True}, status=status.HTTP_200_OK)
