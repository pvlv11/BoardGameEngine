
#from dataclasses import fields
#from pyexpat import model

from rest_framework import serializers
from .models import *


class t_user_Serializer(serializers.ModelSerializer):

    class Meta:
        model=t_user
        fields= ('Username', 'Mail', 'Password')#case specific czyli doslownie to co w modelu


class t_gameSerializer(serializers.ModelSerializer):

    class Meta:
        model=t_game
        fields = ('id', 'name', 'release_year','avg_time','min_player', 'max_player','minimal_age','publisher','image_url')

class fullGameSerializer(serializers.Serializer):
    
    id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=True,max_length=255)
    release_year = serializers.IntegerField(required=True)
    avg_time = serializers.IntegerField(required=True)
    min_player = serializers.IntegerField(required=True)
    max_player = serializers.IntegerField(required=True)
    minimal_age = serializers.IntegerField(required=True)
    publisher = serializers.CharField(max_length=255)
    image_url = serializers.CharField(max_length=255)
    avg_rank = serializers.DecimalField(required=True,max_digits=4,decimal_places=2)
    genres = serializers.ListField(child=serializers.CharField(max_length=255))

class GamesReview(serializers.Serializer):

    user_id_id = serializers.IntegerField(required=True)
    game_id_id = serializers.IntegerField(required=True)
    review_number = serializers.DecimalField(required=True,max_digits=4,decimal_places=2)
    description = serializers.CharField(required=False,allow_blank=True,max_length=500)

    def create(self, validated_data):
        return t_review.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.user_id_id = validated_data.get('user_id_id', instance.user_id_id)
        instance.game_id_id = validated_data.get('game_id_id', instance.game_id_id)
        instance.review_number = validated_data.get('review_number', instance.review_number)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance
    
"""
    class Meta:
        model = t_review
        fields = ('id','game_id_id','user_id_id','review_number','description')
"""

class Top10Games(serializers.Serializer):
    game_id_id = serializers.IntegerField(required=True)
    avg_rank = serializers.FloatField(required=True)
    name = serializers.CharField(required=True,max_length=255)
    image_url = serializers.CharField(required=True,max_length=500)
'''
class GamesReview(serializers.Serializer):
    user_id_id = serializers.IntegerField(required=True)
    game_id_id = serializers.IntegerField(required=True)
    review_number = serializers.DecimalField(required=True,max_digits=4,decimal_places=2)
    description = serializers.CharField(required=False,allow_blank=True,max_length=500)

    def create(self, validated_data):
        return t_review.objects.create(**validated_data)
        '''
