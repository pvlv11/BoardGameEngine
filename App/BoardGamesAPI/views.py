import json
from django.shortcuts import render
from .models import t_genre, t_game
from rest_framework import viewsets
from .serializers import t_gameSerializer

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import psycopg2 as postgre

from os import environ

# Create your views here.

# wyswietl wszytskie gry
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
    
def top10(request):
    postgre_connection = postgre.connect(database=environ.get('POSTGRES_NAME'), 
                                    user=environ.get('POSTGRES_USER'),
                                    password=environ.get('POSTGRES_PASSWORD'), 
                                    host=environ.get('POSTGRES_HOST'), port='5432')
    postgre_cur = postgre_connection.cursor()
    postgre_cur.execute("""
        select game.name,coalesce(avg(review.review_mark),0) as avg_review 
        from t_game as game left join t_review as review on game.id = review.game_id 
        group by game.name order by avg_review desc""")

    jsone = {}
    for iter,row in postgre_cur.fetchmany(10):
        print(row)
        jsone[iter] = row
    
    return JsonResponse(jsone)

def test(request):
    table_list = t_genre(genre_name="nazwaaa")
    table_list.save()


def t_game_view(ModelViewSet):#viewsets.ViewSet
    serializer_class = t_gameSerializer
    queryset = t_game.objects.all()

