
from django.shortcuts import render

from rest_framework import viewsets
from .serializers import *
from .models import *

#from pickle import NONE
import BoardGamesAPI.models as table
import BoardGamesAPI.serializers as ser
import BoardGamesAPI.scripts.populate_models as script


from django.db.models import Avg
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from django.utils.datastructures import MultiValueDictKeyError


from itertools import chain
# Create your views here.
#'BoardGames/games/search/by_string'

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models  import User

from django.views.decorators.csrf import csrf_exempt

#TODO: przetestowac z postmanem
@csrf_exempt
@login_required
def search_by_string(request):

    if request.method=='GET':
        parameters=request.GET
        #print(parameters)
        name_we_are_looking_for=parameters.__getitem__('name_string')
        print(name_we_are_looking_for)
        try:
            found_games=table.t_game.objects.filter(name__contains=name_we_are_looking_for).values()
        except table.t_game.DoesNotExist:
            return JsonResponse({"Massage":"game not found \
                                        try different string"},status=status.HTTP_404_NOT_FOUND)
        serializer=ser.t_gameSerializer(found_games, many=True)
        return JsonResponse(serializer.data, safe=False)

'''class t_game_view(ModelViewSet):#viewsets.ViewSet
    serializer_class = t_gameSerializer
    queryset = t_game.objects.all()'''
"""
class t_user_view(viewsets.ModelViewSet):
    serializer_class = t_user_Serializer
    queryset = t_user.objects.all()
"""
#User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
@csrf_exempt
@api_view(['POST'])
def register_user2(request):
    args = request.GET
    try:
        username = args.__getitem__('username')
        mail = args.__getitem__('email')
        password = args.__getitem__('password')
    except MultiValueDictKeyError:
        return JsonResponse({"Massage":"Bad Request"},status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'POST':
        #User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
        if User.objects.filter(username=username).exists():
            return JsonResponse({"Massage":"Username is taken"},status=status.HTTP_400_BAD_REQUEST)
        elif User.objects.filter(email=mail).exists():
            return JsonResponse({"Massage":"Email is taken"},status=status.HTTP_400_BAD_REQUEST)
        else:
            user_data = {'username':username,'email':mail,'password':password}
            
        #serializer = ser.t_user_Serializer(data=user_data)
        #serializer.save()
        User.objects.create_user(username, mail, password)
        return JsonResponse({"Massage":"User Was Added"},status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['PUT','GET'])
def register_user(request):
    args = request.GET
    try:
        username = args.__getitem__('Username')
        mail = args.__getitem__('Mail')
        password = args.__getitem__('Password')
    except MultiValueDictKeyError:
        return JsonResponse({"Massage":"Bad Request"},status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PUT':
        if t_user.objects.filter(Username=username).exists():
            return JsonResponse({"Massage":"Username is taken"},status=status.HTTP_400_BAD_REQUEST)
        elif t_user.objects.filter(Mail=mail).exists():
            return JsonResponse({"Massage":"Email is taken"},status=status.HTTP_400_BAD_REQUEST)
        else:
            user_data = {'Username':username,'Mail':mail,'Password':password}
            
        serializer = ser.t_user_Serializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"Massage":"User Was Added"},status=status.HTTP_201_CREATED)

@csrf_exempt
@login_required
def populateDataBase(request):
    script.run()

@csrf_exempt
@api_view(['GET'])
def getAllGames(request):
    args = request.GET
    try:
        game_id = args.__getitem__('game')
    except MultiValueDictKeyError:
        game_id = None

    if request.method == 'GET':
        if game_id is None:
            count_of_games_in_page = 10
            try:
                page_id = int(args.__getitem__('page_id'))
            except MultiValueDictKeyError:
                page_id = 1

            games_info = table.t_game.objects.filter(
                    id__gt=((page_id-1)*count_of_games_in_page),
                    id__lte=(page_id*count_of_games_in_page))

            output_list = []
            for i in games_info.values():
                review = (table.t_review.objects
                .values('game_id_id')
                .annotate(avg_rank=Avg('review_number'))
                .order_by('-avg_rank')).filter(game_id_id=i["id"])
                list_of_categories = []
                for j in t_game_genre.objects\
                            .filter(game_id_id=i["id"]).select_related().values():
                    list_of_categories.append(t_genre.objects.get(id=j['genre_id_id']).genre_name)

                game_info_dict = i
                try: 
                    game_info_dict['avg_rank'] = round(review[0]['avg_rank'],2)
                except IndexError:
                    game_info_dict['avg_rank'] = 0.0

                game_info_dict['genres'] = list_of_categories
                output_list.append(game_info_dict)

            serializer = ser.fullGameSerializer(output_list,many=True)
            return JsonResponse(serializer.data,safe=False)

        else:
            game_info = table.t_game.objects.filter(id=game_id).values()
            review = (table.t_review.objects
                .values('game_id_id')
                .annotate(avg_rank=Avg('review_number'))
                .order_by('-avg_rank')).filter(game_id_id=game_id)
            list_of_categories = []
            for i in t_game_genre.objects.filter(game_id_id=game_id).select_related().values():
                list_of_categories.append(t_genre.objects.get(id=i['genre_id_id']).genre_name)

            game_info_dict = game_info[0]
            try:
                game_info_dict['avg_rank'] = round(review[0]['avg_rank'],2)
            except IndexError:
                game_info_dict['avg_rank'] = round(review[0]['avg_rank'],2)

            game_info_dict['genres'] = list_of_categories
            serializer = ser.fullGameSerializer([game_info_dict],many=True)

            return JsonResponse(serializer.data,safe=False)
            
