import React, { useEffect, useState } from "react";
import { fetchNewsBySearchQuery } from "../services/newsService"; // Fetching news data
import NewsCard from "./NewsCard"; // Importing the NewsCard component
import "../styles/NewsList.css"; // Optional, for custom list styling

const NewsList = ({ searchQuery }) => {
  const [newsData, setNewsData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been performed

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNewsBySearchQuery(searchQuery);
        setNewsData(data.articles || []); // Handle cases where `articles` is undefined
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setHasSearched(true); // Mark search as performed
      }
    };

    if (searchQuery) {
      setHasSearched(false); // Reset before new search
      getNews();
    }
  }, [searchQuery]);

  return (
    <div className="news-list">
      {hasSearched && newsData.length === 0 ? (
        <p>No news found for "{searchQuery}"</p>
      ) : (
        newsData.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))
      )}
    </div>
  );
};

export default NewsList;
