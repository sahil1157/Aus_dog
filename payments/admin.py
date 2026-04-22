from django.contrib import admin

from .models import PaymentEvent


@admin.register(PaymentEvent)
class PaymentEventAdmin(admin.ModelAdmin):
    list_display = ("id", "provider", "event_type", "event_id", "created_at")
    search_fields = ("event_id", "event_type")
