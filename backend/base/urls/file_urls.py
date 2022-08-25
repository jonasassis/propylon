
from django.urls import path
from base.views import files_views as views

urlpatterns = [
    path('', views.getFiles, name="files"),
    path('<int:pk>/', views.getFilesByID, name="files-by-id"),
    path('urls/', views.getFilesOnlyURL, name="urls"),
    path('register/', views.registerFile, name="register-file"),   
]