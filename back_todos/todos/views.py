from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from todos.models import Todos
from todos.serializers import TodosSerializers


@api_view(["GET","POST"])
def todos_list(request):
    if request.method == "GET":
        todo = Todos.objects.all()
        serializer = TodosSerializers(todo, many=True) 
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = TodosSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(["GET","PUT","DELETE"])
def todos_detail(request,pk):
    try:
        todo = Todos.objects.get(pk=pk)
    except Todos.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = TodosSerializers(todo)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TodosSerializers(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




