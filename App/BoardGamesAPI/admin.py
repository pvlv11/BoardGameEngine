from django.contrib import admin
from .models import *


# Register your models here.



class t_userAdmin(admin.ModelAdmin):
    List_display=('username','user_mail','password')

class t_friend_list_Admin(admin.ModelAdmin):
    List_display=('user1_id','user2_id','last_seen')

class t_user_activity_Admin(admin.ModelAdmin):
    List_display=('user_id','activity_type','activity_timestamp')

class t_genre_Admin(admin.ModelAdmin):
    List_display=('genre_name')

class t_game_Admin(admin.ModelAdmin):
    List_display = ('title_name', 'minplayer', 'maxplayer')

class t_game_genre_Admin(admin.ModelAdmin):
    List_display=('game_id','genre_id')


class t_review_Admin(admin.ModelAdmin):
    List_display=('game_id','user_id','review_number','review_text')

class t_user_game_Admin(admin.ModelAdmin):
    List_display=('user-id','game_id')

admin.site.register(t_user, t_userAdmin)
admin.site.register(t_friend_list,t_friend_list_Admin)
admin.site.register(t_user_activity,t_user_activity_Admin)
admin.site.register(t_genre,t_genre_Admin)
admin.site.register(t_game,t_game_Admin)
admin.site.register(t_game_genre,t_game_genre_Admin)
admin.site.register(t_review,t_review_Admin)
admin.site.register(t_user_game,t_user_game_Admin)

#admin.site.register(table name,_Admin)