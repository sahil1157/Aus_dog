from rest_framework import serializers


class CheckoutItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    variant_color = serializers.CharField(max_length=50, required=False, allow_blank=True)
    quantity = serializers.IntegerField(min_value=1, max_value=99)


class ShippingAddressInputSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=255)
    address_line1 = serializers.CharField(max_length=255)
    address_line2 = serializers.CharField(max_length=255, required=False, allow_blank=True)
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100, required=False, allow_blank=True)
    postal_code = serializers.CharField(max_length=20)
    country = serializers.CharField(max_length=2)
    phone = serializers.CharField(max_length=30, required=False, allow_blank=True)


class CreateCheckoutSerializer(serializers.Serializer):
    items = CheckoutItemInputSerializer(many=True, allow_empty=False)
    shipping_address = ShippingAddressInputSerializer()
