from django.db import models
from django.contrib.auth.models import User

class Record(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    book_title = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13, blank=True, null=True)
    thumbnail_url = models.CharField(max_length=200, blank=True, null=True)
    date = models.DateField()
    first_page = models.IntegerField()
    final_page = models.IntegerField()
    impression = models.TextField(max_length=200)
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.book_title