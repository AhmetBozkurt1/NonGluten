from django.db import models

# Create your models here.

class Tarifler(models.Model):
    isim=models.CharField(max_length=100,verbose_name='Tarif İsmi')
    aciklama=models.TextField(max_length=250,verbose_name='Tarif Açıklması')
    resim=models.FileField(upload_to='tarifler/',verbose_name='Tarif Resmi',null=True,blank=True)
    def __str__(self):
        return self.isim

class Instagram(models.Model):
    resim=models.FileField(upload_to='instagram/',verbose_name='Instagram Gönderi',null=True,blank=True)

class Bloglar(models.Model):
    isim=models.CharField(max_length=100,verbose_name='Blog Başlığı')
    aciklama=models.TextField(max_length=250,verbose_name='Blog Açıklaması')
    resim=models.FileField(upload_to='bloglar',verbose_name='Blog Resmi',null=True,blank=True)
    # tarih ve saatleri anlık olarak çekmek için auto_now_add=True ifadesini kullanarak direkt anlık bilgisayar saatini almasını sağladık
    tarih=models.DateField(auto_now_add=True)
    saat=models.TimeField(auto_now_add=True)
    def __str__(self):
        return self.isim

class Urunler(models.Model):
    isim=models.CharField(max_length=50,verbose_name='Ürün İsmi')
    fiyat=models.FloatField(verbose_name='Ürün Fiyatı')
    resim=models.FileField(upload_to='urunler/',verbose_name='Ürün Resmi',null=True,blank=True)
    def __str__(self):
        return self.isim