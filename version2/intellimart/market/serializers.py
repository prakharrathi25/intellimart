from rest_framework import serializers
from .models import *

''' Define different classes which will be serializing our original models '''
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'