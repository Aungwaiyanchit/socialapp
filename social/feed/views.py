from django.shortcuts import render

from .models import Post, PostLike
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Create your views here.
from django.db.models import Q
from .serializer import PostSerializer

@api_view(['GET'])
# @permission_classes((IsAuthenticated))
def posts(request):
    query = request.query_params.get('q')
    if query == None:
        query = ''
    
    user = request.user
    
    following = user.following.select_related('user')
   
    following = user.following.all()
   
    ids = []

    ids = [i.user.id for i in following]
    ids.append(user.id)
    


    posts = list(Post.objects.filter(parent=None, user__id__in=ids).order_by('-created'))

    recentPosts = Post.objects.filter(Q(parent=None) & Q(repost=None)).order_by('-created')

    index = 0
    for post in recentPosts:
        if post not in posts:
            posts.insert(index, post)
            index += 1

    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
def post_details(request,pk):
    try:
        mumble = Post.objects.get(id=pk)
        serializer = PostSerializer(mumble, many=False)
        return Response(serializer.data)
    except:
        message = {
            'detail':'Post doesn\'t exist'
        }
        return Response(message, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
# @permission_classes((IsAuthenticated))
def create_post(request):
    user = request.user
    data = request.data
    print('data', data)
    is_comment = data.get('isComment')
    if is_comment:
        parent = Post.objects.get(id=data['postId'])
        post = Post.objects.create(
            parent=parent,
            user=user,
            content=data['content']
        )
    else:
        post = Post.objects.create(
            user=user,
            content=data['content']
        )
    
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])

def delete_post(request, pk):
    print(pk)
    user = request.user
    try:
        post = Post.objects.get(id=pk)
        if user != post.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PATCH'])
def edit_post(request, pk):
    user = request.user
    data = request.data
    print(user)
    try:
        post = Post.objects.get(id=pk)
        if user != post.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        else: 
            serializer = PostSerializer(post, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
    except:
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def update_like(request):
    user = request.user
    data = request.data
    post = Post.objects.get(id=data['post_id'])
    print('data', data)
    like, created = PostLike.objects.get_or_create(post=post, user=user)
    
    if like.value == data.get('value'):
        like.delete()
    else:
        like.value = data.get('value')
        print('like', like.value)
        like.save()

    post = Post.objects.get(id=data['post_id'])
    serializer = PostSerializer(post, many=False)

    return Response(serializer.data)
