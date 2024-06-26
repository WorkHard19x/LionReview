
                import React, { useState, useEffect } from 'react';
                import Editable from '../Editable';
                import '../../styles/Celebrities-form.css';
                import axios from 'axios';
                import { useParams } from 'react-router-dom';

                import '@fortawesome/fontawesome-free/css/all.css';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

                function Test_1() {
                    const { pageId } = useParams(); // Get the pageId from the route parameter

                    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
                    const [birthdated, setBirthdate] = useState('2024-05-03'); // Set initial birthdate
                
                    const toggleDropdown = () => {
                        setIsDropdownOpen(!isDropdownOpen);
                    };
                    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];
                    const shareUrl = '/Test_1';

                    const handleShareOptionClick = async (option) => {
                        try {
                            switch (option) {
                                case 'Copy Link':
                                    await navigator.clipboard.writeText(shareUrl);
                                    console.log('Link copied to clipboard:', shareUrl);
                                    // Optionally show a notification or update UI to indicate success
                                    break;
                                case 'Facebook':
                                    shareOnFacebook();
                                    break;
                                case 'Twitter':
                                    // Implement share on Twitter functionality
                                    break;
                                default:
                                    break;
                            }
                        } catch (error) {
                            console.error('Failed to copy or share:', error);
                            // Optionally show a notification or update UI to indicate failure
                        }
                    };
                
                    const shareOnFacebook = () => {
                        // Implement sharing on Facebook using Facebook SDK
                        // Ensure the Facebook SDK is loaded before using FB object
                        window.FB.ui({
                            method: 'share',
                            href: 'https://example.com', // Replace with your URL
                        }, function(response){});
                    };



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

                        // const imagesshows = [
                        //     { url: "", title: "", img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" }

                        // ];
                        
                        // const imagesnews = [
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" },
                        //     { url: "", title: "", img: "" }

                        // ];

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


                        const [name, setName] = useState(localStorage.getItem(window.location.href + '-name') || 'Test_1');

                        useEffect(() => {
                            localStorage.setItem(window.location.href + '-name', name);
                        }, [name]); // Run this effect whenever the name changes

                        const handleNameChange = (newName) => {
                            setName(newName);
                        };


                        const userName = 'Test_1-shows'; // Define the userName variable
                        const userNamenews = 'Test_1-news'; // Define the userName variable
                        const saveImageDataToMongoDB = async (imageData, userName,userNamenews, imagesnews) => {
                            try {
                                const response = await fetch('http://localhost:5000/api/saveImageData', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ imageData, userName},{userNamenews,imagesnews}), // Include imageImagesNews in the request body

                                });
                                const data = await response.json();
                                if (data.success) {
                                    console.log('Image data saved to MongoDB successfully');
                                } else {
                                    console.error('Error saving image data:', data.error);
                                }
                            } catch (error) {
                                console.error('Error saving image data:', error);
                            }
                        };
                        const [imagesnews, setimagesnews] = useState(() => {
                            const storedimagesnews = localStorage.getItem('imagesnews');
                            return storedimagesnews ? JSON.parse(storedimagesnews) : [
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" }
                                ];
                        });
                        useEffect(() => {
                            localStorage.setItem('imageData', JSON.stringify(imagesnews));
                        }, [imagesnews]);
                        
                        const handleImageDataChanged = (index, field, value) => {
                            const updatedImageData = [...imagesnews];
                            updatedImageData[index][field] = value;
                            setimagesnews(updatedImageData);
                        };

                        const handleAddImaged = () => {
                            const userNamenews = 'Test_1';

                            setimagesnews([{ url: "", title: "", img: "", userNamenews }, ...imagesnews]);
                            setInputVisible(true);
                        };
                    
                        const handleDeleteImaged = (index) => {
                            const updatedImageData = imagesnews.filter((_, i) => i !== index);
                            setimagesnews(updatedImageData);
                        };

                        const [imageData, setImageData] = useState(() => {
                            const storedImageData = localStorage.getItem('imageData');
                            return storedImageData ? JSON.parse(storedImageData) : [
                                { url: "", title: "", img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" },
                                { url: "", title: "", img: "" }
                                ];
                        });
                        useEffect(() => {
                            localStorage.setItem('imageData', JSON.stringify(imageData));
                        }, [imageData]);
                        
                        const handleImageDataChange = (index, field, value) => {
                            const updatedImageData = [...imageData];
                            updatedImageData[index][field] = value;
                            setImageData(updatedImageData);
                        };

                        const handleAddImage = () => {
                            const userName = 'Test_1';

                            setImageData([{ url: "", title: "", img: "", userName }, ...imageData]);
                            setInputVisible(true);

                        };
                    
                        const handleDeleteImage = (index) => {
                            const updatedImageData = imageData.filter((_, i) => i !== index);
                            setImageData(updatedImageData);
                        };

                        // Define state variable for admin status
                       
                        
                            const [user, setUser] = useState({
                            name: '', // Initialize name as empty string
                            email: '',
                            is_admin: false,

                            // Add more fields as needed
                          });

                          // Define fetchUserData function
                          const fetchUserData = async () => {
                            try {
                              const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');

                            const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');

                            if (!loggedInUserEmail || !sessionToken) {
                              setUser(null);
                              console.log('User not logged in. Clearing user state.');
                              return;
                            }


                              const response = await fetch(`${API_BASE_URL}/login?email=${loggedInUserEmail}`, {
                                method: 'GET',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${sessionToken}`
                                },
                              });

                              if (response.ok) {
                                const userDataArray = await response.json();
                                const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                                if (loggedInUser) {
                                  setUser(loggedInUser);
                                  console.log('User data:', loggedInUser);
                                } else {
                                  console.error('Logged-in user not found in response');
                                  setUser(null); // Reset user state if user not found
                                }
                              } else {
                                console.error('Failed to fetch user data');
                                setUser(null); // Reset user state if fetch failed
                              }
                            } catch (error) {
                              console.error('Error occurred while fetching user data:', error);
                              setUser(null);
                            }
                          };


                          useEffect(() => {
                            fetchUserData();
                          }, []);


                        const [isInputVisible, setInputVisible] = useState(false);

                        const handleEnter = (e) => {
                            if (e.key === 'Enter' || e.target.id === 'saveButton') {
                                setInputVisible(false);
                            }
                        };

                    return (
                        <div className="profile-container-header">
                            <div className="profile-container">
                                <div className="profile-border">
                                    <div className="profile-content">
                                        <div className="profile-info">
                                            {user && user.is_admin ? (
                                            <p><Editable initialValue={name} onSave={handleNameChange} /></p>
                                            ) : (
                                            <p>{name}</p>
                                            )}
                                            <p>leo</p>
                                            <p>Vietnam</p>
                                            <p>{birthdated} (age {age})</p>

                                            <button onClick={handleFollow} className="follow">
                                                {isFollowing ? (
                                                <span style={{ marginRight: '6px' }}>
                                                    <i className="fa-solid fa-heart" style={{ color: 'red' }}></i> Following
                                                </span>
                                            ) : (
                                                <span>
                                                    <i className="fa-regular fa-heart"></i> Follow
                                                </span>
                                             )}({followerCount})
                                            </button>
                                            <button className="share-button" onClick={toggleDropdown}>
                                                <i className="fa-solid fa-share-nodes"></i> Share {'▼'}
                                                {isDropdownOpen && (
                                                    <div className="dropdown">
                                                        {shareOptions.map((option, index) => (
                                                            <div key={index} className="dropdown-option" onClick={() => handleShareOptionClick(option)}>
                                                                {option}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                        <div className="profile-image">
                                            <div className="profile-img">
                                            <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Test_1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         <div className='tittle'>
                            <a href="#shows" onClick={() => toggleSection('shows')}><span>Shows</span></a>
                            <a href="#about" onClick={() => toggleSection('about')}><span>About</span></a>
                            <a href="#discussion" onClick={() => toggleSection('discussion')}><span>News</span></a>
                        </div>
                        <div className="section" id="shows">
                            <div className="shows">
                                <div className="shows-container">
                                    <p> <span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>{'▶'}</span>Shows </p>
                                    <span>A list of all movies, series and dramas starring Yoon Shi Yoon, all in one place.</span>
                                </div>
                                {user && user.is_admin && (
                                    <>
                                        <button onClick={handleAddImage}>Add Image</button>
                                        <button id="saveButton" onClick={(e) => { handleEnter(e); saveImageDataToMongoDB(imageData, userName); }}>Save</button>
                                    </>
                                )}
                            <div className="news">
                                    {imageData.map((info, index) => (
                                        <div key={index} className="image-container">
                                            <a href={info.url} target="_blank" rel="noopener noreferrer">
                                            <img src={info.img} alt={`Image ${index}`} />
                                            </a>
                                            {user && user.is_admin ? (
                                                // Admin view
                                                (isInputVisible && (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={info.title}
                                                        onKeyDown={handleEnter}
                                                        onChange={(e) => handleImageDataChange(index, 'title', e.target.value)}
                                                        placeholder="Enter new title"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={info.url}
                                                        onKeyDown={handleEnter}
                                                        onChange={(e) => handleImageDataChange(index, 'url', e.target.value)}
                                                        placeholder="Enter new URL"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={info.img}
                                                        onKeyDown={handleEnter}
                                                        onChange={(e) => handleImageDataChange(index, 'img', e.target.value)}
                                                        placeholder="Enter new image URL"
                                                    />
                                                    <button onClick={() => handleDeleteImage(index)}>Delete</button>
                                                </div>
                                            ))) : (
                                                // User view
                                                <div>
                                                    <p className="image-title">{info.title}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="section" id="about" style={{display: 'none'}}>
                            <div className="shows">
                                <div className="shows-container">
                                    <p> <span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>
                                        {'▶'}</span>About </p>
                                    <span>
                                    
                                    </span>
                    
                                    <div className='more-detail'>
                                        <div className="detail">
                                            <p><span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>{'▶'}</span> More Details:</p>
                                            <span><i className="fa-regular fa-star" style={{color:'white'}}></i> Zodiac: </span>
                                            <br /><span><i className="fa-solid fa-up-long" style={{color:'white'}}></i> Tall: </span>
                                            <br /><span><i className="fa-brands fa-font-awesome" style={{color:'white'}}></i> Nationality: </span>
                                            <br /><a href="" ><span><i className="fa-brands fa-instagram" style={{color:'white'}}></i> 's instagram</span></a>
                                            <br /><a href="" 
                                            target="_blank" ><span><i className="fa-brands fa-youtube" style={{color:'white'}}></i> 's youtube</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section" id="discussion" style={{display: 'none'}}>
                            <div className="shows">
                                <div className="shows-container">
                                    <p> <span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>{'▶'}</span>News </p>
                                </div>
                                {user && user.is_admin && (
                                    <>
                                        <button onClick={handleAddImaged}>Add Image</button>
                                        <button id="saveButton" onClick={(e) => { handleEnter(e); saveImageDataToMongoDB(imagesnews, userNamenews); }}>Save</button>
                                    </>
                                )}

                                <div className="news">
                                    {imagesnews.map((infos, indexs) => (
                                        <div key={indexs} className="image-container">
                                            <a href={infos.url} target="_blank" rel="noopener noreferrer">
                                            <img src={infos.img} alt={`Image ${indexs}`} />
                                            </a>
                                            {user && user.is_admin ? (
                                                // Admin view
                                                (isInputVisible && (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={infos.title}
                                                        onKeyDown={handleEnter}
                                                        onChange={(e) => handleImageDataChanged(indexs, 'title', e.target.value)}
                                                        placeholder="Enter new title"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={infos.url}
                                                        onKeyDown={handleEnter}
                                                        onChange={(e) => handleImageDataChanged(indexs, 'url', e.target.value)}
                                                        placeholder="Enter new URL"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={infos.img}
                                                        onKeyDown={handleEnter}
                                                        onChange={(e) => handleImageDataChanged(indexs, 'img', e.target.value)}
                                                        placeholder="Enter new image URL"
                                                    />
                                                    <button onClick={() => handleDeleteImaged(indexs)}>Delete</button>
                                                </div>
                                            ))) : (
                                                // User view
                                                <div>
                                                    <p className="image-title">{infos.title}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>



                    </div>
                );
            };
                
            export default Test_1;
            