from django.urls import path
from . import views




urlpatterns = [
    path('', views.users, name='users'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('profile/', views.profile, name='profile'),
    path('login/', views.MyTokenObtainParView.as_view(), name='login'),
    
    path('following/', views.following, name='following'),
    path('follow/<str:username>/', views.follow_user, name='follow_user'),
    path('<str:username>/', views.user, name='user'),
    
    
]