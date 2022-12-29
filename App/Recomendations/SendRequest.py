from requests import get, ConnectionError
from time import sleep
from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()

def sleep_job(self):
    print('Im goint to sleep')
    sleep(20)
    scheduler.add_job(self.sleep_job, 'date', run_date=send_time, args=[],id="id1")



'''sleep(5)
while True:
    request = get('http://app:8000/BoardGamesAPI/games/getAllGames',params={'game_id':'11'})
    print(request.text)
    print("odebrana wiadomosc")
    sleep(5)
'''

"""def send_request():
    print("isdasdasdasd")#get('http://app:8000/BoardGamesAPI/games/getAllGames?game_id=11').text)

schedule.every(5).seconds.do(send_request)
while True:
    schedule.run_pending()
    sleep(1)
"""