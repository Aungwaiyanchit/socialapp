from django.contrib import admin
from .models import PostLike

from .models import Post, PostLike
# Register your models here.
class AdminPostLike(admin.ModelAdmin):
    list_display = ('user', 'post', 'value')
    search_fields = ('user',)
    list_filter = ('user',)
    




admin.site.register(Post)
admin.site.register(PostLike, AdminPostLike)