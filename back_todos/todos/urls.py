from django.urls import path
from todos import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("", views.ListesView.as_view()),
    path("new/", views.ListeNewView.as_view()),
    path("item/new/", views.TodosCreate.as_view()),
    path("<int:pk>/", views.Listes_detail.as_view()),
    path("items/<int:pk>/", views.Todos_detail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)