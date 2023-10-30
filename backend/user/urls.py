from django.urls import path
from user import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('login', TokenObtainPairView.as_view()),
    path('register', views.user_creation),
]