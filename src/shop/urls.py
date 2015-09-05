from django.conf.urls import include, url
from shop.api_views import GameView
from shop.views import HomeView

urlpatterns = [
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^game/(?P<difficulty>\w+)/(?P<level>\d+)?/?$', GameView.as_view(), name='game'),
]
