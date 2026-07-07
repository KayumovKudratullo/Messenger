from django.urls import path, include

from message import views

urlpatterns = [
    path('', views.index, name='index' ),
    path('signup/', views.singup, name='singup'),
    path('signin/', views.singin, name='singin'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('message/<int:recipient_id>/', views.message, name='message'),
]