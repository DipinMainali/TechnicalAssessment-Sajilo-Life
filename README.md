# News and Weather App

This is a full-stack application that includes two main features:

- **News App**: Fetches and displays the latest news articles based on user queries.
- **Weather App**: Fetches and displays weather data for a given city.

Both apps are part of a larger project, and each app functions independently.

## Features

### News App

- Search for news articles based on keywords.
- View article titles, descriptions, and links to full articles.
- Results are fetched from an external news API.

### Weather App

- Search weather information based on the city name.
- Displays weather details such as temperature, humidity, wind speed, and weather conditions.
- Uses OpenWeather API for weather data.

## Technologies Used

- **Frontend**:
  - React (for building UI)
  - Material UI (for UI components and styling)
  - React Icons (for weather-related icons)
  - Axios (for making HTTP requests)
- **Backend**:
  - Node.js with Express (to handle the API for news articles)
  - Axios (for fetching data from news API)
- **Weather API**:

  - OpenWeather API for fetching weather data based on city name.

- **News API**:

  -NewsAPI for fetching news articles based on query terms( eg. nepal, kathmandu, business, entertainment etc)

### Backend:

- The **backend** consists of an Django server that fetches news articles from a public news API.
- The server listens for requests as api request and serves news data.

### Frontend:

- The **frontend** is built using React and provides the user interface for both the **News App** and **Weather App**.
- Axios is used to fetch data from both the **News API** and **Weather API**.

### Mobile:

- The **mobile** version of the app is a React Native (or Expo) project that allows users to interact with the same backend and frontend as in the web version.

## Setup Instructions

### 1. Clone the repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/DipinMainali/TechnicalAssessment-Sajilo-Life.git
```

**Backend Setup**
Install Dependencies:
Navigate to the backend folder and install the necessary dependencies:

bash
Copy code
cd backend
npm install
Set Up Environment Variables:
Create a .env file in the backend folder or in settings.py of djnago backend and add your news API key and weather API key. For example:

makefile
Copy code
NEWS_API_KEY=your-news-api-key
OPENWEATHER_API_KEY=your-openweather-api-key
Start the Backend Server:
Run the backend server:

bash
Copy code
npm start

**Frontend Setup**
Install Dependencies:
Navigate to the frontend folder and install the required dependencies:

bash
Copy code
cd frontend
npm install
Start the Frontend Server:
Run the React development server:

bash
Copy code
npm start
This should open the React app in your browser.

**Mobile Setup**
If you want to run the Mobile App, navigate to the mobile folder and set up your React Native or Expo project.

Install dependencies:
bash
Copy code
cd mobile
npm install
Run the app using React Native or Expo commands:
bash
Copy code

# For Expo

npx expo start
