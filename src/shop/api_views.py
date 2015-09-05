import random

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from shop.models import Item
from shop.serializers import ItemSerializer


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


def weighted_choice(items):
    total = sum(item.likely_to_draw for item in items)
    r = random.uniform(0, total)
    up_to = 0

    for item in items:
        if up_to + item.likely_to_draw > r:
            return item
        up_to += item.likely_to_draw

    assert False, "Shouldn't get here"


class GameView(APIView):
    def get(self, request, format=None, difficulty='easy', level=1):
        number_to_sell = 3
        number_to_buy = 1

        items_to_sell = []
        items_to_buy = []

        items = Item.objects.all()

        while len(items_to_sell) < number_to_sell:
            item = weighted_choice(items)
            if item not in items_to_sell:
                items_to_sell.append(item)

        while len(items_to_buy) < number_to_buy:
            items_to_buy.append(weighted_choice(items_to_sell))

        serialized_shopping_list = ItemSerializer(items_to_buy, many=True)
        serialized_available_items = ItemSerializer(items_to_sell, many=True)

        return_dict = {
            'shopping_list': serialized_shopping_list.data,
            'available_items': serialized_available_items.data,
        }

        return Response(return_dict)
