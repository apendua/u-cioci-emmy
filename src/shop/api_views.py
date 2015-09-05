from collections import Counter
from django.db.models import Q
from operator import attrgetter
import random

from django.conf import settings
from django.http.response import HttpResponseServerError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from shop.models import Item
from shop.serializers import ItemSerializer

from taggit.models import Tag


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


def get_game_config(difficulty, level):
    return settings.GAME_CONFIG.get((difficulty, level))


class GameView(APIView):
    def __init__(self, **kwargs):
        super(GameView, self).__init__(**kwargs)
        self.items_to_sell = []
        self.items_to_buy = []
        self.scenario = None

    def generate_return_dict(self):
        counts = Counter(attrgetter('name')(item) for item in self.items_to_buy)

        budget = sum(item.price for item in self.items_to_buy) + random.randint(1, 6)
        self.items_to_buy = list(set(self.items_to_buy))
        self.items_to_sell = self.items_to_buy + self.items_to_sell

        serialized_shopping_list = ItemSerializer(self.items_to_buy, many=True, context=counts)
        serialized_available_items = ItemSerializer(self.items_to_sell, many=True, context=counts)

        return {
            'budget': budget,
            'items_count_limit': settings.ITEMS_COUNT_LIMIT,
            'scenario': self.scenario,
            'shopping_list': serialized_shopping_list.data,
            'available_items': serialized_available_items.data,
        }

    def generate_scenario(self):
        categories = Tag.objects.all()
        category = random.choice(categories)

        self.scenario = category.name

        self.items_to_buy = list(Item.objects.filter(tags__in=[category]))
        self.items_to_sell = list(Item.objects.filter(~Q(tags__in=[category])))

    def generate_game(self, game_config):
        number_to_sell = game_config['number_of_extra']
        number_to_buy = game_config['number_to_buy']

        items = list(Item.objects.all())
        if len(items) < number_to_sell:
            return HttpResponseServerError('Number of items is smaller then the number of items we want to sell')

        while len(self.items_to_buy) < number_to_buy:
            self.items_to_buy.append(weighted_choice(items))

        while len(self.items_to_sell) < number_to_sell:
            item = random.choice(items)
            if item not in self.items_to_sell and item not in self.items_to_buy:
                self.items_to_sell.append(item)
            else:
                items.remove(item)

    def get(self, request, format=None, difficulty='easy', level='1'):
        if difficulty == 'scenario':
            self.generate_scenario()
        else:
            game_config = get_game_config(difficulty, level)
            if game_config is None:
                return HttpResponseServerError(
                    'There is no config for difficulty: {} and level {}'.format(difficulty, level)
                )

            self.generate_game(game_config=game_config)
        return Response(self.generate_return_dict())