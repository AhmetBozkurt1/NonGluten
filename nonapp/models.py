from django.db import models
from django.utils.text import slugify


# Create your models here.

class Tarifler(models.Model):
    isim=models.CharField(max_length=200,verbose_name='Tarif İsmi')
    aciklama=models.TextField(max_length=1500,verbose_name='Tarif Açıklması')
    resim=models.FileField(upload_to='tarifler/',verbose_name='Tarif Resmi',null=True,blank=True)
    def __str__(self):
        return self.isim

class Instagram(models.Model):
    resim=models.FileField(upload_to='instagram/',verbose_name='Instagram Gönderi',null=True,blank=True)

class Bloglar(models.Model):
    isim=models.CharField(max_length=200,verbose_name='Blog Başlığı')
    aciklama=models.TextField(max_length=1500,verbose_name='Blog Açıklaması')
    resim=models.FileField(upload_to='bloglar',verbose_name='Blog Resmi',null=True,blank=True)
    # tarih ve saatleri anlık olarak çekmek için auto_now_add=True ifadesini kullanarak direkt anlık bilgisayar saatini almasını sağladık
    tarih=models.DateField(auto_now_add=True)
    saat=models.TimeField(auto_now_add=True)
    # slugField detay sayfalarına yönlendirirken seo açısından önemli olan, path den sonra yazan, önceden id veya isim değeri ile verdiğimiz ifadeyi şimdi direkt arada boşlukları tire(-) işareti ile doldurarak yazdıran bir yapıdır.
    
    # burada ilk başta null=True demiştik sebebi de biz models yapıları oluşturduk kayıtlıydı onların üzerine slug ifadelerini eklemek için admin de direkt blog elementine gidip kaydet diyerek null=True sayesinde yapabildik daha sonra null=False diyerek boş olmamasını sağlayıp slug ifadesini save() fonksiyonu ile ürettik

    # blank=True doldurulması zorunlu olmamasını,unique=True sadece tek bir değere sahip olmasını,editable=False ise admin panelinde models içinde gözükmemesini sağlar
    slug=models.SlugField(null=False,blank=True,unique=True,editable=False)

    def __str__(self):
        return self.isim

    # database içinde mevcut olan save() fonksiyonunu burda değiştirerek slug ifadesini modelin isimine göre belirlenmesini slugify fonksiyonu ile oluşturuyorum bunu da yukarıda import ediyorum
    def save(self,*args,**kwargs):
        self.slug=slugify(self.isim)
        super().save(*args,**kwargs)

class Kategori(models.Model):
    isim=models.CharField(max_length=50,verbose_name='Kategori İsmi')
    urun1=models.CharField(max_length=50,verbose_name='Ürün Giriniz',null=False,blank=True)
    urun2=models.CharField(max_length=50,verbose_name='Ürün Giriniz',null=False,blank=True)
    urun3=models.CharField(max_length=50,verbose_name='Ürün Giriniz',null=False,blank=True)
    urun4=models.CharField(max_length=50,verbose_name='Ürün Giriniz',null=False,blank=True)
    urun5=models.CharField(max_length=50,verbose_name='Ürün Giriniz',null=False,blank=True)
    slug=models.SlugField(null=True,blank=True,unique=True,editable=True)
    
    def __str__(self):
        return self.isim
    
    def save(self,*args,**kwargs):
        self.slug=slugify(self.isim)
        super().save(*args,**kwargs)


class Urunler(models.Model):
    isim=models.CharField(max_length=50,verbose_name='Ürün İsmi')
    fiyat=models.FloatField(verbose_name='Ürün Fiyatı')
    resim=models.FileField(upload_to='urunler/',verbose_name='Ürün Resmi',null=True,blank=True)
    kategori=models.ForeignKey(Kategori,on_delete=models.CASCADE,null=True)
    slug=models.SlugField(null=False,blank=True,unique=True,editable=True)

    def __str__(self):
        return self.isim

    def save(self,*args,**kwargs):
        self.slug=slugify(self.isim)
        super().save(*args,**kwargs)