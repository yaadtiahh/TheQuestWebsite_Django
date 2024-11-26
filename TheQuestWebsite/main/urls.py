from django.urls import path
from . import views

urlpatterns = [
    path('map/', views.map, name='map'),
    path('info_center/', views.info_center, name='info_center'),
    path('profile/', views.profile, name='profile'),
]
