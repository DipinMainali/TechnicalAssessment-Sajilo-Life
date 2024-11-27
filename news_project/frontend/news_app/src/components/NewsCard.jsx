import React from "react";
import "../styles/NewsCard.css"; // Importing the CSS for styling

const NewsCard = ({ article }) => {
  const { title, description, source, author, publishedAt, url } = article;

  return (
    <div className="news-card">
      <div className="news-card-header">
        <h2 className="news-card-title">{title}</h2>
      </div>
      <div className="news-card-body">
        <p className="news-card-description">{description}</p>
        <div className="news-card-meta">
          <span className="news-card-author">By: {author || "Unknown"}</span>
          <span className="news-card-source">Source: {source.name}</span>
          <span className="news-card-date">
            Published: {new Date(publishedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="news-card-footer">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card-readmore"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
