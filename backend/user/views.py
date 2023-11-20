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

@api_view(['POST'])
def addPaper(request, id, paper_id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({"error": "User doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

    papers = user.papers.split(',') if user.papers else []
    paper_id_str = str(paper_id)
    if paper_id not in papers:
        papers.append(paper_id_str)
        user.papers = ','.join(papers)
        user.save()
        return Response({"message": f"Paper {paper_id} added successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": f"Paper {paper_id} already exists for the user"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def showPapers(request, id):
    print("----------",id)
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({"error": "User doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

    papers = user.papers.split(',') if user.papers else []
    return Response({"message": f"Papers : {user.papers}"}, status=status.HTTP_200_OK)