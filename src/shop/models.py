from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=64, unique=True)
    icon = models.ImageField(upload_to='images/icons')
    photo = models.ImageField(upload_to='images/photos')
    audio = models.FileField(upload_to='audio')
    price = models.PositiveIntegerField()
    likely_to_draw = models.PositiveIntegerField()

    def get_icon_img(self):
        if self.icon:
            return "<img style='max-width: 200px;' src='%s'/>" % self.icon.url
        return "No icon available"
    get_icon_img.short_description = "Icon thumbnail"
    get_icon_img.allow_tags = True

    def get_photo_img(self):
        if self.photo:
            return "<img style='max-width: 200px;' src='%s'/>" % self.photo.url
        return "No photo available"
    get_photo_img.short_description = "Photo thumbnail"
    get_photo_img.allow_tags = True

    def __unicode__(self):
        return self.name