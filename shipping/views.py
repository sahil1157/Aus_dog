from rest_framework import permissions, serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import quote_shipping


class ShippingQuoteInputSerializer(serializers.Serializer):
    country = serializers.CharField(max_length=2)
    state = serializers.CharField(max_length=100, required=False, allow_blank=True)
    postal_code = serializers.CharField(max_length=20, required=False, allow_blank=True)


class ShippingQuoteView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ShippingQuoteInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        quote = quote_shipping(**serializer.validated_data)
        return Response(
            {
                "amount": quote.amount,
                "currency": quote.currency,
                "rate_name": quote.rate_name,
            }
        )
from django.shortcuts import render

# Create your views here.
