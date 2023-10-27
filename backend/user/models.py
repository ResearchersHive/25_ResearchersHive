from django.db import models
from django.utils import timezone
# from django.contrib.auth.models import AbstractUser

class User(models.Model):
    username = models.CharField("username", max_length=240, default="username")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    profile = models.CharField(max_length=10,default="scholar")
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.username

