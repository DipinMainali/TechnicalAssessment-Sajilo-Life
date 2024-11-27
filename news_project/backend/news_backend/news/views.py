import requests
from django.conf import settings
from django.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import logging
import datetime

NEWS_API_KEY = settings.NEWSDATA_API_KEY
logger = logging.getLogger(__name__)

@api_view(["GET"])
def search_articles(request):
    # Extract and validate query parameters
    query = request.GET.get("q", "").strip()
    if not query:
        return JsonResponse({
            "error": "The 'q' parameter is required and cannot be empty."
        }, status=400)

    from_date = request.GET.get("from", "")
    to_date = request.GET.get("to", "")
    language = request.GET.get("language", "en")
    sort_by = request.GET.get("sortBy", "publishedAt")
    domains = request.GET.get("domains", "")

    # Validate date format if provided
    def validate_date(date_string):
        try:
            datetime.strptime(date_string, "%Y-%m-%d")
            return True
        except ValueError:
            return False

    if from_date and not validate_date(from_date):
        return JsonResponse({"error": "Invalid 'from' date format. Use YYYY-MM-DD."}, status=400)
    if to_date and not validate_date(to_date):
        return JsonResponse({"error": "Invalid 'to' date format. Use YYYY-MM-DD."}, status=400)

    # Log query parameters
    logger.info("Fetching news for query: %s", query)

    # Construct API request
    base_url = "https://newsapi.org/v2/everything"
    params = {
        "q": query,
        "from": from_date,
        "to": to_date,
        "language": language,
        "sortBy": sort_by,
        "domains": domains,
        "apiKey": NEWS_API_KEY,
    }

    # Fetch data from the News API
    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        formatted_articles = [
            {
                "source": article.get("source", {}).get("name", "Unknown Source"),
                "author": article.get("author", "Unknown Author"),
                "title": article.get("title", "No Title"),
                "description": article.get("description", "No Description"),
                "url": article.get("url"),
                "urlToImage": article.get("urlToImage"),
                "publishedAt": article.get("publishedAt"),
            }
            for article in data.get("articles", [])
        ]

        return JsonResponse({
            "status": data.get("status", "error"),
            "totalResults": data.get("totalResults", 0),
            "articles": formatted_articles
        })
    else:
        return JsonResponse({
            "error": "Unable to fetch news",
            "details": response.json()
        }, status=response.status_code)
