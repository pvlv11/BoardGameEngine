from datetime import datetime
from .job import priiny_schedule, model_job
from apscheduler.schedulers.background import BackgroundScheduler


def start():
    schedule = BackgroundScheduler()
    #schedule.add_job(model_job, 'interval', seconds=100)
    schedule.start()
