from django.urls import path
from . import views



urlpatterns = [
    path('', views.posts, name='posts'),
    path('create/', views.create_post),
    path('details/<str:pk>/', views.post_details),
    path('edit/<str:pk>/', views.edit_post),
    path('delete/<str:pk>/', views.delete_post),
    path('like/', views.update_like)
]