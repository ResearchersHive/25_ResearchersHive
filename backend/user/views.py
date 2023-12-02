from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password

from django.contrib.auth import get_user_model
from .serializers import *
from paperInfo.utils import paperInfo

@api_view(['POST'])
def user_creation(request):
    data = request.data
    if not data.get('username') or not data.get('password') or not data.get('email') :
        return Response({"message": "Please provide all the details"}, status=status.HTTP_400_BAD_REQUEST)
    userExist = User.objects.filter(username=data.get('username')).exists()

    if userExist:
        return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
    else :
        get_user_model().objects.create_user(username=data.get('username'), password=data.get('password'), email=data.get('email'), profile=data.get('profile'))
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addPaper(request, id, paper_id):
    if id != request.user.id:
        return Response({"error": "You are not allowed to add paper to this account"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({"error": "User doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

    papers = user.papers.split(',') if user.papers else []
    paper_id_str = str(paper_id)
    print("4321")
    print(papers)
    print(paper_id_str)
    paper_Info = paperInfo(paper_id_str)
    if "error" in paper_Info:
        return Response({"error": f"Paper Id : {paper_id} is incorrect"}, status=status.HTTP_400_BAD_REQUEST)
    print(paper_Info)
    if paper_id not in papers:
        papers.append(paper_id_str)
        user.papers = ','.join(papers)
        user.save()
    return Response(status=status.HTTP_200_OK, data=paper_Info)
    
@api_view(['GET'])
def showPapers(request, id):
    print("----------",id)
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({"error": "User doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

    papers = user.papers.split(',') if user.papers else []
    return Response({"message": f"Papers : {user.papers}"}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    return Response(status=status.HTTP_200_OK, data={
        'username': user.username,
        'email': user.email,
        'profile': user.profile,
        'id': user.id,
    })