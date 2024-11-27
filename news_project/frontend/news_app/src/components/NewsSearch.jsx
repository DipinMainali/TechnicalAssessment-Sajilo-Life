import React, { useState } from "react";
import { fetchNewsBySearchQuery } from "../services/newsService";
import "../styles/NewsSearch.css";

const NewsSearch = () => {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been performed

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setArticles([]);
    setHasSearched(true); // Mark that a search has been performed

    if (!query.trim()) {
      setError("Search query cannot be empty.");
      setHasSearched(false); // Reset if query is invalid
      return;
    }

    try {
      const fetchedArticles = await fetchNewsBySearchQuery(query);
      if (fetchedArticles.length === 0) {
        setError("No articles found for your query.");
      } else {
        setArticles(fetchedArticles);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch news articles.");
    }
  };

  return (
    <div className="news-search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="articles-container">
        {hasSearched && articles.length == 0 && !error && (
          <p>No articles found for your query.</p>
        )}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <div key={index} className="article-card">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewsSearch;
