
from django.urls import path,include
from rest_framework import routers


from . import views
urlpatterns=[
    path('games/getAllGames',views.getAllGames,name='games/getAllGames'),
    path('games/top_10_games',views.top_10_games,name='games/top_10_games'),
    path('games/games_review',views.games_review,name='games/games_review'),
    path('games/populate',views.populateDataBase,name='games/populateDataBase'),
    path('games/search_by_string',views.search_by_string,name='games/search_by_string'),
    path('user/register_user',views.register_user2,name='user/register_user')
    ]
    