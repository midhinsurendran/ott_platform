
from django.urls import path
from . import views

urlpatterns = [
    path('home',views.home,name='home'),
    path('<int:id>/viewpage',views.view_page,name='view_page'),
    path('<int:movie_id>/watchlater', views.watch_later, name='watch_later'),
    path('watchpage', views.watch_page, name='watch_page'),
    path('<int:movie_id>/watchremove', views.watch_remove, name='watch_remove'),
    path('<int:movie_id>/moviehistory', views.history, name='browse_history'),
    path('viewhistory', views.moviehistory, name='view_history'),
    path('<int:movie_id>/checkwatchlater', views.check_watch_later, name='check_watch_later'),
]
