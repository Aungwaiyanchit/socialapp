from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True)
    username = models.CharField(max_length=200, null=True)
    profile_img = models.ImageField(blank=True, null=True)
    followers_count = models.IntegerField(blank=True, null=True, default=0)
    bio = models.TextField(null=True)
    followers = models.ManyToManyField(User, related_name='following', blank=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return str(self.user.username)