from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import User
from .serializers import *

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
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_CREATED)
        else:
            return Response({"message": "User data is not in correct format"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_verification(request):
    username = request.query_params.get('username')
    userExist = User.objects.filter(username=username).exists()

    if userExist:
        return Response({"message": "User Exists"}, status=status.HTTP_200_CREATED)
    else :
        return Response({"message": "User doesn't Exist"}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def user_verification(request):
#     response_data = {"message": "Hello"}
#     return Response(response_data, status=status.HTTP_200_OK)
