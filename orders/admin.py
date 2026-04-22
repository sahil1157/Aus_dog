from django.contrib import admin

from .models import Order, OrderItem, ShippingAddress


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


class ShippingAddressInline(admin.StackedInline):
    model = ShippingAddress
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "status", "total_amount", "currency", "created_at")
    list_filter = ("status", "currency")
    search_fields = ("email", "stripe_payment_intent_id")
    inlines = [OrderItemInline, ShippingAddressInline]
