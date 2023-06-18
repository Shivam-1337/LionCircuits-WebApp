from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FileViewSet, login, UserProfileViewSet, UserProfileView, CreateUserProfileViewSet, FileUploadStats

router = DefaultRouter()
router.register('files', FileViewSet, basename='files')
router.register('userprofiles', UserProfileViewSet)
router.register('profile', CreateUserProfileViewSet)



urlpatterns = [
    path('api/', include(router.urls)),
    path('login/', login),
    path('profile/<str:user_name>/', view=UserProfileView.as_view()),
    path('file_stats/', view=FileUploadStats.as_view()),
]