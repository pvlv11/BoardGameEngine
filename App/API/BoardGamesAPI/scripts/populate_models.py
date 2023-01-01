from BoardGamesAPI.models import t_genre,t_game,t_game_genre
import pandas as pd
from random import randint
from django.http import JsonResponse
from django.db.utils import IntegrityError


def populate_genres(dataframe):
    unique_categories = []
    for i in dataframe:
        for category in i[1:len(i)-1].split(','):
            new_cat = category.strip().replace("'","")
            if new_cat not in unique_categories:
                unique_categories.append(new_cat)

    for cat in unique_categories:
        try:
            table_row = t_genre(genre_name=cat)
            table_row.save()
        except IntegrityError:
            return False
        
    return True


"""
bgg_url
min_time
max_time
image_url
thumb_url
mechanic
"""
def assign_games_to_genres(game_name,category):
    query_to_model = t_game.objects.filter(name=game_name).first()
    t_game_inst = t_game.objects.get(id=int(query_to_model.id))

    game_categories = []
    for cat in category[1:len(category)-1].replace("'","").split(","):
        game_categories.append(cat.strip())

    for category_name in game_categories:
        query_to_model = t_genre.objects.filter(genre_name=category_name).first()
        t_genre_inst = t_genre.objects.get(id=int(query_to_model.id))
        #table_row = t_game_genre(game_id=game_id_value,genre_id=query_to_model[0]["id"])
        table_row = t_game_genre(game_id=t_game_inst,genre_id=t_genre_inst)
        table_row.save()

def populate_database(dataframe):
    for i,row in dataframe.iterrows():
        #Get first designer name from dataset
        designer_name = row['boardgamedesigner']\
                            [1:len(row['boardgamedesigner'])-1]\
                            .replace("'",'').strip().split(',')[0]
        #Get first pulisher from dataset
        publisher_name = row['boardgamepublisher']\
                            [1:len(row['boardgamepublisher'])-1]\
                            .replace("'",'').strip().split(',')[0]
        #Get info about suggested age of players based on data from dataset
        age_dict = {}
        age_values = row['suggested_playerage']\
                .replace("OrderedDict([('@value', ","")\
                .replace("), ('@numvotes', ","").replace(")])","")
        for sug_age in age_values[1:len(age_values)-1].replace(" ","").split(','):
            age_and_votes = sug_age.replace("'"," ").strip().split()
            age_dict[age_and_votes[0]] = age_and_votes[1]
        first_value = sorted(age_dict.items(),key=lambda x:x[1],reverse=True)[0]
        sugested_age = 0
        if(first_value[0] == '21andup'):
            sugested_age = 21
        else:
            sugested_age = int(first_value[0])

        #Get info about suggested player count
        player_dict = {}
        player_values = row['suggested_num_players']\
                .replace("[OrderedDict([('@numplayers', ","")\
                .replace("), ('result', [OrderedDict([('@value', 'Best'), ('@numvotes', ", "")\
                .replace(")]), OrderedDict([('@value', 'Recommended'), ('@numvotes', ","")\
                .replace(")]), OrderedDict([('@value', 'Not Recommended'), ('@numvotes', ", "")\
                .replace(")])])])","").replace("OrderedDict([('@numplayers', ","").replace("]","")
        for sug_player in player_values.split(','):
            player_vote = sug_player.replace("''"," ").replace("'","")\
                            .strip().replace("+","").split(" ")
            if (len(player_vote) > 1):
                player_dict[player_vote[0]] = int(player_vote[1])
            else:
                player_dict[0] = 2
        min_age = 0
        if row['minage'] > 18:
            min_age = 18
        else:
            min_age = row['minage']

        first_value = sorted(player_dict.items(),key=lambda x:x[1],reverse=True)
        sugested_player = int(first_value[0][0])
        pubilsh_year = row['yearpublished'] if row['yearpublished'] > 0 else randint(2000,2022)
        table_row = t_game(name=row['primary'],game_designer=designer_name,
                game_description=row['description'],release_year=pubilsh_year,
                min_game_time=row['minplaytime'],max_game_time=row['maxplaytime'],
                avg_time=row['playingtime'],min_player=row['minplayers'],
                max_player=randint(int(sugested_player),int(sugested_player+2)),
                suggested_players=sugested_player,suggested_age=sugested_age,
                minimal_age=min_age,publisher=publisher_name,
                image_url=row['image'])
        
        table_row.save()
        
        assign_games_to_genres(row['primary'],row['boardgamecategory'])

#http://127.0.0.1:8000/BoardGamesAPI/games/populate

def run():
    path_to_file = './BoardGamesAPI/scripts/games_detailed_info.csv'
    pd.set_option('display.max_columns', None)
    df = pd.read_csv(path_to_file,low_memory=False)
    df = df.drop(['Unnamed: 0','type','id','thumbnail','alternate',
                'suggested_language_dependence','boardgamemechanic',
                'boardgamefamily','boardgameexpansion','boardgameimplementation',
                'boardgameartist',],axis=1)
    df = df[df.columns[:15]]
    df = df.drop_duplicates(subset='primary',keep='first')
    out = populate_genres(df['boardgamecategory'].dropna())
    print(out)
    if out:
        populate_database(df.dropna())
        return True
    else:
        return False


