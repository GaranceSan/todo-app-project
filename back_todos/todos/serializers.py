from rest_framework import serializers
from todos.models import Todos

class TodosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = ["id", "task","done","created"]
