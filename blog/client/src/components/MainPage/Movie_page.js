import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../styles/Drama_page.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Movie_page = () => {
    const [error, setError] = useState(null);
    const [postkd, setPostskd] = useState([]);

    useEffect(() => {
        fetchPostkd();
    }, []);
  const fetchPostkd = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/ch`);
        console.log('Response:', response.data); // Log the response data
        setPostskd(response.data);
        setError(null); // Reset error state if request is successful
    } catch (error) {
        console.error(`Error fetching cel posts:`, error);
        setError(`Error fetching cel posts. Please try again.`); // Set error message
    }
  };
const location = useLocation();
    const [selectedGenre, setSelectedGenre] = useState(null);

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            setSelectedGenre(hash.substring(1));
        } else {
            // Set a default genre if hash is empty
            setSelectedGenre("");
        }
    }, [location]);

    function toggleSection(sectionId) {
        const sections = document.querySelectorAll('.section-drama');
        sections.forEach(section => {
            section.style.display = 'none'; // Hide all sections by default
        });
    }
    postkd.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    // Update your JSX to wrap the image and title in a container
    <div className="Drama-main">
        <div className="Drama-title">
            <div className='Drama-header'>
                    <div className='Drama-header-inside'>
                                    <p style={{fontSize:"18px"}}>Movie  &gt; <span style={{fontSize:"20px"}}>Watch</span></p>

                                    <div className="dropdowns">
                                        <button className="dropbtnn">Genres: {selectedGenre ? selectedGenre : "All"}</button>

                                        <div className="dropdown-contentt">
                                        <a href="#" onClick={() => { toggleSection('') }} >
                                                <span>ALL</span>
                                        </a>
                                        <a href="#Action" onClick={() => { toggleSection('Action') }} >
                                                <span>Action</span>
                                        </a>
                                        <a href="#Adventure" onClick={() => { toggleSection('Adventure') }} >
                                                <span>Adventure</span>
                                        </a>
                                        <a href="#Comedy" onClick={() => { toggleSection('Comedy') }} >
                                                <span>Comedy</span>
                                        </a>
                                        <a href="#Drama" onClick={() => { toggleSection('Drama') }} >
                                                <span>Drama</span>
                                        </a>
                                        <a href="#Fantasy" onClick={() => { toggleSection('Fantasy') }} >
                                                <span>Fantasy</span>
                                        </a>
                                        <a href="#Historical" onClick={() => { toggleSection('Historical') }} >
                                                <span>Historical</span>
                                        </a>
                                        <a href="#Mystery" onClick={() => { toggleSection('Mystery') }} >
                                                <span>Mystery</span>
                                        </a>
                                        <a href="#Science" onClick={() => { toggleSection('Science') }} >
                                                <span>Science Fiction</span>
                                        </a>
                                        <a href="#Sport" onClick={() => { toggleSection('Sport') }} >
                                                <span>Sport</span>
                                        </a>
                                        <a href="#Supernatural" onClick={() => { toggleSection('Supernatural') }} >
                                                <span>Supernatural</span>
                                        </a>
                                        </div>
                                    </div>
                    </div>
            </div>
                    <div className='Drama-nav'>
                        
                        {postkd.map((post, index) => {
                            return (
                                // Only display posts matching the selected genre
                                (!selectedGenre || (post.genres && post.genres.some(genre => genre.toLowerCase() === selectedGenre.toLowerCase()))) && (
                                    <div key={index}>
                                        <a href={post.korean_url}>
                                            <div className="image-container">
                                                <img src={post.img} alt={post.title} 
                                                style={{width:'250px', height:"250px"}}
                                                />
                                                <p className="image-titles">{post.title}</p>
                                            </div>
                                        </a>
                                    </div>
                                )
                            );
                        })}
                    </div>
        </div>
    </div>

  );
};

export default Movie_page;

