from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from movie.models import movie,watch_list,movie_history
from .serializers import movieserializer,movieserializer1,watchserializer,historyserializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    movie1 = movie.objects.all()
    serializer = movieserializer1(movie1, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_page(request,id):
    movie1 = get_object_or_404(movie, id=id)
    now = timezone.now()
    if movie1.last_viewed is None or now - movie1.last_viewed > timedelta(seconds=5):
        movie1.count +=1
        movie1.last_viewed = now
        movie1.save()
    serializer = movieserializer(movie1)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def watch_later(request,movie_id):
    user = request.user
    movie1 = get_object_or_404(movie, id=movie_id)
    watchlater,created = watch_list.objects.get_or_create(user=user,movie=movie1)
    if not created:
        return Response({"message": "Movie is already in your watch later list."}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"detail": "Movie added to watch later"},status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def watch_page(request):
    watch_later_movies = watch_list.objects.filter(user=request.user)
    serializer = watchserializer(watch_later_movies, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def watch_remove(request,movie_id):
    user = request.user
    watch_later_remove = watch_list.objects.filter(user=user,movie_id=movie_id)
    if not watch_later_remove.exists():
        return Response({"detail": "Movie not found in watch later list"},status=status.HTTP_404_NOT_FOUND)
    watch_later_remove.delete()
    return Response({"detail": "Movie removed from watch later list"},status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def history(request,movie_id):
    user = request.user
    movie1 = movie.objects.get(id=movie_id)
    
    existing_entry=movie_history.objects.filter(user=user,movie=movie1).first()

    if existing_entry:
        existing_entry.date_time = timezone.now()
        existing_entry.save()
        return Response({"message": "Movie watch time updated"}, status=status.HTTP_200_OK)
    else:
        movie_history.objects.create(user=user,movie=movie1)
        return Response({"message": "Movie added to watch history"},status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def moviehistory(request):
    watch_history = movie_history.objects.filter(user=request.user).order_by('-date_time')
    serializer = historyserializer(watch_history, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_watch_later(request, movie_id):
    user = request.user
    in_watchlist = watch_list.objects.filter(user=user, movie_id=movie_id).exists()
    return Response({"is_in_watchlist": in_watchlist})
