from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.hashers import check_password

from django.contrib.auth import get_user_model
from .serializers import *

@api_view(['POST'])
def user_creation(request):
    data = request.data
    if not data.get('username') or not data.get('password') or not data.get('email') or not data.get('profile'):
        return Response({"message": "Please provide all the details"}, status=status.HTTP_400_BAD_REQUEST)
    userExist = User.objects.filter(username=data.get('username')).exists()

    if userExist:
        return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
    else :
        get_user_model().objects.create_user(username=data.get('username'), password=data.get('password'), email=data.get('email'), profile=data.get('profile'))
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
