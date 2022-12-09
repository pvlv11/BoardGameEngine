
from django.urls import path,include
from rest_framework import routers


from . import views
urlpatterns=[
    path('games/getAllGames',views.getAllGames,name='games/getAllGames'),
    path('games/top_10_games',views.top_10_games,name='games/top_10_games'),
    
    path('games/get_games_review',views.get_games_review,name='games/get_games_review'),
    path('games/add_del_review',views.add_del_edit_review,name='games/add_del_review'),

    path('games/populate',views.populateDataBase,name='games/populateDataBase'),
    path('games/search_by_string',views.search_by_string,name='games/search_by_string'),

    path('games/get_favourite',views.get_favourites,name='games/get_favourite'),
    path('games/add_favourite',views.add_to_favourites,name='games/add_favourite'),
    path('games/del_favourite',views.remove_from_favourites,name='games/del_favourite'),


    path('user/register_user',views.register_user2,name='user/register_user'),
    path('user/login_user',views.login_view2,name='user/login_user'),
    path('user/logout',views.logout_view2,name='user/logout'),
    path('user/check_user_status',views.check_user_status,name='user/check_user_status'),
    
    path('filters/get_filters',views.get_data_for_filters,name='filters/get_filters'),
    path('filters/filter_games',views.search_by_strin_with_filters,name='filters/filter_games'),

    
    ]