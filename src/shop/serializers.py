from operator import attrgetter
from rest_framework import serializers
from shop.models import Item


class ItemSerializer(serializers.ModelSerializer):

    def get_count(self, obj):
        return self.context.get(obj.name, 0)

    def get_tag_list(self, obj):
        return map(attrgetter('name'), obj.tags.all())

    count = serializers.SerializerMethodField()
    tag_list = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ('id', 'name', 'icon', 'photo', 'audio', 'price', 'count', 'tag_list')
