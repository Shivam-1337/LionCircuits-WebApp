from rest_framework import serializers
from .models import FileUpload, UserProfile

# Serializer for FileUpload model
class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = ['id', 'file_name', 'file', 'file_type','dateUploaded', 'uploadedBy']

# Serializer for UserProfile model
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'