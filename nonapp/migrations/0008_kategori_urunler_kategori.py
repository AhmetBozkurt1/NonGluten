# Generated by Django 4.2.6 on 2023-12-18 21:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nonapp', '0007_alter_bloglar_aciklama_alter_bloglar_isim_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Kategori',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isim', models.CharField(max_length=50, verbose_name='Kategori İsmi')),
            ],
        ),
        migrations.AddField(
            model_name='urunler',
            name='kategori',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='nonapp.kategori'),
        ),
    ]
