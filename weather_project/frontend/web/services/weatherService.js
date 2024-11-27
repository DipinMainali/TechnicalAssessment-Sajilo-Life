import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/weather/", // Base URL for the Django backend
  timeout: 5000, // Request timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch weather data by city
export const getWeather = async (city = "Kathmandu") => {
  try {
    const response = await apiClient.get("get_weather/", {
      params: { city }, // Query parameter for the city
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
