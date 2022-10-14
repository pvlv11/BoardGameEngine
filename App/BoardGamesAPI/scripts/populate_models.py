from BoardGamesAPI.models import t_genre,t_game,t_game_genre
import pandas as pd

def populate_genres(dataframe):
    list_of_genres = []
    for row in dataframe['category']:
        genres = row.split('/')
        for i in genres:
            if i.strip() not in list_of_genres:
                list_of_genres.append(i.strip())
    
    
    for elem in list_of_genres:
        table_row = t_genre(genre_name=elem)
        table_row.save()

"""
bgg_url
min_time
max_time
image_url
thumb_url
mechanic
"""
def assign_games_to_genres(dataframe,game_name,category):
    query_to_model = t_game.objects.filter(name=game_name).first()
    print(query_to_model,game_name,"test")
    t_game_inst = t_game.objects.get(id=int(query_to_model.id))

    splited_categories = category.split("/")
    for category_name in splited_categories:
        print(category_name.strip())
        query_to_model = t_genre.objects.filter(genre_name=category_name.strip()).first()
        t_genre_inst = t_genre.objects.get(id=int(query_to_model.id))
        #table_row = t_game_genre(game_id=game_id_value,genre_id=query_to_model[0]["id"])
        table_row = t_game_genre(game_id=t_game_inst,genre_id=t_genre_inst)
        table_row.save()

def populate_games(dataframe):
    new_df = dataframe.drop(['bgg_url','max_time','thumb_url','mechanic'],axis=1)
    for i,row in new_df.iterrows():
        new_name = row['names'].replace("'","''")
        replaced_designers = row['designer'].replace("'","''")
        splited_designers = replaced_designers.split(",")
        if len(splited_designers) > 1:
            new_designer = splited_designers[0]+","+splited_designers[1]
        else:
            new_designer = splited_designers[0]

        if(row['year'] <= 0):
            row['year'] = 2000
            
        new_publisher = row['publisher'].replace("'","''")
        print(new_publisher)
        new_weight = row['weight'].replace(",",".")
        
        table_row = t_game(name=new_name,release_year=row['year'],avg_time=row['min_time'],
                        min_player=row['min_players'],max_player=row['max_players'],
                        minimal_age=row['age'],publisher=new_publisher,image_url = row['image_url'])

        table_row.save()
        
        df_for_assigment = new_df.drop(['year','designer','publisher',
                        'age','min_players','max_players','avg_time','weight'],axis=1)
        assign_games_to_genres(df_for_assigment,new_name,row['category'])



def run():
    print("odpalam skrypt")
    path_to_file = 'BoardGamesAPI/scripts/bgg_db.csv'
    df = pd.read_csv(path_to_file,sep=';',encoding='latin-1')
    df = df.dropna(how='all', axis='columns')
    df = df.drop_duplicates(subset=['names'])
    populate_genres(df)
    populate_games(df)
    print("skrypt wykonany")

if __name__ == "__main__":
    run()
