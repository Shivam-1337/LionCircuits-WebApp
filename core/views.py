from django.shortcuts import render
from .models import FileUpload, UserProfile
from rest_framework.views import APIView
from django.db.models import Count
from rest_framework import viewsets, status
from .serializers import FileUploadSerializer, UserProfileSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.response import Response

# Login View
@csrf_exempt
def login(request):
    if request.method == 'POST':
        print("start")
        try:
            data = JSONParser().parse(request)
            user = authenticate(
            request,
            username=data['username'],
            password=data['password'])
            print(data)
            print(user)
            if user is None:
                return JsonResponse(
                    {'error':'unable to login. check username and password'},
                    status=400)
            else: # return user token
                try:
                    token = Token.objects.get(user=user)
                except: # if token not in db, create a new one
                    token = Token.objects.create(user=user)
                return JsonResponse({'token':str(token), 'username': user.username}, status=201)
        except Exception as e:
            print(e)
        # print(data)

# View for Upload and Download Files
class FileViewSet(viewsets.ModelViewSet):
    queryset = FileUpload.objects.all()
    serializer_class = FileUploadSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

# View to fetch and update user profile details
class UserProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    lookup_field = 'user_name'

    def get_queryset(self):
        username = self.kwargs['user_name']
        queryset = UserProfile.objects.filter(user_name=username)
        if not queryset.exists():
            return UserProfile.objects.none()
        else:
            return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)            

# View to insert user profile data    
class CreateUserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

# View for fetching all File Stats
class FileUploadStats(APIView):
    def get(self, request):
        file_uploads = FileUpload.objects.all()

        # Total number of files uploaded
        total_files = file_uploads.count()

        # Total number of files of each type
        file_types = file_uploads.values('file_type').annotate(total_files=Count('file_type'))

        # Number of files uploaded by each user
        users = file_uploads.values('uploadedBy').annotate(total_files=Count('uploadedBy'))

        data = {
            'total_files': total_files,
            'file_types': file_types,
            'users': users
        }

        return Response(data)