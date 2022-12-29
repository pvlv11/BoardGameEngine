from datetime import datetime
from .job import priiny_schedule
from apscheduler.schedulers.background import BackgroundScheduler

def start():
    schedule = BackgroundScheduler()
    schedule.add_job(priiny_schedule,'interval',seconds=15)
    schedule.start()