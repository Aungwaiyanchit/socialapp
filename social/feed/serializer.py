from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Post
from user.serializers import UserSerializer
from user.serializers import ( UserProfileSerializer)


class PostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    original_post = serializers.SerializerMethodField(read_only=True)
    up_like = serializers.SerializerMethodField(read_only=True)
    down_like = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_user(self, obj):
        user = obj.user.userprofile
        serializer = UserProfileSerializer(user, many=False)
        return serializer.data

    def get_original_post(self, obj):
        original = obj.repost
        if original != None:
            serializer = PostSerializer(original, many=False)
            return serializer.data
        else:
            return None

    def get_up_like(self, obj):

        likers = obj.like.through.objects.filter(post=obj, value='like').values_list('user', flat=True)

        like_objects = obj.like.filter(id__in=likers)
        serializer = UserSerializer(like_objects, many=True)
        return serializer.data

    def get_down_like(self, obj):

        likers = obj.like.through.objects.filter(post=obj, value='unlike').values_list('user', flat=True)

        liker_objects = obj.like.filter(id__in=likers)
        serializer = UserSerializer(liker_objects, many=True)
        return serializer.data