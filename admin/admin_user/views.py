from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render,redirect
from django.contrib.auth import login
from movie.models import movie,movie_history
from .models import admin_user

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def content(request):
    movie_list=movie.objects.all()
    return render(request, 'content.html',{'movie_list':movie_list})

def movie_create(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        thumbnail = request.POST.get('thumbnail')
        video = request.POST.get('movieFile')

        movies = movie(
            title = title,
            description = description,
            thumbnail = thumbnail,
            video = video
        )
        movies.save()
        return redirect('home')
    return render(request,'CreateMovie.html')

def movie_view(request,id):
    movie_list=movie.objects.get(pk=id)
    return render(request,'ViewMovie.html',{'movie_list':movie_list})

def movie_edit(request,id):
    movies=movie.objects.get(pk=id)
    if request.method == 'POST':
        movies.title = request.POST.get('title')
        movies.description = request.POST.get('description')
        movies.thumbnail = request.POST.get('thumbnail')
        movies.video = request.POST.get('movieFile')

        
        movies.save()
        return redirect('home')
    return render(request,'EditMovie.html',{'movies':movies})

def movie_delete(request,id):
    movie_list=movie.objects.get(pk=id)
    if request.method == 'POST':
        movie_list.delete()
        return redirect('home')
    return render(request,'Content.html',{'movie_list':movie_list})

def user_management(request):
    user = admin_user.objects.all()
    return render(request,"UserManagement.html",{"user":user})

def content_history(request,user_id):
    content1 = movie_history.objects.filter(user_id=user_id)
    return render(request,"ContentHistory.html",{"content1":content1})

def block(request,id):
    user = admin_user.objects.get(id=id)
    user.block=True
    user.save()
    return redirect('usermanagement')

def unblock(request,id):
    user = admin_user.objects.get(id=id)
    user.block=False
    user.save()
    return redirect('usermanagement')