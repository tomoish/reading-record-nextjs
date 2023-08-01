from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from .serializers import RecordSerializer
from .models import Record

from django.shortcuts import get_object_or_404


@api_view(['GET'])
def getAllRecords(request):
    records = Record.objects.all()

    serializer = RecordSerializer(records, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRecord(request, pk):
    record = get_object_or_404(Record, id=pk)

    serializer = RecordSerializer(record, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def newRecord(request):
    data = request.data

    record = Record.objects.create(**data)

    serializer = RecordSerializer(record, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateRecord(request, pk):
    record = get_object_or_404(Record, id=pk)

    record.book_title = request.data['book_title']
    record.isbn = request.data['isbn']
    record.date = request.data['date']
    record.first_page = request.data['first_page']
    record.final_page = request.data['final_page']
    record.impression = request.data['impression']

    record.save()

    serializer = RecordSerializer(record, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteRecord(request, pk):
    record = get_object_or_404(Record, id=pk)
    
    record.delete()

    return Response({ 'message': 'Record is Deleted.'}, status=status.HTTP_200_OK)