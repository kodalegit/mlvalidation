from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.registration, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("documentation", views.documentation, name="documentation"),
    path("predict", views.predict_strength, name="predict"),
    path("save", views.save_prediction, name="save_prediction"),
    path("csrf", views.get_csrf_token, name="csrf"),
    path("delete/<int:sample_id>", views.delete_entry, name="delete"),
]
