from rest_framework import serializers
from movie.models import movie,watch_list,movie_history

class movieserializer(serializers.ModelSerializer):
    class Meta:
        model = movie
        fields = '__all__'

class movieserializer1(serializers.ModelSerializer):
    class Meta:
        model = movie
        fields = ['id','title','thumbnail']

class watchserializer(serializers.ModelSerializer):
    movie=movieserializer()
    class Meta:
        model = watch_list
        fields = ['id','movie']

class historyserializer(serializers.ModelSerializer):
    movie=movieserializer()
    class Meta:
        model = movie_history
        fields = ['id','movie','date_time']