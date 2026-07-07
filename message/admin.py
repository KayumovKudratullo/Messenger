from django.contrib import admin # type: ignore
from message import models

admin.site.register(models.Users)
admin.site.register(models.Message)