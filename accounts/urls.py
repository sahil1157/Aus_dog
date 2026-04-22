from django.urls import path

from .views import RegisterStartView, RegisterVerifyView

urlpatterns = [
    path("auth/register/start/", RegisterStartView.as_view(), name="auth-register-start"),
    path("auth/register/verify/", RegisterVerifyView.as_view(), name="auth-register-verify"),
]

