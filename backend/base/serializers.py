from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import File


# Converting object User into data
class UserSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'name']

    def get_id(self, obj):
        return obj.id

    def get_name(self, obj):
    
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


# Converting object User into data with TOKEN
class UserSerializerWithToken(UserSerializer):

    id = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = fields = ['id', 'username', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# Converting object File into data
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


# Converting object URLS into data
class FileSerializerOnlyURL(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['url']