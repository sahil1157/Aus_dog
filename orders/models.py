from django.db import models
from django.conf import settings


class Order(models.Model):
    class Status(models.TextChoices):
        CREATED = "created", "Created"
        REQUIRES_PAYMENT = "requires_payment", "Requires payment"
        PAID = "paid", "Paid"
        CANCELLED = "cancelled", "Cancelled"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="orders"
    )
    email = models.EmailField()

    currency = models.CharField(max_length=10, default="aud")
    subtotal_amount = models.PositiveIntegerField(default=0)  # cents
    shipping_amount = models.PositiveIntegerField(default=0)  # cents
    total_amount = models.PositiveIntegerField(default=0)  # cents

    status = models.CharField(max_length=32, choices=Status.choices, default=Status.CREATED)

    stripe_payment_intent_id = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Order #{self.id} ({self.status})"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)

    product_id = models.IntegerField()
    product_name = models.CharField(max_length=255)
    variant_color = models.CharField(max_length=50, blank=True)
    image = models.URLField(blank=True)

    unit_price_amount = models.PositiveIntegerField()  # cents
    quantity = models.PositiveIntegerField(default=1)

    def line_total_amount(self) -> int:
        return int(self.unit_price_amount) * int(self.quantity)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, related_name="shipping_address", on_delete=models.CASCADE)

    full_name = models.CharField(max_length=255)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=2, help_text="ISO 3166-1 alpha-2 (e.g. AU)")

    phone = models.CharField(max_length=30, blank=True)
