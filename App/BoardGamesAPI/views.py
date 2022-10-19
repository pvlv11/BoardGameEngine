import json
import queue
import BoardGamesAPI.models as table

from django.db.models import Avg
# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import psycopg2 as postgre

import BoardGamesAPI.scripts.populate_models as script


from os import environ

# Create your views here.
def populateDataBase(request):
    script.run()
# wyswietl wszytskie gry 
def getAllGames(request):
    jsone = {}
    j = 0
    for row in table.t_genre.objects.all():
        jsone[j] = row.genre_name
        j += 1
    return JsonResponse(jsone)


#http://127.0.0.1:8000/BoardGamesAPI/games/top10
def top10(requst):
    jsone = {}
    iter = 0
    result = (table.t_review.objects
                .values('game_id_id')
                .annotate(avg_rank=Avg('review_number'))
                .order_by('-avg_rank'))
    for i in result:
        query = table.t_game.objects.filter(id=i['game_id_id']).first()
        output = {"game_name":query.name,"game_reviews":round(i['avg_rank'],2),"image":query.image_url}
        jsone[iter] = output
        iter += 1


    return JsonResponse(jsone)

def test(request):
    table_list = table.t_genre(genre_name="nazwaaa")
    table_list.save()

"""
def top10(request):
    postgre_connection = postgre.connect(database=environ.get('POSTGRES_NAME'), 
                                    user=environ.get('POSTGRES_USER'),
                                    password=environ.get('POSTGRES_PASSWORD'), 
                                    host=environ.get('POSTGRES_HOST'), port='5432')
    postgre_cur = postgre_connection.cursor()
    postgre_cur.execute(""""""
        select game.name,Round(coalesce(avg(review.review_number),0),2) as avg_review 
        from "BoardGamesAPI_t_game" as game left join "BoardGamesAPI_t_review" as review on game.id = review.game_id_id
        group by game.name order by avg_review desc)""""""

    jsone = {}
    for iter,row in postgre_cur.fetchmany(10):
        print(row)
        jsone[iter] = row
    
    return JsonResponse(jsone)

    def getAllGames(request):
    # stri="hello world. You are at the polls index"+str(request)
   # return JsonResponse({"R-Va":"Slawek"})

    
    postgre_connection = postgre.connect(database=environ.get('POSTGRES_NAME'), 
                                        user=environ.get('POSTGRES_USER'),
                                        password=environ.get('POSTGRES_PASSWORD'), 
                                        host=environ.get('POSTGRES_HOST'), port='5432')

    postgr_cur = postgre_connection.cursor()
    postgr_cur.execute('select * from t_game where id < 50')
    jsone = {}
    j = 0
    for i in postgr_cur.fetchall():
        print(i)
        jsone[j] = i
        j += 1
    # jsone={"wszystkie":"gry"}
    return JsonResponse(jsone)  # HttpResponse(stri)
"""