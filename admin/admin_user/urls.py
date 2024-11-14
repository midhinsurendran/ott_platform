from django.urls import path
from . import views

urlpatterns = [
    path('login',views.login,name='login'),
    path('content',views.content,name='home'),
    path('create',views.movie_create,name='create'),
    path('view/<int:id>',views.movie_view,name='view'),
    path('edit/<int:id>',views.movie_edit,name='edit'),
    path('delete/<int:id>',views.movie_delete,name='delete'),
    path('usermanagement',views.user_management,name='usermanagement'),
    path('contenthistory/<int:user_id>',views.content_history,name='contenthistory'),
    path('block/<int:id>',views.block,name='block'),
    path('unblock/<int:id>',views.unblock,name='unblock'),
]
