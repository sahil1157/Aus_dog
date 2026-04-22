from __future__ import annotations

import random
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.hashers import check_password, make_password
from django.core.mail import send_mail
from django.utils import timezone

from .models import EmailOTP


def generate_otp() -> str:
    return f"{random.randint(0, 999999):06d}"


def create_email_otp(*, email: str, username: str, raw_password: str) -> tuple[EmailOTP, str]:
    code = generate_otp()
    now = timezone.now()
    row = EmailOTP.objects.create(
        email=email.lower().strip(),
        username=username,
        password_hash=make_password(raw_password),
        otp_hash=make_password(code),
        expires_at=now + timedelta(minutes=10),
    )
    return row, code


def send_otp_email(*, email: str, code: str) -> None:
    send_mail(
        subject="Your AusDog verification code",
        message=f"Your verification code is: {code}\n\nThis code expires in 10 minutes.",
        from_email=getattr(settings, "DEFAULT_FROM_EMAIL", None),
        recipient_list=[email],
        fail_silently=False,
    )


def verify_otp(*, row: EmailOTP, code: str) -> bool:
    if row.used_at is not None:
        return False
    if timezone.now() > row.expires_at:
        return False
    return check_password(code, row.otp_hash)

