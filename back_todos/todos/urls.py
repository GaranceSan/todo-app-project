from django.urls import path
from todos import views

urlpatterns = [
    path("", views.todos_list),
    path("<int:pk>/", views.todos_detail),
]