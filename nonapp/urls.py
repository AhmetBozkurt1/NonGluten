from django.urls import path
from .views import *

urlpatterns=[
    path('',index,name='index'),
    path('blog/',blog,name='blog'),
    path('urunler/',urunler,name='urunler'),
    path('about/',about,name='about'),
    path('sepet/',sepet,name='sepet')
]