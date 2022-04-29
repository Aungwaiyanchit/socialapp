import uuid
from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from ckeditor.fields import RichTextField

class Post(models.Model):
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    repost = models.ForeignKey('self', on_delete=models.CASCADE, related_name='re_post', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    content = RichTextField(null=True, blank=True)
    image = models.ImageField(blank=True, null=True)
    comment_count = models.IntegerField(blank=True, default=0 , null=True)
    created = models.DateTimeField(auto_now_add=True)
    like = models.ManyToManyField(User, related_name='post_user', blank=True, through='PostLike')
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        try:
            content = self.content[0:80]
        except Exception:
            content = 'Repost' + str(self.repost.content[0:80])
        return content

    @property
    def comments(self):
        queryset = self.post_set.all()
        return queryset


class PostLike(models.Model):


    CHOICES  = (
        ('like', 'like'),
        ('unlike', 'unlike'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    value = models.CharField(max_length=20, choices=CHOICES)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return str(self.user) + ' ' + str(self.value) + '"' + str(self.post) + '"'