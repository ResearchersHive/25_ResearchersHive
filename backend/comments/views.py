from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from django.shortcuts import get_object_or_404

from comments.models import CommentsCache
from paperInfo.models import PaperInfo

# Create your views here.
@api_view(['POST'])
def createComment(request):
    if request.method == 'POST':
       
            print(request.body)
            print(request.data.get('paper_id'))
            #return Response({'success': 'Comment created successfully'}, status=status.HTTP_201_CREATED)
            paper_id = request.data.get('paper_id')
# print(paper_id,"Hi")
            #try:
            paper_info = PaperInfo.objects.get(paperId=paper_id)
            #print({paper_info})
            
            if paper_info:
             user=request.data.get('user')
             text=request.data.get('text')
             comment = CommentsCache(
             papername=paper_id,
             user=user,
             text=text,
        )  
              
             comment.save()
            else:
           # except PaperInfo.DoesNotExist:
              return Response({'error': f'PaperInfo with paper_id {paper_id} does not exist'}, status=status.HTTP_404_NOT_FOUND)

        # Create and save the Comment object directly
            

            return Response({'success': 'Comment created successfully'}, status=status.HTTP_201_CREATED)
    return Response({'error': 'Only POST method is supported'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_comments_for_paper(request, paper_id):
    if request.method == 'GET':
       try:
        pid=paper_id
        print(pid)
        paper_info = get_object_or_404(PaperInfo, paperId=pid)
        print(paper_info)
        comments = CommentsCache.objects.filter(papername=pid).values('comment_id', 'user', 'text')  # Add other fields as needed

        return Response(comments, status=status.HTTP_200_OK)
       except PaperInfo.DoesNotExist:
        return Response({'error': f'PaperInfo with paper_id {paper_id} does not exist'}, status=status.HTTP_404_NOT_FOUND)

        
       # return Response(status=status.HTTP_200_OK)
    return Response({'error': 'Only GET method is supported'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_comment(request,comment_id):
    if request.method == 'PUT':
        try:
            comment = CommentsCache.objects.get(comment_id=comment_id)
        except CommentsCache.DoesNotExist:
            return Response({'error': f'Comment with comment_id {comment_id} does not exist'}, status=status.HTTP_404_NOT_FOUND)

        # Update the comment with the provided data
        comment.user = request.data.get('user', comment.user)
        comment.text = request.data.get('text', comment.text)
        # Update other fields as needed

        comment.save()

        return Response({'success': 'Comment updated successfully'}, status=status.HTTP_200_OK)

    return Response({'error': 'Only PUT method is supported'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_comment(request, comment_id):
    if request.method == 'DELETE':
        try:
            comment = CommentsCache.objects.get(comment_id=comment_id)
        except CommentsCache.DoesNotExist:
            return Response({'error': f'Comment with comment_id {comment_id} does not exist'}, status=status.HTTP_404_NOT_FOUND)

        comment.delete()
        return Response({'success': 'Comment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    return Response({'error': 'Only DELETE method is supported'}, status=status.HTTP_400_BAD_REQUEST)