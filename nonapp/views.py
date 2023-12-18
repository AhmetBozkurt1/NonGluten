from django.shortcuts import render
from .models import *
from django.db.models import Q

# Create your views here.

def index(request):
    tarifler=Tarifler.objects.all()
    instagram=Instagram.objects.all()
    context={
        'tarifler':tarifler,
        'instagram':instagram
    }
    return render(request,"index.html",context)

def blog(request):
    bloglar=Bloglar.objects.all()
    context={
        'bloglar':bloglar
    }
    return render(request,'blog.html',context)

def urunler(request):
    urunler=Urunler.objects.all()
    search=""
    if request.GET.get('search'):
        search=request.GET.get('search')
        urunler=Urunler.objects.filter(
            Q(isim__icontains = search) |
            Q(kategori__isim__icontains = search)
        )
    context={
        'urunler':urunler
    }
    return render(request,'urunler.html',context)

def about(request):
    return render(request,'about.html')

def sepet(request):
    return render(request,'sepet.html')


# BLOGLARIN DETAYINA YÖNLENDİRME
def blogDetay(request,blogAd):
    blog=Bloglar.objects.get(isim=blogAd)
    instagram=Instagram.objects.all()
    context={
        'blogDetay':blog,
        'instagram':instagram,
    }
    return render(request,'blogDetay.html',context)

# ÜRÜNLERİN DETAYINA YÖNLENDİRME
def urunDetay(request,urunAd):
    urun=Urunler.objects.get(isim=urunAd)
    instagram=Instagram.objects.all()
    context={
        'urunDetay':urun,
        'instagram':instagram,
    }
    return render(request,'urunDetay.html',context)