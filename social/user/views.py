from email import message
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import CurrentUserSerializer, UserProfileSerializer, UserSerializer, UserSerializerWithToken
from .models import UserProfile
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated



class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        data = request.data
        print(data)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        messages = {'errors': []}
        if username == None:
            messages['errors'].append('username can\'t be empty')
        if email == None:
            messages['errors'].append('Email can\'t be empty')
        if password == None:
            messages['errors'].append('Password can\'t be empty')
        if User.objects.filter(email=email).exists():
            messages['errors'].append("Account already exists")
        if User.objects.filter(username__iexact=username).exists():
            messages['errors'].append("Account already exists with this username")
        if len(messages['errors']) > 0:
            return Response({"detail": messages['errors']}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.create(
                username=username,
                email = email,
                password = password
            )
            serializer = UserSerializerWithToken(user, many=False)
        except:
            return
        return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        token['name'] = user.userprofile.name
        token['is_staff'] = user.is_staff
        token['id'] = user.id

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainParView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def users(request):
    q = request.query_params.get('q') or ''
    print(q)
    users = User.objects.filter(
        Q(userprofile__name__icontains=q),
    )
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user(request, username):
    user = User.objects.get(username=username)

    if(request.user.username == username):
        serializer = CurrentUserSerializer(user, many=False)
        return Response(serializer.data)
    
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)



@api_view(['GET'])
def following(request):
    user = request.user
    print(user)
    following = user.following.all()
    serializer = UserProfileSerializer(following, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes((IsAuthenticated),)
def profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def follow_user(request, username):
    user = request.user
    try:
        user_to_follow = User.objects.get(username=username)
        user_to_follow_profile = user_to_follow.userprofile

        if user == user_to_follow:
            return Response("You can't follow yourself 😒")
        if user in user_to_follow_profile.followers.all():
            user_to_follow_profile.followers.remove()
            user_to_follow_profile.followers_count = user_to_follow_profile.followers.count()
            user_to_follow_profile.save()
            return Response('user unfollowed.')
        else:
            user_to_follow_profile.followers.add(user)
            user_to_follow_profile.followers_count = user_to_follow_profile.followers.count()
            user_to_follow_profile.save()
            return Response('user followed')
    except Exception as e:
        message = {'details':f'{e}'}
        return Response(message, status=status.HTTP_204_NO_CONTENT)