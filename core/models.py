from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField

# File Upload Model
class FileUpload(models.Model):
    file_name = models.CharField(max_length=20)
    file = models.FileField(upload_to='store/files')
    file_type = models.CharField(max_length=20)
    dateUploaded = models.DateField()
    uploadedBy = models.CharField(max_length=20)

    def __str__(self):
        return self.file_name

# User Profile Model    
class UserProfile(models.Model):
    user_name = models.CharField(max_length=255)
    p_address = models.CharField(max_length=255, blank=True)
    c_address = models.CharField(max_length=255, blank=True)
    phone_number = PhoneNumberField(null=True, blank=True)

    def __str__(self):
        return self.user_name