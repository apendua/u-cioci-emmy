from rest_framework import serializers
from shop.models import Item


class ItemSerializer(serializers.ModelSerializer):

    def get_count(self, obj):
        return self.context.get(obj.name, 0)

    count = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ('id', 'name', 'icon', 'photo', 'audio', 'price', 'count')
