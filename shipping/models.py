from django.db import models

class ShippingRate(models.Model):
    """
    Simple delivery fee table.
    If a country is set, it must match the destination country (ISO2).
    If postal_prefix is set, destination postal code must start with it.
    The most specific match wins.
    """

    name = models.CharField(max_length=100)
    country = models.CharField(max_length=2, blank=True)
    state = models.CharField(max_length=100, blank=True)
    postal_prefix = models.CharField(max_length=10, blank=True)
    amount = models.PositiveIntegerField(help_text="Fee in cents")
    currency = models.CharField(max_length=10, default="aud")
    is_active = models.BooleanField(default=True)

    priority = models.PositiveIntegerField(
        default=100, help_text="Lower means chosen first"
    )

    def __str__(self) -> str:
        return self.name
