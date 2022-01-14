from django.urls import path
from . import views

urlpatterns = [
    # Server routes
    path('', views.index, name='index'),
    path('login', views.login_view, name="login"),
    path('logout', views.logout_view, name="logout"),
    path('register', views.register, name="register"),

    # API routes
    path('point', views.point, name="point"),
]