from django.conf import settings
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

import stripe

from shipping.services import quote_shipping

from .models import Order, OrderItem, ShippingAddress
from .serializers import CreateCheckoutSerializer
from .services import build_priced_items, subtotal_amount


class CreateCheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CreateCheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if not getattr(settings, "STRIPE_SECRET_KEY", ""):
            return Response(
                {"detail": "Stripe is not configured (missing STRIPE_SECRET_KEY)."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        priced_items = build_priced_items(items=serializer.validated_data["items"])
        subtotal = subtotal_amount(priced_items)

        addr = serializer.validated_data["shipping_address"]
        shipping_quote = quote_shipping(
            country=addr["country"], state=addr.get("state", ""), postal_code=addr.get("postal_code", "")
        )
        shipping_amount = int(shipping_quote.amount)
        total_amount = int(subtotal) + int(shipping_amount)

        order = Order.objects.create(
            user=request.user,
            email=getattr(request.user, "email", "") or request.user.username,
            currency=shipping_quote.currency,
            subtotal_amount=subtotal,
            shipping_amount=shipping_amount,
            total_amount=total_amount,
            status=Order.Status.REQUIRES_PAYMENT,
        )

        for pi in priced_items:
            OrderItem.objects.create(
                order=order,
                product_id=pi.product.id,
                product_name=pi.product.name,
                variant_color=pi.variant.color if pi.variant else "",
                image=(pi.variant.images[0] if pi.variant and pi.variant.images else ""),
                unit_price_amount=pi.unit_amount,
                quantity=pi.quantity,
            )

        ShippingAddress.objects.create(order=order, **addr)

        stripe.api_key = settings.STRIPE_SECRET_KEY
        intent = stripe.PaymentIntent.create(
            amount=total_amount,
            currency=order.currency,
            automatic_payment_methods={"enabled": True},
            metadata={"order_id": str(order.id)},
            receipt_email=order.email if "@" in order.email else None,
        )

        order.stripe_payment_intent_id = intent["id"]
        order.save(update_fields=["stripe_payment_intent_id", "updated_at"])

        return Response(
            {
                "order_id": order.id,
                "currency": order.currency,
                "amount": total_amount,
                "client_secret": intent["client_secret"],
                "shipping": {
                    "amount": shipping_amount,
                    "rate_name": shipping_quote.rate_name,
                },
            }
        )
from django.shortcuts import render

# Create your views here.
