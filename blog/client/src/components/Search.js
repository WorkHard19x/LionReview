
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styles/Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
      fetchSearchResults(query);
    }
  }, [location.search]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.post('http://localhost:5000/api/search', { query });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };
  const getImageUrl = (result) => {
    if (result.korean_url || result.chinese_url || result.japan_url || result.taiwan_url || result.thailand_url || result.other_url) {
      return result.img;
    } else if (result.url_page) {
      return result.imageUrlnews;
    } else if (result.url_pagecel) {
      return result.imageUrl;
    } else {
      // Default image URL or handle as needed
      return '';
    }
  };
  
  const getRedirectUrl = (result) => {
    if (result.korean_url) {
      return result.korean_url;
    } else if (result.chinese_url) {
      return result.url_pagecel;
    } else if (result.japan_url) {
      return result.url_pagecel;
    } else if (result.taiwan_url) {
      return result.url_pagecel;
    } else if (result.thailand_url) {
      return result.url_pagecel;
    } else if (result.other_url) {
      return result.url_pagecel;
    } else if (result.url_page) {
      return result.url_page;
    } else if (result.url_pagecel) {
      return result.url_pagecel;
    } else {
      // Default redirect URL or handle as needed
      return '';
    }
  };
  return (
    // Update your JSX to wrap the image and title in a container
<div className="search-page">
  <div className="search-nav">
    <div className="search-main">
      <h2>Search Results for "{searchQuery}"</h2>
      <div className="search-results">
        {/* Display search results */}
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.id} className="search-result">
              {/* Render each search result here */}
              {/* For example, you can display image and title */}
              <div className="result-item">
                <a href={getRedirectUrl(result)} target="_blank" rel="noopener noreferrer">
                  <img src={getImageUrl(result)} alt={result.title} style={{ height: '200px', width: '250px' }} />
                </a>
                <p>{result.title}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No search results available.</div>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default Search;
