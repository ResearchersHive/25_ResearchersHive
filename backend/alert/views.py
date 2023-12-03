from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request

from comments.models import CommentsCache
from paperInfo.models import PaperInfo

@api_view(['POST'])
def alert_api(request):
    print(request.body)
    current_keyword = request.data.get('keywords').split(',')

    user=request.data.get('user')
    print(current_keyword)
    # Retrieve comments from the entire database
    all_keywords = CommentsCache.objects.filter(user=user)
    print(all_keywords.query)
    # Create a list to store papers with matching keywords
    matching_papers = []
    for key in all_keywords:
        comment_keyword=key.keyword.split(',')
        print(comment_keyword)
        matched_keywords=set(current_keyword).intersection(set(comment_keyword))
        if(len(matched_keywords)>=3):
            title=PaperInfo.objects.get(paperId=key.paper_id)
            matching_papers.append(title.title)
            #print({paper_info})
    #print(matching_papers)      
    if matching_papers:
        alert_message = {
            'alert': 'Matching keywords found in papers read by you',
            'matching_comments': matching_papers,
        }
        #return Response({'success': 'Comment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        return Response(alert_message)
    return Response(status=status.HTTP_204_NO_CONTENT)

