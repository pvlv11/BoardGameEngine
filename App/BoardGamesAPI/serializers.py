#from dataclasses import fields
#from pyexpat import model
from rest_framework import serializers
from .models import *


class t_user_Serializer(serializers.ModelSerializer):

    class Meta:
        model=t_user
        fields= ('id', 'Username', 'Mail', 'Password')#case specific czyli doslownie to co w modelu


class t_gameSerializer(serializers.ModelSerializer):

    class Meta:
        model=t_game
        fields = ('id', 'name', 'release_year','avg_time','min_player', 'max_player','minimal_age','publisher','image_url')

class GamesReview(serializers.Serializer):

    user_id_id = serializers.IntegerField(required=True)
    game_id_id = serializers.IntegerField(required=True)
    review_number = serializers.DecimalField(required=True,max_digits=4,decimal_places=2)
    description = serializers.CharField(required=False,allow_blank=True,max_length=500)

    def create(self, validated_data):
        return t_review.objects.create(**validated_data)
"""
    class Meta:
        model = t_review
        fields = ('id','game_id_id','user_id_id','review_number','description')
"""


        


class Top10Games(serializers.Serializer):
    game_id_id = serializers.IntegerField(required=True)
    avg_rank = serializers.FloatField(required=True)
'''
class GamesReview(serializers.Serializer):
    user_id_id = serializers.IntegerField(required=True)
    game_id_id = serializers.IntegerField(required=True)
    review_number = serializers.DecimalField(required=True,max_digits=4,decimal_places=2)
    description = serializers.CharField(required=False,allow_blank=True,max_length=500)

    def create(self, validated_data):
        return t_review.objects.create(**validated_data)
        '''