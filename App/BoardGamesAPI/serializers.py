from rest_framework import serializers
from .models import t_game


class t_gameSerializer(serializers.ModelSerializer):

    class Meta:
        model=t_game
        fields = ('id', 'title', 'min', 'max')
