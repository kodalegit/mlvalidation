from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_view, name='login'),
    path('register', views.registration, name='register'),
    path('logout', views.logout_view, name='logout'),
    path('prediction', views.predict_strength, name='predict'),
    path('save', views.save_prediction, name='save_prediction'),
]