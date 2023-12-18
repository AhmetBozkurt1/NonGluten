# Generated by Django 4.2.6 on 2023-12-18 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nonapp', '0006_alter_bloglar_aciklama'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloglar',
            name='aciklama',
            field=models.TextField(max_length=1500, verbose_name='Blog Açıklaması'),
        ),
        migrations.AlterField(
            model_name='bloglar',
            name='isim',
            field=models.CharField(max_length=200, verbose_name='Blog Başlığı'),
        ),
        migrations.AlterField(
            model_name='tarifler',
            name='aciklama',
            field=models.TextField(max_length=1500, verbose_name='Tarif Açıklması'),
        ),
        migrations.AlterField(
            model_name='tarifler',
            name='isim',
            field=models.CharField(max_length=200, verbose_name='Tarif İsmi'),
        ),
    ]