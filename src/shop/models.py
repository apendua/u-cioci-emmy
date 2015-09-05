from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=64)
    icon = models.ImageField(upload_to='icon')
    photo = models.ImageField(upload_to='photo')
    audio = models.FileField(upload_to='audio')
    price = models.PositiveIntegerField()
    likely_to_draw = models.PositiveIntegerField()