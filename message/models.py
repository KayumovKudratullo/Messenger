from django.db import models # type: ignore

class Users(models.Model):
    password = models.CharField(max_length=8)
    username = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.username