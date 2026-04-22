from django.db import models

class EmailOTP(models.Model):
    email = models.EmailField(db_index=True)
    username = models.CharField(max_length=150)
    password_hash = models.CharField(max_length=128)

    otp_hash = models.CharField(max_length=128)
    expires_at = models.DateTimeField()
    used_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
