from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_view, name='login'),
    path('register', views.registration, name='register'),
    path('predict', views.predict_strength, name='predict'),
]