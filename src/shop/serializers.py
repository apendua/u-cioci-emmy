from rest_framework import serializers
from shop.models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'icon', 'photo', 'audio', 'price')
