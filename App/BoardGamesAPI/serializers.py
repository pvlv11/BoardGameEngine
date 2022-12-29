
#from dataclasses import fields
#from pyexpat import model

from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email')
       
class register_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], 
                                        validated_data['email'], 
                                        validated_data['password'])
        
        user.set_password(validated_data['password'])
        user.save()
        return user       
        
class t_user_Serializer(serializers.ModelSerializer):

    class Meta:
        model=t_user
        fields= ('Username', 'Mail', 'Password')#case specific czyli doslownie to co w modelu

class t_gameSerializer(serializers.ModelSerializer):
    rank_value = serializers.FloatField()
    genres = serializers.ListField(child=serializers.CharField(max_length=255))
    is_favourite = serializers.BooleanField()
    class Meta:
        model=t_game
        fields = ('id', 'name','release_year','avg_time',
                'min_player', 'max_player','minimal_age',
                'publisher','image_url','game_designer',
                'game_description','suggested_players',
                'suggested_age','rank_value','genres','is_favourite')

class t_favourite_serializer(serializers.ModelSerializer):
    class Meta:
        model = t_user_game
        fields = ('user_id','game_id')
        
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
    
class Top10Games(serializers.Serializer):
    game_id_id = serializers.IntegerField(required=True)
    avg_rank = serializers.FloatField(required=True)
    name = serializers.CharField(required=True,max_length=255)
    image_url = serializers.CharField(required=True,max_length=500)

class filterSerializer(serializers.Serializer):
    genres = serializers.ListField(child=serializers.CharField(max_length=255))
    player = serializers.ListField(child=serializers.IntegerField(min_value=0))
    age = serializers.ListField(child=serializers.IntegerField(min_value=0))
    time = serializers.ListField(child=serializers.IntegerField(min_value=0))


'''
class GamesReview(serializers.Serializer):
    user_id_id = serializers.IntegerField(required=True)
    game_id_id = serializers.IntegerField(required=True)
    review_number = serializers.DecimalField(required=True,max_digits=4,decimal_places=2)
    description = serializers.CharField(required=False,allow_blank=True,max_length=500)

    def create(self, validated_data):
        return t_review.objects.create(**validated_data)
        '''

"""
    class Meta:
        model = t_review
        fields = ('id','game_id_id','user_id_id','review_number','description')
"""
