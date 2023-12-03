from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

import google.generativeai as palm
from dotenv import load_dotenv

from features.utils import get_conferences
from features.serializers import ConferenceSerializer

import os

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_rewrite(request):
    if request.method == 'POST':
        load_dotenv('../.env')
        palm_api_key = os.getenv('PALM_KEY')
        if palm_api_key is None:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'error': 'Internal server error'})
        if 'text' not in request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': 'text is required'})
        palm.configure(api_key=palm_api_key)
        completion = palm.generate_text(
            model='models/text-bison-001',
            prompt="You're helping a researcher rewrite a comment they've written about a paper. Rewrite the following comment in a clear and concise way: " + request.data['text'],
            max_output_tokens=200
        )
        return Response(status=status.HTTP_200_OK, data={'rewritten_text': completion.result})

@api_view(['GET'])
def upcoming_conferences(request):
    if request.method == 'GET':
        conferences = get_conferences()
        serializer = ConferenceSerializer(conferences, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': 'only GET method is supported'})