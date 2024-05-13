import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../styles/Drama_page.css';

const Korean_page = () => {
    const [error, setError] = useState(null);
    const [postkd, setPostskd] = useState([]);

    useEffect(() => {
        fetchPostkd();
    }, []);
  const fetchPostkd = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/kd`);
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
                                    <p>Series & Movie Categories &gt; <span style={{fontSize:"20px"}}>Korean</span></p>

                                    <div className="dropdowns">
                                        <button className="dropbtnn">Genres: {selectedGenre ? selectedGenre : "All"}</button>

                                        <div className="dropdown-contentt">
                                        <a href="#" onClick={() => { toggleSection('') }} >
                                                <span>ALL</span>
                                        </a>
                                        <a href="#Romantic" onClick={() => { toggleSection('Romantic') }} >
                                                <span>Romantic</span>
                                        </a>
                                        <a href="#Costume" onClick={() => { toggleSection('Costume') }} >
                                                <span>Costume & Period</span>
                                        </a>
                                        <a href="#Costume" onClick={() => { toggleSection('Action') }} >
                                                <span>Action</span>
                                        </a>
                                        <a href="#Crime" onClick={() => { toggleSection('Crime') }} >
                                                <span>Crime & Mystery</span>
                                        </a>
                                        <a href="#Thriller" onClick={() => { toggleSection('Thriller') }} >
                                                <span>Thriller & Suspense</span>
                                        </a>
                                        <a href="#Animation" onClick={() => { toggleSection('Animation') }} >
                                                <span>Animation</span>
                                        </a>
                                        <a href="#Fantasy" onClick={() => { toggleSection('Fantasy') }} >
                                                <span>Fantasy</span>
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
                                                style={{width:'200px', height:"150px"}}
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

export default Korean_page;
