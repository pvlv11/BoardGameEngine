from django.urls import path

from . import views

urlpatterns=[
    path('games/getAllGames',views.getAllGames,name='games/getAllGames'),
    path('games/top10',views.top10,name='games/top10'),
    path('games/populate',views.populateDataBase,name='games/populateDataBase')
    
    
    ]