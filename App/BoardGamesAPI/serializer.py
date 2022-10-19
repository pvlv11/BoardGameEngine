
from rest_framework import serializers
from BoardGamesAPI.models import t_game,t_review

class ReviewSerializer(serializers.Serializer):
    game_id = serializers.IntegerField(required=True)
    user_id = serializers.IntegerField(required=True)
    description = serializers.CharField(max_length=1000)
    review_number = serializers.FloatField(required=True)

    def create(self, validated_data):

        return t_review.objects.create(**validated_data)
"""
    def update(self, instance, validated_data):
#        Update and return an existing `Snippet` instance, given the validated data.
        
        instance.title = validated_data.get('title', instance.title)
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance"""