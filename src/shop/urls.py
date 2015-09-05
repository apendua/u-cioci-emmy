from django.conf.urls import include, url
from shop.views import HomeView

urlpatterns = [
    url(r'^$', HomeView.as_view(), name='home'),
]