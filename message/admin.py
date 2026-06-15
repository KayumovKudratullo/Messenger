from django.contrib import admin # type: ignore
from message import models

admin.site.register(models.Users)