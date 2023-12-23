from django.shortcuts import render,redirect
from .forms import *
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages

# Create your views here.

def userRegister(request):
    form = UserForm()
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.save()
            subject = "NonGluten Üyelik Hk."
            message = "NonGluten Ailesine Hoşgeldiniz. Birbirinden Güzel İçerikler ve Tarifler İçin Takipte Kalın. Sevgilerimizle..."
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [form.email]
            )
            messages.success(request,'Kullanıcı Kaydı Başarı İle Gerçekleştirildi.')
            return redirect('login')
    context={
        'form':form
    }
    return render(request,'register.html',context)


def userLogin(request):
    if request.method=='POST':
        kullaniciGiris=request.POST['kullanıcı']
        kullaniciSifre=request.POST['password']
        user=authenticate(request,username=kullaniciGiris,password=kullaniciSifre)
        if user is not None:
            login(request,user)
            return redirect('index')
        else:
            messages.warning(request,'Kullanıcı Adı Veya Şifre Hatalı.')
            return redirect('login')
    return render(request,'login.html')

def userHesap(request):
    userHesap=request.user
    context={
        'user':userHesap
    }
    return render(request,'hesap.html',context)

def userLogout(request):
    logout(request)
    messages.success(request,'Çıkış İşleminiz Gerçekleştirildi.')
    return redirect('login')

def userDelete(request):
    user=request.user
    user.delete()
    messages.warning(request,'Kullanıcı Kaydı Silindi.')
    return redirect('register')

def userForget(request):
    return render(request,'forgetPass.html')