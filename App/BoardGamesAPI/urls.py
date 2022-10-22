from django.urls import path
from . import views

urlpatterns=[
    path('games/getAllGames',views.getAllGames,name='games/getAllGames'),
    path('games/top_10_games',views.top_10_games,name='games/top_10_games'),
    path('games/games_review/<int:user_id>/<int:game_id1>',views.games_review,name='games/games_review'),

    path('games/populate',views.populateDataBase,name='games/populateDataBase'),

    ]