from pyexpat import model
from django.db.models.signals import post_save, pre_save, post_delete
from .models import PostLike



def update_like(sender, instance, **kwargs):
    try:
        post = instance.post
        like =  len(post.votes.through.objects.filter(post=post, value='like'))
        unlike =  len(post.votes.through.objects.filter(post=post, value='unlike'))
        post.save()
    except:
        print('post already deleted')


post_save.connect(update_like, sender=PostLike)
post_delete.connect(update_like, sender=PostLike)