from django.db import models

class Booking(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    location = models.CharField(max_length=100)
    treatment = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.treatment}"
    


class Appointment(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.CharField(max_length=20,null=True, blank=True)

    def __str__(self):
        return f"{self.name}"
    
    