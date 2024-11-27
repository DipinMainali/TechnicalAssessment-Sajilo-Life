import React, { useState } from "react";
import NewsSearch from "./components/NewsSearch";
import NewsList from "./components/NewsList";
import { fetchNewsBySearchQuery } from "./services/newsService";
import "./styles/App.css"; // Import custom styles

const App = () => {
  const [articles, setArticles] = useState([]);

  const handleSearch = async (searchQuery) => {
    const result = await fetchNewsBySearchQuery(searchQuery);
    setArticles(result);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">News App</h1>
        <p className="app-subtitle">
          Get the latest updates from around the world
        </p>
      </header>

      <div className="search-container">
        <NewsSearch onSearch={handleSearch} />
      </div>

      <div className="news-list-container">
        <NewsList articles={articles} />
      </div>
    </div>
  );
};

export default App;
