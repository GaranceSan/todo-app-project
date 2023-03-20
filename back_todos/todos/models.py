from django.db import models

class Todos(models.Model):
    
    task = models.CharField(max_length=100, blank=False)
    done = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

class Meta:
    ordered=['created']