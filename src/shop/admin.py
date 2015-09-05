from django.contrib import admin
from shop.models import Item


class ItemAdmin(admin.ModelAdmin):
    pass

admin.site.register(Item, ItemAdmin)