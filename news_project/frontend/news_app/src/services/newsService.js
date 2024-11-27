import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/news/search/", // Updated base URL to point to the search endpoint
  timeout: 5000, // Request timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch news by search query
export const fetchNewsBySearchQuery = async (searchQuery) => {
  if (!searchQuery.trim()) {
    throw new Error("Search query cannot be empty."); // Validate input
  }

  try {
    const response = await apiClient.get("", {
      params: { q: searchQuery }, // Pass search query as a query parameter
    });
    return response.data.articles || []; // Return articles if available, otherwise return an empty array
  } catch (error) {
    console.error("Error fetching news by search query:", error);
    throw new Error(
      error.response?.data?.error || "Failed to fetch news articles"
    ); // Standardized error message
  }
};
