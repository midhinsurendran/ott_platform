from django.db import models

class movie(models.Model):
    title=models.CharField(max_length=100)
    description=models.CharField(max_length=3000)
    thumbnail=models.URLField((""), max_length=200)
    video=models.URLField((""), max_length=200)
    count=models.IntegerField(default=0)
    last_viewed=models.DateTimeField(null=True,blank=True)

class watch_list(models.Model):
    user=models.ForeignKey("admin_user.admin_user", on_delete=models.CASCADE)
    movie=models.ForeignKey("movie.movie", on_delete=models.CASCADE)
    class Meta:
        unique_together = ('user','movie')

class movie_history(models.Model):
    user=models.ForeignKey("admin_user.admin_user", on_delete=models.CASCADE)
    movie=models.ForeignKey("movie.movie", on_delete=models.CASCADE)
    date_time=models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('user','movie')
