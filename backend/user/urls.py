from django.urls import path
from user import views

urlpatterns = [
    path('login',views.user_verification),
    path('register',views.user_creation),
]
