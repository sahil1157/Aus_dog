from __future__ import annotations

from django.conf import settings
from django.core.mail import send_mail


def send_order_email(*, to_email: str, subject: str, body: str) -> None:
    send_mail(
        subject=subject,
        message=body,
        from_email=getattr(settings, "DEFAULT_FROM_EMAIL", None),
        recipient_list=[to_email],
        fail_silently=False,
    )


def send_order_confirmation(*, order) -> None:
    lines = []
    lines.append(f"Thanks for your order #{order.id}!")
    lines.append("")
    lines.append("Items:")
    for item in order.items.all():
        lines.append(
            f"- {item.product_name} ({item.variant_color}) x{item.quantity} "
            f"= {item.line_total_amount() / 100:.2f} {order.currency.upper()}"
        )
    lines.append("")
    lines.append(f"Subtotal: {order.subtotal_amount / 100:.2f} {order.currency.upper()}")
    lines.append(f"Shipping: {order.shipping_amount / 100:.2f} {order.currency.upper()}")
    lines.append(f"Total:    {order.total_amount / 100:.2f} {order.currency.upper()}")
    lines.append("")
    if hasattr(order, "shipping_address"):
        addr = order.shipping_address
        lines.append("Shipping address:")
        lines.append(addr.full_name)
        lines.append(addr.address_line1)
        if addr.address_line2:
            lines.append(addr.address_line2)
        lines.append(f"{addr.city} {addr.state} {addr.postal_code}")
        lines.append(addr.country)

    send_order_email(
        to_email=order.email,
        subject=f"AusDog Order Confirmation #{order.id}",
        body="\n".join(lines),
    )
