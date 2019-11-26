from rest_framework import serializers
from .models import Cars

class CarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cars
        fields = ['year', 'make', 'model']