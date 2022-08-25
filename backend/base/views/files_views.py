from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import jwt
from base.models import File
from base.serializers import FileSerializer, FileSerializerOnlyURL

from django.db.models import Count



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFiles(request):

    files = File.objects.filter(username=request.user).order_by("createdAt")
    files = files.filter(revision=0)
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFilesByID(request, pk):

    file0 = File.objects.get(id=pk)

    filename = file0.filename
    url = file0.url

    files = File.objects.all()
    files = files.filter(filename=filename)
    files = files.filter(url=url)

    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFilesOnlyURL(request):

    files = File.objects.values('url').annotate(count=Count('url'))
    serializer = FileSerializerOnlyURL(files, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def registerFile(request):

    data = request.data
    user = request.user

    urlslash = data['url']
    if urlslash[0] != '/':
        urlslash = '/' + urlslash

    #check if product already exists
    queryset = File.objects.all()
    queryset = queryset.filter(filename=data['file'].name)
    queryset = queryset.filter(url=urlslash)
    revision = len(queryset)

    File.objects.MEDIA_URL = data['url']
    newfile = File.objects.create(
        url = urlslash,
        file = data['file'],
        filename = data['file'].name,
        username = user,
        revision = revision
    )

    serializer = FileSerializer(newfile, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)