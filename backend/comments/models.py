from django.db import models
from djongo import models
from paperInfo.models import PaperInfo
from user.models import User
# Create your models here.


class CommentsCache(models.Model):
    papername = models.CharField(max_length=255)
    comment_id = models.AutoField(primary_key=True)
    user = models.CharField(max_length=255)
    text = models.TextField()
    

    class Meta:
        db_table = 'comment_db'