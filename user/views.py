from django.shortcuts import render,redirect
from .forms import *
from django.core.mail import send_mail
from django.conf import settings

# Create your views here.

def register(request):
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
            return redirect('index')
    context={
        'form':form
    }
    return render(request,'register.html',context)