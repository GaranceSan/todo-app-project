from django.db import models

class Listes(models.Model):
    list_name = models.CharField(max_length=100, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.list_name


class Todos(models.Model): 
    task = models.CharField(max_length=100, blank=False)
    done = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    liste = models.ForeignKey(Listes, related_name='todos', on_delete=models.CASCADE)

    class Meta:
        ordering=['created']

    def __str__(self) -> str:
        return self.task


