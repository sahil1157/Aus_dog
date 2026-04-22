from django.contrib import admin

from .models import Product, ProductVariant


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 0


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category", "price", "is_active", "updated_at")
    list_filter = ("is_active", "category")
    search_fields = ("name", "category")
    inlines = [ProductVariantInline]
