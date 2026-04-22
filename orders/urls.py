from django.urls import path

from .views import CreateCheckoutView

urlpatterns = [
    path("checkout/create/", CreateCheckoutView.as_view(), name="checkout-create"),
]
