# Generated by Django 4.2.6 on 2023-12-19 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nonapp', '0013_alter_urunler_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='kategori',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
    ]