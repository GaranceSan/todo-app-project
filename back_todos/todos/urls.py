from django.urls import path
from todos import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("", views.TodosList.as_view()),
    path("<int:pk>/", views.Todos_detail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)