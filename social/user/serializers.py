from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken



class UserProfileSerializer(serializers.ModelSerializer):
    profile_img = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'

    def get_profile_img(self, obj):
        try:
            img = obj.profile_img.url
        except:
            img = None
        return img

class CurrentUserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'profile', 'username', 'is_superuser', 'is_staff']

    def get_profile(self, obj):
        profile = obj.userprofile
        serializer = UserProfileSerializer(profile, many=False)
        return serializer.data

class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'profile', 'username', 'is_superuser', 'is_staff']

    def get_profile(self, obj):
        profile = obj.userprofile
        serializer = UserProfileSerializer(profile, many=False)
        return serializer.data

class UserSerializerWithToken(UserSerializer):
    access = serializers.SerializerMethodField(read_only=True)
    refresh = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        exclude = ['password']
    
    def get_access(self, obj):
        token = RefreshToken.for_user(obj)
        print(token)
        token['username'] = obj.username
        token['name'] = obj.userprofile.name
        # token['profile_img'] = obj.userprofile.profile_img.url
        token['is_staff'] = obj.is_staff
        token['id'] = obj.id
        return str(token.access_token)

    def get_refresh(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)