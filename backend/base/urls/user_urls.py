from django.urls import path
from base.views import users_views as views

urlpatterns = [
    path('register/', views.registerUser, name="register"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name="users-profile"),
    
]
