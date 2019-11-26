from django.shortcuts import render
from .serializers import CarSerializer
from rest_framework import viewsets
from .models import Cars
from django.http import HttpResponse
from rest_framework.decorators import action
from selectorlib import Extractor
import requests
import json



class CarViewSet(viewsets.ModelViewSet):
    queryset = Cars.objects.all()
    serializer_class = CarSerializer

    @action(methods=['post'], detail=False)
    def findParts(self, request, pk=None):
        userData = request.data
        baseURL = "https://www.google.com/search?q=QUESTION&tbm=shop"
        questionToInsert = ""
        if(request.data.get('year') is not None):
            questionToInsert += str(request.data.get('year')) + '+'
        if(request.data.get('make') is not None):
            questionToInsert += str(request.data.get('make')) + '+'
        if(request.data.get('model') is not None):
            questionToInsert += str(request.data.get('model')) + '+'

        partsList = ['Brakes', 'Tires', 'Headlights', 'Windshield+Wipers', 'Transmission', 'Engine', 'Battery', 'Axle']
        returnData = []

        for parts in partsList:
            forReplacing = baseURL
            questionToInsert2 = questionToInsert + str(parts)
            forReplacing = forReplacing.replace("QUESTION", questionToInsert2)
            e = Extractor.from_yaml_file("/var/www/html/sean.droke/car-parts-selector/backend/CarParts/GooglePricing.yml")
            user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
            headers = {'User-Agent': user_agent}
            print(baseURL)
            r = requests.get(forReplacing, headers=headers)
            data = e.extract(r.text)
            returnData.append(json.dumps(data))

        return HttpResponse(json.dumps(returnData))

