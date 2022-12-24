from requests import get, ConnectionError
from time import sleep
import schedule

sleep(5)
while True:
    request = get('http://app:8000/BoardGamesAPI/games/getAllGames?game_id=11')
    print(request.text)
    print("odebrana wiadomosc")
    sleep(10)

"""def send_request():
    print("isdasdasdasd")#get('http://app:8000/BoardGamesAPI/games/getAllGames?game_id=11').text)

schedule.every(5).seconds.do(send_request)
while True:
    schedule.run_pending()
    sleep(1)
"""