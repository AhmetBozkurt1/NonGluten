from django.urls import path
from .views import *

urlpatterns=[
    path('',index,name='index'),
    path('blog/',blog,name='blog'),
    path('urunler/',urunler,name='urunler'),
    path('about/',about,name='about'),
    path('sepet/',sepet,name='sepet'),
    path('urunler/kategori/<slug:kategori_slug>',kategori,name='kategori'),
    path('blog/<slug:slug>',blogDetay,name='blogDetay'),
    path('urun/<slug:slug>',urunDetay,name='urunDetay'),
    path('iletisim',iletisim,name='iletisim')
]