from rest_framework import serializers
from .models import *


class t_user_Serializer(serializers.ModelSerializer):

    class Meta:
        model=t_user
        fields= ('id', 'Username', 'Mail', 'Password')#case specific czyli doslownie to co w modelu


class t_gameSerializer(serializers.ModelSerializer):

    class Meta:
        model=t_game
        fields = ('id', 'title', 'min', 'max')