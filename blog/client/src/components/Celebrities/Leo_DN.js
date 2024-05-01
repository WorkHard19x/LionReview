
                import React, { useState, useEffect } from 'react';
                import Editable from '../Editable';
                import '../../styles/Celebrities-form.css';
                import axios from 'axios';

                import '@fortawesome/fontawesome-free/css/all.css';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

                function Leo_DN() {
                    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
                    const [birthdated, setBirthdate] = useState('2024-03-26'); // Set initial birthdate
                
                    const toggleDropdown = () => {
                        setIsDropdownOpen(!isDropdownOpen);
                    };
                    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];
                    const shareUrl = '/Leo_DN';

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
                        //     { url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", title: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
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
                        //     { url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", title: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
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
                        }, []);
                    
                        const fetchFollowerCount = async () => {
                            try {
                                const response = await axios.get(`${API_BASE_URL}/api/follower-count`);
                                setFollowerCount(response.data.followerCount);
                                setIsFollowing(response.data.isFollowing);
                            }catch (error) {
                                console.error('Error fetching follower count:', error);
                            }
                        };
                    
                        const handleFollow = async () => {
                            try {
                                const ipAddress = '127.0.0.1';
                                const response = await axios.post(`${API_BASE_URL}/api/follow`, { ipAddress });
                                setIsFollowing(response.data.isFollowing);
                                setFollowerCount(response.data.followerCount);
                            } catch (error) {
                                console.error('Error following:', error);
                            }
                        };


                        const [name, setName] = useState(localStorage.getItem(window.location.href + '-name') || 'Leo_DN');

                        useEffect(() => {
                            localStorage.setItem(window.location.href + '-name', name);
                        }, [name]); // Run this effect whenever the name changes

                        const handleNameChange = (newName) => {
                            setName(newName);
                        };


                        const userName = 'Leo_DN-shows'; // Define the userName variable
                        const userNamenews = 'Leo_DN-news'; // Define the userName variable
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
                                { url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", title: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
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
                            const userNamenews = 'Leo_DN';

                            setimagesnews([{ url: "", title: "", img: "", userNamenews }, ...imagesnews]);
                        };
                    
                        const handleDeleteImaged = (index) => {
                            const updatedImageData = imagesnews.filter((_, i) => i !== index);
                            setimagesnews(updatedImageData);
                        };

                        const [imageData, setImageData] = useState(() => {
                            const storedImageData = localStorage.getItem('imageData');
                            return storedImageData ? JSON.parse(storedImageData) : [
                                { url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", title: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" },
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
                            const userName = 'Leo_DN';

                            setImageData([{ url: "", title: "", img: "", userName }, ...imageData]);
                        };
                    
                        const handleDeleteImage = (index) => {
                            const updatedImageData = imageData.filter((_, i) => i !== index);
                            setImageData(updatedImageData);
                        };

                        // Define state variable for admin status
                        const [isAdmin, setIsAdmin] = useState(false);
                    
                        // Effect to check if user is admin
                        useEffect(() => {
                            // Logic to check if user is admin
                            // For example, you might check if the user is logged in and has admin privileges
                            const userIsAdmin = checkIfUserIsAdmin(); // You need to implement this function
                            setIsAdmin(userIsAdmin);
                        }, []);
                    
                        // Effect to save the name to localStorage whenever it changes
                        

                        // Function to check if user is admin (you need to implement this)
                        const checkIfUserIsAdmin = () => {
                            // Logic to determine if user is admin
                            // For example, you might check if the user is logged in and has admin privileges
                            // Return true if user is admin, false otherwise
                            const isLoggedIn = true; // Example: You would replace this with your actual authentication logic
                            const isAdmin = true; // Example: You would replace this with your actual admin check logic
                            return isLoggedIn && isAdmin;
                        };



                    return (
                        <div className="profile-container-header">
                            <div className="profile-container">
                                <div className="profile-border">
                                    <div className="profile-content">
                                        <div className="profile-info">
                                             {isAdmin && <h1><Editable initialValue={name} onSave={handleNameChange} /></h1>}
                                            <p>leo</p>
                                            <p>Vietnam</p>
                                            <p>{birthdated} (age {age})</p>

                                            <p>{isFollowing ? `Followers: ${followerCount}` : 'Follow'}</p>
                                            <button onClick={handleFollow} className="follow">
                                                {isFollowing ? 
                                                <span>
                                                <i className="fa-solid fa-heart"></i> Following
                                                </span> 
                                                : 
                                                <span>
                                                    <i className="fa-regular fa-heart"></i> Follow
                                                </span>
                                                }
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
                                            <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Leo_DN" />
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
                                {isAdmin && (
                                    <>
                                        <button onClick={handleAddImage}>Add Image</button>
                                        <button onClick={() => saveImageDataToMongoDB(imageData, userName)}>Save to MongoDB</button>
                                    </>
                                )}
                            <div className="news">
                                    {imageData.map((info, index) => (
                                        <div key={index} className="image-container">
                                            <img src={info.img} alt={`Image ${index}`} />
                                            {isAdmin ? (
                                                // Admin view
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={info.title}
                                                        onChange={(e) => handleImageDataChange(index, 'title', e.target.value)}
                                                        placeholder="Enter new title"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={info.url}
                                                        onChange={(e) => handleImageDataChange(index, 'url', e.target.value)}
                                                        placeholder="Enter new URL"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={info.img}
                                                        onChange={(e) => handleImageDataChange(index, 'img', e.target.value)}
                                                        placeholder="Enter new image URL"
                                                    />
                                                    <button onClick={() => handleDeleteImage(index)}>Delete</button>
                                                </div>
                                            ) : (
                                                // User view
                                                <div>
                                                    <p className="image-title">{info.title}</p>
                                                    <p>{info.url}</p>
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
                                    Yoon Shi Yoon, born in Suncheon as Yoon Dong Gu, is a South Korean actor and television personality managed by MOA Entertainment. Yoon debuted in the daily sitcom "High Kick Through the Roof". He was nominated for Best New Actor in TV at the Baeksang Arts Awards and won MBC's Best Couple award with his co-star Shin Se Kyung. The following year, Yoon was cast as the main character in the slice-of-life television series "King of Baking, Kim Takgu". The series was one of the most watched shows in South Korea in 2010 with a final episode viewership rating of 50.8%, and Yoon became a household name in Korea. Due to the drama's popularity, Yoon and co-star Lee Young Ah were named promotional ambassadors for North Chungcheong Province. In 2013, he starred in the cable series "My Cute Guys", the third installment of tvN 's "flower boy" series. The series was the highest sold cable drama ever to Japan. Yoon appeared in a commercial for the cellphone Bubi Bubi with the famous girl group T-ara. He also sang 4 singles for the soundtrack of the commercial. On April 28, 2014, Yoon secretly enlisted into the Republic of Korea Marine Corps and was discharged on January 27, 2016.

                                    </span>
                    
                                    <div className='more-detail'>
                                        <div className="detail">
                                            <p><span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>{'▶'}</span> More Details:</p>
                                            <span><i className="fa-regular fa-star" style={{color:'white'}}></i> Zodiac: Libra</span>
                                            <br /><span><i className="fa-solid fa-up-long" style={{color:'white'}}></i> Tall: 178cm</span>
                                            <br /><span><i className="fa-brands fa-font-awesome" style={{color:'white'}}></i> Nationality: South Korean</span>
                                            <br /><a href="https://www.instagram.com/moa_ent/?hl=ko" ><span><i className="fa-brands fa-instagram" style={{color:'white'}}></i> Leo Doan's instagram</span></a>
                                            <br /><a href="https://www.youtube.com/" 
                                            target="_blank" ><span><i className="fa-brands fa-youtube" style={{color:'white'}}></i> Leo Doan's youtube</span></a>
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
                                {isAdmin && (
                                    <>
                                        <button onClick={handleAddImaged}>Add Image</button>
                                        <button onClick={() => saveImageDataToMongoDB(imagesnews, userNamenews)}>Save to MongoDB</button>
                                    </>
                                )}

                                <div className="news">
                                    {imagesnews.map((infos, indexs) => (
                                        <div key={indexs} className="image-container">
                                            <img src={infos.img} alt={`Image ${indexs}`} />
                                            {isAdmin ? (
                                                // Admin view
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={infos.title}
                                                        onChange={(e) => handleImageDataChanged(indexs, 'title', e.target.value)}
                                                        placeholder="Enter new title"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={infos.url}
                                                        onChange={(e) => handleImageDataChanged(indexs, 'url', e.target.value)}
                                                        placeholder="Enter new URL"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={infos.img}
                                                        onChange={(e) => handleImageDataChanged(indexs, 'img', e.target.value)}
                                                        placeholder="Enter new image URL"
                                                    />
                                                    <button onClick={() => handleDeleteImaged(indexs)}>Delete</button>
                                                </div>
                                            ) : (
                                                // User view
                                                <div>
                                                    <p className="image-title">{infos.title}</p>
                                                    <p>{infos.url}</p>
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
                
            export default Leo_DN;
            