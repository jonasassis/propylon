from django.db import models
from django.contrib.auth.models import User
import os

# Create your models here.


class NameField(models.CharField):
    def __init__(self, *args, **kwargs):
        super(NameField, self).__init__(*args, **kwargs)

    def get_prep_value(self, value):
        return str(value).lower()

def get_upload_path(instance, filename):
    url = instance.url
    if instance.url[0] == '/' : 
        url =  instance.url[1:]
    return os.path.join(url, filename)


class File(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    file = models.FileField(upload_to=get_upload_path, null=True, blank=True)
    filename = models.CharField(max_length=200, null=True, blank=True)
    url = NameField(max_length=200, null=True, blank=True)
    revision = models.IntegerField()
    username = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt =  models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return os.path.basename(self.file.name)