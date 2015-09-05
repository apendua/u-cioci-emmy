from django.contrib import admin
from shop.models import Item


class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_icon_img', 'get_photo_img', 'get_audio', 'price', 'likely_to_draw')
    fields = ('name', 'icon', 'get_icon_img', 'photo', 'get_photo_img', 'audio', 'get_audio', 'price', 'likely_to_draw', 'tags')
    readonly_fields = ('get_icon_img', 'get_photo_img', 'get_audio')


admin.site.register(Item, ItemAdmin)