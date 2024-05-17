import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../styles/Drama_page.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const News_page = () => {
    const [error, setError] = useState(null);
    const [postkd, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/news`);
            console.log('Response:', response.data); // Log the response data
            setPosts(response.data);
            setError(null); // Reset error state if request is successful
        } catch (error) {
            console.error(`Error fetching new posts:`, error);
            setError(`Error fetching new posts. Please try again.`); // Set error message
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

  return (
    // Update your JSX to wrap the image and title in a container
    <div className="Drama-main">
        <div className="Drama-title">
            <div className='Drama-header'>
                    <div className='Drama-header-inside'>
                                    <p>News &gt; <span style={{fontSize:"20px"}}>News</span></p>

                                    <div className="dropdowns" >
                                        <button className="dropbtnn">Country: {selectedGenre ? selectedGenre : "All"}</button>

                                        <div className="dropdown-contentt" >
                                        <a href="#" onClick={() => { toggleSection('') }} >
                                                <span>All</span>
                                        </a>
                                        {/* <a href="#Korean" onClick={() => { toggleSection('Korean') }} >
                                                <span>Korean</span>
                                        </a>
                                        <a href="#China" onClick={() => { toggleSection('China') }} >
                                                <span>China</span>
                                        </a>
                                        <a href="#Japan" onClick={() => { toggleSection('Japan') }} >
                                                <span>Japan</span>
                                        </a>
                                        <a href="#Taiwan" onClick={() => { toggleSection('Taiwan') }} >
                                                <span>Taiwan</span>
                                        </a>
                                        <a href="#Thailand" onClick={() => { toggleSection('Thailand') }} >
                                                <span>Thailand</span>
                                        </a>
                                        <a href="#Other" onClick={() => { toggleSection('Other') }} >
                                                <span>Other</span>
                                        </a> */}
                                       
                                        </div>
                                    </div>
                    </div>
            </div>
                    <div className='Drama-nav'>
                        {postkd.slice().reverse().map((post, index) => {
                            return (
                                // Only display posts matching the selected genre
                                (!selectedGenre || (post.genres && post.genres.some(genre => genre.toLowerCase() === selectedGenre.toLowerCase()))) && (
                                    <div key={index}>
                                        <a href={post.url_page}>
                                            <div className="image-container">
                                                <img src={post.imageUrlnews} alt={post.title} 
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

export default News_page;

