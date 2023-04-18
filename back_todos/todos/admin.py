from django.contrib import admin
from .models import Todos, Listes

class TodosInline(admin.TabularInline):
    model = Todos

class ListesAdmin(admin.ModelAdmin):
    inlines = [
        TodosInline,
    ]


admin.site.register(Listes, ListesAdmin)

