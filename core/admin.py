from django.contrib import admin
from .models import FileUpload, UserProfile

# Register your models here.
admin.site.register(FileUpload)
admin.site.register(UserProfile)
