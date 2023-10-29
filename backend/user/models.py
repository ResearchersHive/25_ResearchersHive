import bcrypt
from django.db import models
from django.utils import timezone

class User(models.Model):
    username = models.CharField("username", max_length=240, default="username")
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    profile = models.CharField(max_length=10,default="scholar")
    created_at = models.DateTimeField(default=timezone.now)
    
    def set_password(self, originalPassword):
        hashed_password = bcrypt.hashpw(originalPassword.encode('utf-8'), bcrypt.gensalt())
        self.password = hashed_password.decode('utf-8')

    def check_password(self, originalPassword):
        return bcrypt.checkpw(originalPassword.encode('utf-8'), self.password.encode('utf-8'))
    

    def __str__(self):
        return self.username

