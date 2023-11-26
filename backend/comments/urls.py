from django.urls import path
from  comments import views

urlpatterns = [
    path('create/', views.createComment),
    path('getPaper/<paper_id>/', views.get_comments_for_paper),
    path('updatePaper/<comment_id>/', views.update_comment),
    path('deletePaper/<comment_id>/', views.delete_comment),
]
