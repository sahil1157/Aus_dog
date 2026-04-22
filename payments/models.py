from django.db import models

class PaymentEvent(models.Model):
    """
    Minimal audit log of payment provider callbacks (e.g., Stripe webhooks).
    """

    provider = models.CharField(max_length=50, default="stripe")
    event_id = models.CharField(max_length=255, unique=True)
    event_type = models.CharField(max_length=255)
    payload = models.JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)
