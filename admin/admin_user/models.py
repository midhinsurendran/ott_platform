from django.db import models
from django.contrib.auth.models import AbstractUser

class admin_user(AbstractUser):
    email=models.EmailField(unique=True, max_length=50)
    token=models.CharField(max_length=50,null=True)
    block=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


