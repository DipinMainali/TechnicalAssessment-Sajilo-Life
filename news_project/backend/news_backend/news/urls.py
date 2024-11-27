from django.urls import path
from .views import *

urlpatterns = [
    path("news/search/", search_articles, name="search_articles"),
]