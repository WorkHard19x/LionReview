import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Search = ({ components }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Filter components based on search query
    const filteredResults = components.filter((component) =>
      component.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleComponentClick = (component) => {
    // Navigate to the selected component
    window.location.href = `/China/${component.path}/1`; // Example path
  };

  return (
    <div className="search-login">
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form>
      {/* Render search results */}
      {searchResults.map((component) => (
        <div key={component.id} onClick={() => handleComponentClick(component)}>
          <img src={component.image} alt={component.title} />
          <p>{component.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Search;
