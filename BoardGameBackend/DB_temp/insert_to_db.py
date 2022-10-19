#from matplotlib.pyplot import axis
import pandas as pd
import psycopg2 as postgre

df = pd.read_csv('bgg_db.csv',sep=';')
df = df.dropna(how='all', axis='columns')
df = df.drop_duplicates(subset=['names'])
print(df.head())
print(df.nunique())
def populate_genres(dataframe,con):
    postgr_cur = con.cursor()
    list_of_genres = []
    for row in dataframe['category']:
        genres = row.split('/')
        for i in genres:
            if i.strip() not in list_of_genres:
                list_of_genres.append(i.strip())
    
    
    for elem in list_of_genres:
        new_genre = elem.replace("'","''")
        postgr_cur.execute("Insert Into t_genre (name) values ('{}')".format(new_genre))

"""
bgg_url
min_time
max_time
image_url
thumb_url
mechanic
"""
def assign_games_to_genres(dataframe,name,category,cur):
    cur.execute("select Id from t_game where name='{}'".format(name))
    game_id = cur.fetchall()[0]
    splited_categories = category.split("/")
    for category_name in splited_categories:
        cat_name = category_name.replace("'","''")
        
        cur.execute("select Id from t_genre where name='{}'".format(cat_name.strip()))
        genre_id = cur.fetchall()
        cur.execute("""insert into t_game_genre (game_id,genre_id) 
                    values ({},{})""".format(game_id[0],genre_id[0][0]))

def populate_games(dataframe,con):
    postgr_cur = con.cursor()
    new_df = dataframe.drop(['bgg_url','min_time','max_time','image_url','thumb_url','mechanic'],axis=1)
    for i,row in new_df.iterrows():
        #if(i == 10):
        #    break
        new_name = row['names'].replace("'","''")
        replaced_designers = row['designer'].replace("'","''")
        splited_designers = replaced_designers.split(",")
        if len(splited_designers) > 1:
            new_designer = splited_designers[0]+","+splited_designers[1]
        else:
            new_designer = splited_designers[0]

        new_publisher = row['publisher'].replace("'","''")
        new_weight = row['weight'].replace(",",".")

        print(len(new_name),len(new_designer),len(new_publisher),i)
        if len(new_designer) > 255:
            print(new_designer)
        postgr_cur.execute("""Insert Into t_game 
            (name,release_year,designer,publisher,age,min_players,max_players,avg_time,game_weight)
            Values ('{}',{},'{}','{}',{},{},{},{},{})"""
            .format(new_name,row['year'],new_designer,new_publisher,row['age'],
                    row['min_players'],row['max_players'],row['avg_time'],new_weight))

        df_for_assigment = new_df.drop(['year','designer','publisher',
                        'age','min_players','max_players','avg_time','weight'],axis=1)

        assign_games_to_genres(df_for_assigment,new_name,row['category'],postgr_cur)




postgre_connection = postgre.connect(database='djangoCourseDB',user='postgres',
                                    password='admin',host='127.0.0.1',port='5432')


#database='postgres'


populate_genres(df,postgre_connection)
populate_games(df,postgre_connection)
postgre_connection.commit()
postgre_connection.close()
