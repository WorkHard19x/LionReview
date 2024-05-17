import axios from 'axios';
import React, { useState, useRef } from 'react';
import BoldToggle from './BoldToggle';
import '../styles/PostCreationForm.css';
import { useParams } from 'react-router-dom';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


function PostNewForm({ updatePosts  }) {
    const { pageId } = useParams(); // Get the pageId from the route parameter

    const summaryTextareaRef = useRef(null);
    const fulldetailTextareaRef = useRef(null);
    const [formData, setFormData] = useState({
        title:'',
        author: '',
        date: '',
        imageUrlnews: '',
        imageUrltitle:'',
        summarytext:'',
        fulldetail:'',
        provide:'',
        title_url:'',
        pageId: pageId,
        url_page: '',
        genres: [], // Change to array for multiple genres

    });
  
    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        if (name === 'title_url') {
            const urlPage = `http://localhost:3000/News/${value}/1`;
            setFormData(prevState => ({ ...prevState, url_page: urlPage }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            console.log('Form data:', formData); // Log the form data to check its content
    
            const response = await axios.post(`${API_BASE_URL}/api/news`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Response:', response.data); // Log the response data for debugging
    
            // Reset the form data after successful submission
            setFormData({
                title: '',
                author: '',
                date: '',
                imageUrlnews: '',
                imageUrltitle: '',
                summarytext: '',
                fulldetail: '',
                provide: '',
                title_url: '',
                pageId: pageId,
                url_page: '', // Reset url_page
                genres: [], // Change to array for multiple genres


            });

            const responsed = await axios.post(`${API_BASE_URL}/news-jsx`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Form data submitted successfully');
            // Add import statement to App.js
            const jsFileName = responsed.data.jsFileName;
            updateAppJs(jsFileName);
            updatePosts({
                title: response.data.title,
                imageUrlnews: response.data.imageUrlnews,
                title_url: response.data.title_url,

            });

            alert('Form data submitted successfully');
    
            // Fetch the updated news after submission
            fetchNews();
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

const fetchNews = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/news`);
        // Process the fetched news data as needed
    } catch (error) {
        console.error('Error fetching news:', error);
        // Handle error if necessary
    }
};


const updateAppJs = (jsFileName) => {
    axios.post(`${API_BASE_URL}/update-app-js`, { jsFileName }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.data);
        // Reload the page to apply the changes (You can use other approaches like state management or props passing to update the component)
        window.location.reload();
    })
    .catch(error => {
        console.log('Error updating App.js:', error);
    });
};

const [selectedOption, setSelectedOption] = useState(null);

const handleGenreChange = (genre) => {
    // Toggle genre selection
    const updatedGenres = formData.genres.includes(genre)
        ? formData.genres.filter((g) => g !== genre)
        : [...formData.genres, genre];

    setFormData({ ...formData, genres: updatedGenres });
};

  return (
      <div className='Header'>
            <div className='border-all'>
            
            <form onSubmit={handleSubmit}>


            <h2>Create News Form</h2>
            <div className="genre-selection">
                    <div className="checkbox-container">
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Korean')} onChange={() => handleGenreChange('Korean')} />
                            Korean
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('China')} onChange={() => handleGenreChange('China')} />
                            China
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Japan')} onChange={() => handleGenreChange('Japan')} />
                            Japan
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Taiwan')} onChange={() => handleGenreChange('Taiwan')} />
                            Taiwan
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Thailand')} onChange={() => handleGenreChange('Thailand')} />
                            Thailand
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Other')} onChange={() => handleGenreChange('Other')} />
                            Other
                        </label>
                        {/* Add more genres as needed */}
                    </div>
                </div>
                <div className="input-container">
                        <label>Title_url:</label>
                        <input type="text" name="title_url" value={formData.title_url.replace(/\b\w/g, (char) => char.toUpperCase()).replace(/\s+/g, '_') } onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>
                {/* <div className="input-container">
                    <label>Url Page:</label>
                    <input type="text" name="url_page" 
                        value={formData.url_page}
                        onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div> */}
                <div className="input-container">
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className="input-container">
                    <label>Author:</label>
                    <input type="text" name="author" value={formData.author} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className="input-container">
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className="input-container">
                    <label>Image URL:</label>
                    <input type="text" name="imageUrlnews" value={formData.imageUrlnews} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className="input-container">
                    <label>Image Title:</label>
                    <input type="text" name="imageUrltitle" value={formData.imageUrltitle} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className="Describle">
                <label>Summary:</label>
                <textarea
                    ref={summaryTextareaRef}
                    name="summarytext"
                    value={formData.summarytext}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <span>
                    <BoldToggle type="b" textareaRef={summaryTextareaRef} />
                    <BoldToggle type="i" textareaRef={summaryTextareaRef} />
                    <BoldToggle type="p" textareaRef={summaryTextareaRef} />
                    <BoldToggle type="color" textareaRef={summaryTextareaRef} />
                    <BoldToggle type="link" textareaRef={summaryTextareaRef} />
                    <BoldToggle type="img" textareaRef={summaryTextareaRef} />
                </span>
            </div>

            <div className="Describle">
                <label>Fulldetail:</label>
                <textarea
                    ref={fulldetailTextareaRef}
                    name="fulldetail"
                    value={formData.fulldetail}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <span>
                    <BoldToggle type="b" textareaRef={fulldetailTextareaRef} />
                    <BoldToggle type="i" textareaRef={fulldetailTextareaRef} />
                    <BoldToggle type="p" textareaRef={fulldetailTextareaRef} />
                    <BoldToggle type="color" textareaRef={fulldetailTextareaRef} />
                    <BoldToggle type="link" textareaRef={fulldetailTextareaRef} />
                    <BoldToggle type="img" textareaRef={fulldetailTextareaRef} />
                </span>
            </div>

                <div className="input-container">
                    <label>Provided:</label>
                    <input type="text" name="provide" value={formData.provide} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>
                <div className="buttons">
                    <button type="submit" className="submit-button">Submit</button>
                </div >
                </form>

            </div>
    </div>
  )
}

export default PostNewForm
