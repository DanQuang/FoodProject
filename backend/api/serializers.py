from rest_framework import serializers
from .models import FoodImage

class FoodImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodImage
        fields = ('image',)
