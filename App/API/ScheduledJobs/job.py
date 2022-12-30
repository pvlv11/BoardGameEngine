from django.conf import settings
from time import sleep
from datetime import datetime

def priiny_schedule():
    print("jestyem schedulowaną robota: {}".format(datetime.now().strftime("%H:%M:%S")))