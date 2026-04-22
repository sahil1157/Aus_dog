from django.contrib import admin

from .models import ShippingRate


@admin.register(ShippingRate)
class ShippingRateAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "country", "state", "postal_prefix", "amount", "currency", "priority", "is_active")
    list_filter = ("is_active", "country", "currency")
    search_fields = ("name", "country", "state", "postal_prefix")
