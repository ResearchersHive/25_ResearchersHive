from django.urls import path
from user import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('login', TokenObtainPairView.as_view()),
    path('register', views.user_creation),
    path('info', views.user_info),
    path('<int:id>/papers/<paper_id>/', views.addPaper),
    path('<int:id>/papers', views.showPapers)
]
