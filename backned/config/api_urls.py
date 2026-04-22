from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .auth_views import MeView, RegisterView

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="auth-register"),
    path("", include("accounts.urls")),
    path("auth/me/", MeView.as_view(), name="auth-me"),
    path("auth/token/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("", include("catalog.urls")),
    path("", include("shipping.urls")),
    path("", include("orders.urls")),
    path("", include("payments.urls")),
]
