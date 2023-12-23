from django.shortcuts import render,get_object_or_404
from .models import *
from django.db.models import Q
from django.contrib import messages

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
    search=''
    if request.GET.get('search'):
        search=request.GET.get('search')
        bloglar=Bloglar.objects.filter(isim__icontains=search)
        if not bloglar:
            messages.warning(request,'Aradığınız Blog Bulunamadı!')
    context={
        'bloglar':bloglar
    }
    return render(request,'blog.html',context)

def urunler(request):
    urunler=Urunler.objects.all()
    kategori=Kategori.objects.all()
    search=""
    if request.GET.get('search'):
        search=request.GET.get('search')
        urunler=Urunler.objects.filter(
            Q(isim__icontains=search) |
            Q(kategori__isim__icontains=search)
        )
        if not urunler:
            messages.warning(request,'Aradığınız Ürün Bulunamadı!')
    context={
        'urunler':urunler,
        'kategori':kategori
    }
    return render(request,'urunler.html',context)


def about(request):
    return render(request,'about.html')

def sepet(request):
    return render(request,'sepet.html')


# BLOGLARIN DETAYINA YÖNLENDİRME
# burada models yapısında oluşturduğumuz slug modeli ile nasıl id veya isim değeri ile get() fonksiyonunla detay sayfasına ulaşıyorsak burada da slug ile ulaşıp urls ve linkler içi yönlendirmede de slug ifadesinden yararlanıyoruz
def blogDetay(request,slug):
    blog=Bloglar.objects.get(slug=slug)
    instagram=Instagram.objects.all()
    context={
        'blogDetay':blog,
        'instagram':instagram,
    }
    return render(request,'blogDetay.html',context)

# ÜRÜNLERİN DETAYINA YÖNLENDİRME
def urunDetay(request,slug):
    urun=Urunler.objects.get(slug=slug)
    instagram=Instagram.objects.all()
    context={
        'urunDetay':urun,
        'instagram':instagram,
    }
    return render(request,'urunDetay.html',context)

def kategori(request,kategori_slug):
    uruns=Urunler.objects.filter(kategori__slug=kategori_slug)
    kategories=Kategori.objects.all()
    context={
        'urunler':uruns,
        'kategori':kategories,
    }
    return render(request,'urunler.html',context)


def iletisim(request):
    instagram=Instagram.objects.all()
    context={
        'instagram':instagram
    }
    return render(request,'contact.html',context)