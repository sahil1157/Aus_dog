from __future__ import annotations

from dataclasses import dataclass

from rest_framework import serializers

from catalog.models import Product, ProductVariant


@dataclass(frozen=True)
class PricedItem:
    product: Product
    variant: ProductVariant | None
    quantity: int
    unit_amount: int  # cents


def money_to_cents(value) -> int:
    # Django Decimal -> cents
    return int(round(float(value) * 100))


def build_priced_items(*, items: list[dict]) -> list[PricedItem]:
    priced: list[PricedItem] = []
    for item in items:
        try:
            product = Product.objects.get(id=item["product_id"], is_active=True)
        except Product.DoesNotExist as exc:
            raise serializers.ValidationError(
                {"items": [f"Unknown product_id {item['product_id']}"]}
            ) from exc
        variant = None
        color = (item.get("variant_color") or "").strip()
        if color:
            try:
                variant = ProductVariant.objects.get(product=product, color=color)
            except ProductVariant.DoesNotExist as exc:
                raise serializers.ValidationError(
                    {"items": [f"Unknown variant_color '{color}' for product_id {product.id}"]}
                ) from exc
        priced.append(
            PricedItem(
                product=product,
                variant=variant,
                quantity=int(item["quantity"]),
                unit_amount=money_to_cents(product.price),
            )
        )
    return priced


def subtotal_amount(priced_items: list[PricedItem]) -> int:
    return sum(pi.unit_amount * pi.quantity for pi in priced_items)
