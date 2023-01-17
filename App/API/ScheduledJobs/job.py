from django.conf import settings
from time import sleep
from datetime import datetime
#from BoardGameAPI import models
import BoardGamesAPI.models as table
import numpy as np
from datetime import date
from keras.models import load_model


def priiny_schedule():
    print("jestyem schedulowaną robota: {}".format(
        datetime.now().strftime("%H:%M:%S")))


def model_job():

    print('starting job')
    # id_gry, id_user, date, rating
    review_rows = table.t_review.objects.filter(
        creation_date__contains=date.today()).values_list()

    users = []
    games = []
    ratings = []
    for row in review_rows:
        users.append(row[2])
        games.append(row[1])
        ratings.append(row[4])

    users = np.asarray(users).astype('int32')
    games = np.asarray(games).astype('int32')
    ratings = np.asarray(ratings).astype('float32')

    print('got data, lodaing model')

    model = load_model('./model_saved')

    print('loaded model, fitting it')

    x = model.fit(
        x=[users, games],
        y=ratings,
        epochs=10,
        batch_size=128
    )

    print('saving model')
    model.save('./model_saved')
