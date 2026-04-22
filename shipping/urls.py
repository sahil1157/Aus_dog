from django.urls import path

from .views import ShippingQuoteView

urlpatterns = [
    path("shipping/quote/", ShippingQuoteView.as_view(), name="shipping-quote"),
]
