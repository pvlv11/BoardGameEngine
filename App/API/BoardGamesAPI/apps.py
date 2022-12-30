from django.apps import AppConfig

class BoardgamesapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'BoardGamesAPI'

    def ready(self):
        from ScheduledJobs import updater
        #updater.start()