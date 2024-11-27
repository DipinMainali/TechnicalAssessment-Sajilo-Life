from django.shortcuts import render

# Create your views here.
import requests
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def get_weather(request):
    city = request.GET.get('city', 'Kathmandu')  # Default to Kathmandu

    print(f"Received city: {city}")
    if not city:
        city='Kathmandu'
    api_key = settings.OPENWEATHER_API_KEY
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    print(url)

    try:
        response = requests.get(url)
        data = response.json()
        if response.status_code == 200:
            return Response(data)
        else:
            return Response({"error": data.get("message", "Unable to fetch weather")}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

