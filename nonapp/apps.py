from django.apps import AppConfig


class NonappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'nonapp'
