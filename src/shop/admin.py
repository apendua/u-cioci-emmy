from django.contrib import admin
from shop.models import Item


class ItemAdmin(admin.ModelAdmin):
    list_display = ("name", "get_icon_img", "get_photo_img", "get_audio", "price", "likely_to_draw")


admin.site.register(Item, ItemAdmin)