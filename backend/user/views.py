from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.hashers import check_password

from .models import User
from .serializers import *
import bcrypt

# @api_view(['GET', 'POST'])
# def users_list(request):
#     if request.method == 'GET':
#         data = User.objects.all()

#         serializer = UserSerializer(data, context={'request': request}, many=True)

#         return Response(serializer.data)

@api_view(['POST'])
def user_creation(request):
    data = request.data
    userExist = User.objects.filter(username=data.get('username')).exists()

    if userExist:
        return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
    else :
        password = data.get('password')
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        data['password'] = hashed_password.decode('utf-8')
        print(data['password'])
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "User data is not in correct format"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_verification(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    print(f"Provided username: {email}")
    print(f"Provided [pass]: {password}")

    try:
        user = User.objects.get(email=email)
      #  passwrd = User.objects.get(username=username)
        if user.check_password(password):
            dic = {}
            dic["message"] = "User authenticated"
            dic["profile"] = user.profile
            return Response(dic, status=status.HTTP_200_OK)
        else:
             return Response({"message": "Password mismatch"}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({"message": "User doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

   

# @api_view(['GET'])
# def user_verification(request):
#     response_data = {"message": "Hello"}
#     return Response(response_data, status=status.HTTP_200_OK)
