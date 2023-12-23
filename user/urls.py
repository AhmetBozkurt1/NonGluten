from django.urls import path
from .views import *

urlpatterns=[
    path('register/',userRegister,name='register'),
    path('login/',userLogin,name='login'),
    path('hesap/',userHesap,name='userHesap'),
    path('logout/',userLogout,name='userLogout'),
    path('delete/',userDelete,name='userDelete'),
    path('forgetPassword/',userForget,name='userForget')
]