from __future__ import annotations

from dataclasses import dataclass

from .models import ShippingRate


@dataclass(frozen=True)
class ShippingQuote:
    amount: int
    currency: str
    rate_name: str


def quote_shipping(*, country: str, state: str = "", postal_code: str = "") -> ShippingQuote:
    country = (country or "").upper().strip()
    state = (state or "").strip()
    postal_code = (postal_code or "").strip()

    qs = ShippingRate.objects.filter(is_active=True)
    if country:
        qs = qs.filter(country__in=["", country])
    else:
        qs = qs.filter(country="")

    if state:
        qs = qs.filter(state__in=["", state])
    else:
        qs = qs.filter(state="")

    matches = []
    for rate in qs.order_by("priority", "id"):
        if rate.postal_prefix and not postal_code.startswith(rate.postal_prefix):
            continue
        matches.append(rate)

    if matches:
        # choose most specific prefix among best priority bucket
        best_priority = matches[0].priority
        bucket = [r for r in matches if r.priority == best_priority]
        bucket.sort(key=lambda r: len(r.postal_prefix or ""), reverse=True)
        chosen = bucket[0]
        return ShippingQuote(amount=chosen.amount, currency=chosen.currency, rate_name=chosen.name)

    # fallback simple defaults if table is empty
    if country == "AU":
        return ShippingQuote(amount=899, currency="aud", rate_name="Australia standard")
    return ShippingQuote(amount=2499, currency="aud", rate_name="International standard")
