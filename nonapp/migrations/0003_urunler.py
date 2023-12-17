# Generated by Django 4.2.6 on 2023-12-17 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nonapp', '0002_bloglar'),
    ]

    operations = [
        migrations.CreateModel(
            name='Urunler',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isim', models.CharField(max_length=50, verbose_name='Ürün İsmi')),
                ('fiyat', models.IntegerField(verbose_name='Ürün Fiyatı')),
                ('resim', models.FileField(blank=True, null=True, upload_to='urunler/', verbose_name='Ürün Resmi')),
            ],
        ),
    ]