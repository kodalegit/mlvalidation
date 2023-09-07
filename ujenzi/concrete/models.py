from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    pass
    # groups = models.ManyToManyField(Group, related_name='user_groups')  # Change related_name
    # user_permissions = models.ManyToManyField(Permission, related_name='user_permissions')  # Change related_name
    


class Predictions(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='predictor')
    description = models.CharField(max_length=256)
    time = models.DateTimeField(default=timezone.get_fixed_timezone(+180))
    prediction = models.FloatField()

    def __str__(self):
        return f'{self.user_id} entered {self.descrtiption} with a value of {self.prediction}'

    def serialize(self):
        return {'description': self.description,
                'time': self.time,
                'prediction':self.prediction
                }

