from django.contrib.auth import get_user_model
from rest_framework import permissions, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import EmailOTP
from .services import create_email_otp, send_otp_email, verify_otp


User = get_user_model()


class RegisterStartSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)


class RegisterVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(min_length=6, max_length=6)


class RegisterStartView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterStartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        email = data["email"].lower().strip()
        username = data["username"]

        if User.objects.filter(username=username).exists():
            return Response({"detail": "Username already exists."}, status=400)
        if User.objects.filter(email=email).exists():
            return Response({"detail": "Email already exists."}, status=400)

        row, code = create_email_otp(email=email, username=username, raw_password=data["password"])
        send_otp_email(email=email, code=code)
        return Response({"pending_id": row.id, "email": email}, status=status.HTTP_201_CREATED)


class RegisterVerifyView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        email = data["email"].lower().strip()

        row = EmailOTP.objects.filter(email=email).order_by("-id").first()
        if not row:
            return Response({"detail": "No OTP request found for this email."}, status=400)

        if not verify_otp(row=row, code=data["otp"]):
            return Response({"detail": "Invalid or expired OTP."}, status=400)

        user = User.objects.create(username=row.username, email=row.email, password=row.password_hash)
        row.used_at = user.date_joined
        row.save(update_fields=["used_at"])

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "user": {"id": user.id, "username": user.username, "email": user.email},
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )
