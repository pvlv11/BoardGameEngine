
from rest_framework import serializers
from BoardGamesAPI.models import t_game,t_review

class Top10Games(serializers.Serializer):
    game_id_id = serializers.IntegerField(required=True)
    avg_rank = serializers.FloatField(required=True)

class GamesReview(serializers.Serializer):
    user_id_id = serializers.IntegerField(required=True)
    game_id_id = serializers.IntegerField(required=True)
    review_number = serializers.DecimalField(required=True,max_digits=4,decimal_places=2)
    description = serializers.CharField(required=False,allow_blank=True,max_length=500)

    def create(self, validated_data):
        return t_review.objects.create(**validated_data)