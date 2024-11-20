from django.shortcuts import render,redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from movie.models import movie,movie_history
from .models import admin_user
from api.forms import User
from django.contrib.auth import authenticate,login as logins,logout as logouts,update_session_auth_hash
from django.core.paginator import Paginator

def login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        
        if not email or not password:
            messages.error(request, 'Please provide both email and password')
            return redirect('Login')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            if user.is_admin: 
                logins(request, user)  
                messages.success(request, "Welcome")
                return redirect('home') 
            else:
                messages.error(request, 'Access denied: Admins only')
        else:
            messages.error(request, 'Invalid email or password')

    return render(request,'login.html')

@login_required(login_url='/login')
def changepassword(request):
    if request.method == "POST":
        current_password = request.POST.get('current_password')
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')
        
        if not current_password or not new_password or not confirm_password:
            messages.error(request, "All fields are required.")
            return redirect('change_password')
        
        if new_password != confirm_password:
            messages.error(request, "New passwords do not match.")
            return redirect('change_password')
        
        user = request.user
        if not user.check_password(current_password):
            messages.error(request, "Current password is incorrect.")
            return redirect('change_password')
        
        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)
        messages.success(request, "Your password has been successfully updated!")
        return redirect('home')
    return render(request, 'ChangePassword.html')


@login_required(login_url='/login')
def content(request):
    query = request.GET.get('query', '')
    
    if query:
        movie_list = movie.objects.filter(title__icontains=query)  # Filter by title
    else:
        movie_list = movie.objects.all()

    paginator = Paginator(movie_list,4)

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'content.html',{'page_obj': page_obj})

@login_required(login_url='/login')
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

@login_required(login_url='/login')
def movie_view(request,id):
    movie_list=movie.objects.get(pk=id)
    return render(request,'ViewMovie.html',{'movie_list':movie_list})

@login_required(login_url='/login')
def movie_edit(request,id):
    movies=movie.objects.get(pk=id)
    if request.method == 'POST':
        movies.title = request.POST.get('title')
        movies.description = request.POST.get('description')
        movies.thumbnail = request.POST.get('thumbnail')
        movies.video = request.POST.get('video')

        movies.save()
        return redirect('home')
    return render(request,'EditMovie.html',{'movies':movies})

@login_required(login_url='/login')
def movie_delete(request,id):
    movie_list=movie.objects.get(pk=id)
    if request.method == 'POST':
        movie_list.delete()
        return redirect('home')
    return render(request,'Content.html',{'movie_list':movie_list})

@login_required(login_url='/login')
def user_management(request):
    query = request.GET.get('query', '')
    if query:
        user = admin_user.objects.filter(username__icontains=query)  
    else:
        user = admin_user.objects.all()

    paginator = Paginator(user, 3)

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request,"UserManagement.html",{"page_obj":page_obj})

@login_required(login_url='/login')
def content_history(request,user_id):
    content1 = movie_history.objects.filter(user_id=user_id)
    paginator = Paginator(content1,4)

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request,"ContentHistory.html",{"page_obj":page_obj})

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

@login_required(login_url='/login')
def movie_count(request):
    query = request.GET.get('query', '') 
    if query:
        movie1 = movie.objects.filter(title__icontains=query)
    else:
        movie1 = movie.objects.all()
    paginator = Paginator(movie1, 3) 

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request,'ViewCount.html',{'page_obj':page_obj})

@login_required(login_url='/login')
def logout(request):
    logouts(request)
    return redirect('Login')

