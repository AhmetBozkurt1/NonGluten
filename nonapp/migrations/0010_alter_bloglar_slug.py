# Generated by Django 4.2.6 on 2023-12-19 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nonapp', '0009_bloglar_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloglar',
            name='slug',
            field=models.SlugField(blank=True, editable=False, unique=True),
        ),
    ]