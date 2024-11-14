from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.forms import UserCreationForm
from rest_framework.permissions import AllowAny,IsAuthenticated
from .forms import CustomUserCreationForm,User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password



@api_view(['POST'])
@permission_classes((AllowAny,))
def signup(request):
    form=CustomUserCreationForm(data=request.data)
    if form.is_valid():
        user=form.save()
        return Response({"message":"account created successfully"},status=status.HTTP_201_CREATED)
    return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
   
    if not email or not password:
        return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)    
    
    try:
        user = User.objects.get(email=email)
        if user.block:
            return Response({'error':'Your account is blocked.Please contact support'},status=status.HTTP_403_FORBIDDEN)
        if not check_password(password, user.password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)   
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key},status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    current_password=request.data.get("current_password")
    new_password=request.data.get("new_password")
    if current_password is None or new_password is None:
        return Response({"error": "please provide both current and new password"},status=status.HTTP_400_BAD_REQUEST)
    user = request.user
    if not check_password(current_password,user.password):
        return Response({'error': 'Current password is incorrect'},status=status.HTTP_400_BAD_REQUEST)
    validate_password(new_password,user=user)
    user.set_password(new_password)
    user.save()
    return Response({'message':'Password updated succesfully'},status=status.HTTP_200_OK)