#def top10_using_serializer(request):
@csrf_exempt
@api_view(['GET'])
def top_10_games(request):
    if request.method == 'GET':
        result = (table.t_review.objects
                .values('game_id_id')
                .annotate(avg_rank=Avg('review_number'))
                .order_by('-avg_rank'))[:10]
        
        for i in result:
            i['name'] = table.t_game.objects.get(id=i['game_id_id']).name
            i['image_url'] = table.t_game.objects.get(id=i['game_id_id']).image_url
            
        serializer = ser.Top10Games(result,many=True)
        return JsonResponse(serializer.data,safe=False)
@csrf_exempt
@login_required
@api_view(['GET','PUT','DELETE','UPDATE'])
def games_review(request): 
    args = request.GET
    try:
        user_id1 = args.__getitem__('user')
    except MultiValueDictKeyError:
        user_id1=None
    try:
        game_id1 = args.__getitem__('game')
    except MultiValueDictKeyError:
        game_id1=None
    
    #All If Statements works correctly for GET method
    if request.method == 'GET':
        if all(item is not None for item in [user_id1,game_id1]):
            specific_review = table.t_review.objects.get(user_id=user_id1,game_id=game_id1)
            serializer = ser.GamesReview(specific_review)
            return JsonResponse(serializer.data,safe=False)
        
        elif all(item is None for item in [user_id1,game_id1]):
            all_reviews = table.t_review.objects.all()
            serializer = ser.GamesReview(all_reviews,many=True)
            return JsonResponse(serializer.data,safe=False)

        elif user_id1 is None:
            specific_game = table.t_review.objects.filter(game_id=game_id1)
            serializer = ser.GamesReview(specific_game,many=True)
            return JsonResponse(serializer.data,safe=False)

        elif game_id1 is None:
            specific_user = table.t_review.objects.filter(user_id=user_id1)
            serializer = ser.GamesReview(specific_user,many=True)
            return JsonResponse(serializer.data,safe=False)

    #PUT method works correctyl
    elif request.method == 'PUT':
    
        user_added_review = table.t_review.objects.filter(user_id=user_id1,game_id=game_id1)
        if user_added_review.exists():
            return JsonResponse({"Massage":"dodales juz recencje do tej gry "},status=status.HTTP_404_NOT_FOUND)
        else:
            try:
                game_score = args.__getitem__("game_score")            
            except MultiValueDictKeyError:
                return JsonResponse({"Massage":"nie udalo sie "},status=status.HTTP_404_NOT_FOUND)
            
            description = args.__getitem__("description")

            temp={'game_id_id':game_id1,'user_id_id':user_id1,'review_number':game_score,'description':description}
            serializer = ser.GamesReview(data=temp)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"Massage":"Review was added"},status=status.HTTP_201_CREATED)
  
    elif request.method == 'DELETE':
        try:
            review_info = table.t_review.objects.get(user_id=user_id1,game_id=game_id1)
        except table.t_review.DoesNotExist:
             return JsonResponse({"Massage":"You haven't Added Review for This Game"},status=status.HTTP_404_NOT_FOUND)

        review_info.delete()
        return JsonResponse({'Massage': 'Review was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
@csrf_exempt
@api_view(['POST','GET'])
def login_view2(request):
    '''print("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeere")
    print(request.GET.keys())
    print("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeere")
    print(request)'''
    username = request.GET.__getitem__('username')
    password = request.GET.__getitem__('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        # u nas return success to frontend
        response={"sucess":True}
        return JsonResponse(response,safe=False)
    else:
        # Return an 'invalid login' error message.
        response={"sucess":False}
        return JsonResponse(response,safe=False)


@api_view(['GET','PUT','DELETE','UPDATE'])
@csrf_exempt
def logout_view2(request):
    logout(request)
    response={"sucess":True}
    return JsonResponse(response,safe=False)

"""
def top10(requst):
    jsone = []
    iter = 0
    result = (table.t_review.objects
                .values('game_id_id')
                .annotate(avg_rank=Avg('review_number'))
                .order_by('-avg_rank'))
    
    for i in result:
        query = table.t_game.objects.filter(id=i['game_id_id']).first()
        output = {"game_name":query.name,"game_reviews":round(i['avg_rank'],2),"image":query.image_url}
        jsone.append(output)


    return JsonResponse(jsone,safe=False)
"""
'''def getAllGames(request):
    jsone = {}
    j = 0
    for row in table.t_genre.objects.all():
        jsone[j] = row.genre_name
        j += 1
    return JsonResponse(jsone)'''