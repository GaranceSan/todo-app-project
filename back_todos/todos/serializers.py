from rest_framework import serializers
from todos.models import Todos,Listes

class TodosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = ["id", "task", "done","created", "liste"]

class ListesSerializers(serializers.ModelSerializer):
    todos = TodosSerializers(
        many=True,
     )
     
    class Meta:
        model = Listes
        fields = ["id", "created", "list_name", "todos"]
    
    def create(self, validated_data):
        todos_data = validated_data.pop("todos")
        listeInstance = Listes.objects.create(**validated_data)
        for todo_data in todos_data:
            Todos.objects.create(liste=listeInstance, **todo_data)
        return listeInstance
    
    def update(self,instance,validated_data):
        """for  updating list name only """
        #do nothing with the popped tods so any changes on there
        # will not register. Use TodosSerializer and TodosDetail
        # to change individual Todos information
        todos_data = validated_data.pop("todos")
        instance.list_name = validated_data.get("list_name", instance.list_name)
        instance.save()
        for todo in todos_data:
            Todos.objects.update_or_create(**todo)
        return instance
        




