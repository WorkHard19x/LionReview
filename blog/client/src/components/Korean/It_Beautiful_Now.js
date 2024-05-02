import React, { useState, useEffect } from 'react';
import '../../styles/Drama.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Editable from '../Editable';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function It_Beautiful_Now() {
    const { pageId } = useParams(); // Get the pageId from the route parameter

    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    useEffect(() => {
        fetchFollowerCount();
    }, [pageId]);

    const fetchFollowerCount = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/follower-count/${pageId}`);
            const { followerCount, isFollowing } = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        } catch (error) {
            console.error('Error fetching follower count:', error);
        }
    };

    const handleFollow = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/follow/${pageId}`);
            const { followerCount, isFollowing } = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        } catch (error) {
            console.error('Error following:', error);
        }
    };
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [birthdated, setBirthdate] = useState('1986-09-26'); // Set initial birthdate



    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];
      function toggleSection(sectionId) {
    const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }
    const [age, setAge] = useState(calculateAge());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setAge(calculateAge());
        }, 60000); // Update every minute (adjust as needed)

        return () => clearInterval(intervalId); // Clean up interval on unmount
    }, []);

    useEffect(() => {
        // Update age whenever birthdate changes
        setAge(calculateAge());
    }, [birthdated]);

    function calculateAge() {
        const today = new Date();
        const birthYear = parseInt(birthdated.slice(0, 4)); // Extract year from birthdate
        const birthDate = new Date(birthYear, 7, 18); // Assuming month and day are fixed
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }



        // Define state variable for admin status



        const [showAd, setShowAd] = useState(true); // Initially show the ad
        const [adClicked, setAdClicked] = useState(false);
        const handleStartVideoClick = () => {
            // Open the ad in a new tab
            window.open("https://example.com", "_blank");
            // Hide the ad
            setShowAd(false);
            setAdClicked(true);
            // Set timeout to show the ad again after 5 minutes
            setTimeout(() => {
                setShowAd(true);
                setAdClicked(false);
            }, 300000); // 5 minutes in milliseconds
        };



       
        
        const [icons, setIcons] = useState(() => {
            const storedIcons = localStorage.getItem('icons');
            return storedIcons ? JSON.parse(storedIcons) : [];
          });
        
          const [isInputVisible, setInputVisible] = useState(false);
          const [isAdmin, setIsAdmin] = useState(false);
          const [currentUrlIndex, setCurrentUrlIndex] = useState(null);
        
          useEffect(() => {
            const userIsAdmin = checkIfUserIsAdmin();
            setIsAdmin(userIsAdmin);
          }, []);
        
          const checkIfUserIsAdmin = () => {
            // Example: Replace this logic with your actual admin check logic
            // For simplicity, returning true always in this example
            return true; // Return true if user is admin, false otherwise
          };
        
          const handleAddIcon = () => {
            const newIcon = { url: "" };
            setIcons([...icons, newIcon]);
            setInputVisible(true);
          };
        
          const handleDeleteIcon = (index) => {
            const newIcons = [...icons];
            newIcons.splice(index, 1);
            setIcons(newIcons);
          };
        
          const handleUrlChange = (index, value) => {
            const newIcons = [...icons];
            newIcons[index].url = value;
            setIcons(newIcons);
          };
        
          const handleSave = () => {
            saveToMongoDB(icons);
            localStorage.setItem('icons', JSON.stringify(icons));
            setInputVisible(false);
          };
        
          const handleEnter = (e) => {
            if (e.key === 'Enter' || e.target.id === 'saveButton') {
              setInputVisible(false);
            }
          };
          const userName = 'Leo_DN-shows';

        const saveToMongoDB = async (icons, userName) => {
            try {
                const response = await fetch('http://localhost:5000/api/korenaMovie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ icons,userName  }),

                });
                const data = await response.json();
                if (data.success) {
                    console.log('Image data saved to MongoDB successfully');
                    setInputVisible(false); // Hide input after successful save

                } else {
                    console.error('Error saving image data:', data.error);
                }
            } catch (error) {
                console.error('Error saving image data:', error);
            }
        };




        // Function to handle clicking on an icon
        const handleIconClick = (index) => {
            setCurrentUrlIndex(index);
        };







  return (
    <div className="profile-container-headerd">
    <div className="profile-containerd">
        <div className="profile-borderd">
            <div className="video-left">
                <div className="vide-left-ads">
                <div>
                             <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                </div>
                </div>
            </div>


            <div className="video">

                    {showAd && !adClicked && (
                        <button className="ad-overlay" onClick={handleStartVideoClick}>
                        <i className="fas fa-caret-square-right"></i>
                        </button>
                    )}
                     {currentUrlIndex !== null && (
                        <iframe width="100%" height="100%" src={icons[currentUrlIndex].url} frameBorder="0" scrolling="0" allowFullScreen=""></iframe>
                    )}
                    
                </div> 

{/* <div className="video">
        {currentUrlIndex !== null && (
          <iframe width="100%" height="100%" src={icons[currentUrlIndex].url} frameBorder="0" scrolling="0" allowFullScreen=""></iframe>
        )}
      </div> */}


            <div className="video-right">
                <div className="vide-right-ads">
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                    </div>
            </div>


        </div>
    </div>
 <div className='tittled'>
    <a href="#shows" onClick={() => toggleSection('shows')}><span>Episode</span></a>
    <a href="#cast" onClick={() => toggleSection('Cast')}><span>Cast</span></a>
    <span>
        <button onClick={handleFollow} className="followd">
            {isFollowing ? 
            <span style={{marginRight:'6px'}}>
            <i className="fa-solid fa-heart" style={{color:'red', marginLeft:'-1rem'}}></i> Love
            </span> 
            : 
            <span>
                <i className="fa-regular fa-heart" ></i> Like
            </span>
            }
            {isFollowing ? <span style={{margin: '-5px 0px', marginRight:'5px'}}>{followerCount}</span> : null}
        </button>
    </span>
   


</div>
<div className="section" id="shows">
    <div className="episode-video">
        <div className="nav-epdisode">
                    {/* {isAdmin && (
                        <>
                            <button onClick={handleAddkoreanurl}>Add Image</button>
                            <button onClick={() => saveToMongoDB(koreanurl, korean)}>Save to MongoDB</button>
                        </>
                    )} */}
                <div className="icon-container">
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {icons.map((icon, index) => (
                                <div key={index} style={{ margin: '4px' }}>
                                    {isInputVisible && (
                                    <input
                                        type="text"
                                        value={icon.url}
                                        onChange={(e) => handleUrlChange(index, e.target.value)}
                                        onKeyDown={handleEnter}
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                    )}
                                    {/* Updated to use handleIconClick instead of navigating */}
                                    <div className="icon" style={{ cursor: 'pointer' }} onClick={() => handleIconClick(index)}>{index + 1}</div>
                                    {isAdmin && (
                                    <button onClick={() => handleDeleteIcon(index)}>Delete</button>
                                    )}
                                </div>
                                ))}
                                <div style={{ margin: '5px' }}>
                                {isAdmin && (
                                    <>
                                    <button onClick={handleAddIcon}>Add Icon</button>
                                    <button id="saveButton"  onClick={() => saveToMongoDB(icons, userName)}>Save</button>
                                    </>
                                )}
                                </div>
                            </div>
               
               
               
               
                </div>

















            {/* <div class="icon-container">
            {koreanurl.map((info, index) => (
                    <div key={index} className="icon">
                        <img src={info.img} alt={`Image ${index}`} />
                        {isAdmin ? (
                            // Admin view
                            <div>
                                <input
                                    type="text"
                                    value={info.url}
                                    onChange={(e) => handlekoreanurlDataChanged(index, 'url', e.target.value)}
                                    placeholder="Enter new URL"
                                />
                                <button onClick={() => handleDeletekoreanurl(index)}>Delete</button>
                            </div>
                        ) : (
                            // User view
                            <div>
                                <p className="icon">{info.title}</p>
                                <p>{info.url}</p>
                            </div>
                        )}
                    </div>
                ))}


                <a href=""><div class="icon">1</div></a>
                <a href=""><div class="icon">2</div></a>
                <a href=""><div class="icon">3</div></a>
        
            </div> */}


            
        </div>

    </div>
    </div>

    </div>

);
};
export default It_Beautiful_Now
                  