from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date

# Create your models here.


class User(AbstractUser):
    pass


class Predictions(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='predictor')
    description = models.CharField(max_length=256)
    date = models.DateField(default=date.today)
    prediction = models.FloatField()

    def __str__(self):
        return f'{self.user_id} entered {self.description} with a value of {self.prediction}'

    def serialize(self):
        return {'description': self.description,
                'date': self.date,
                'prediction': self.prediction,
                'id': self.id,
                }
