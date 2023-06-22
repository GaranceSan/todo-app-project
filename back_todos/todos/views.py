from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from todos.models import Todos,Listes
from todos.serializers import TodosSerializers,ListesSerializers, ListeNewSerializer
from django.http import Http404


class ListeNewView(APIView):
    def post(self, request, format=None):
        serializer =ListeNewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListesView(APIView):
    def get (self, request, format=None):
        listes = Listes.objects.all()
        serializer = ListesSerializers(listes, many=True) 
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer =ListesSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class Listes_detail(APIView):
    def get_object(self,pk):
        try:
            return Listes.objects.get(pk=pk)
        except Listes.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        liste = self.get_object(pk)
        serializer = ListesSerializers(liste)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        liste = self.get_object(pk)
        serializer = ListesSerializers(liste, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        liste = self.get_object(pk)
        liste.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class TodosCreate(APIView):
    # def get (self, request, format=None):
    #     todos = Todos.objects.all()
    #     serializer = TodosSerializers(todos, many=True) 
    #     return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer =TodosSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class Todos_detail(APIView):
    def get_object(self,pk):
        try:
            return Todos.objects.get(pk=pk)
        except Todos.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        todo = self.get_object(pk)
        serializer = TodosSerializers(todo)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        todo = self.get_object(pk)
        serializer = TodosSerializers(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request, pk, format=None):
        todo = self.get_object(pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




