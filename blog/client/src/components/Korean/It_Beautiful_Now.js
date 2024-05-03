import React, { useState, useEffect } from 'react';
import '../../styles/Drama.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Editable from '../Editable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


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


    //   function toggleSection(sectionId) {
    // const sections = document.querySelectorAll('.section');
    //     sections.forEach(section => {
    //         if (section.id === sectionId) {
    //             section.style.display = 'block';
    //         } else {
    //             section.style.display = 'none';
    //         }
    //     });
    // }


    








    
    const today = new Date();
    const uploadDate = new Date('2024-04-02'); // '2024-04-02' represents April 2, 2024
    
    const timeDifference = Math.abs(today.getTime() - uploadDate.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));


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



       
        

        
        const [isInputVisible, setInputVisible] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);
        const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // Initialize with default index
        
        useEffect(() => {
            const userIsAdmin = checkIfUserIsAdmin();
            setIsAdmin(userIsAdmin);
        }, []);
        
        const checkIfUserIsAdmin = () => {
            // Example: Replace this logic with your actual admin check logic
            // For simplicity, returning true always in this example
            return true; // Return true if user is admin, false otherwise
        };

        const [icons, setIcons] = useState(() => {
            const storedIcons = localStorage.getItem('icons');
            return storedIcons ? JSON.parse(storedIcons) : [
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
                { url: "",},{ url: "",},{ url: "",},
            ];
        });
        const location = useLocation();
        useEffect(() => {
            const hash = location.hash;
            if (hash) {
                toggleSection(hash.substring(1));
            } else {
                toggleSection('shows');
            }
        }, [location]);
    
        useEffect(() => {
            localStorage.setItem('icons', JSON.stringify(icons));
        }, [icons]);
    
        function toggleSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.style.display = section.id === sectionId ? 'block' : 'none';
            });
        }


    

            const handleAddIcon = () => {
                const newIcon = { url: '' };
                setIcons([...icons, newIcon]);
                setInputVisible(true);
            };

            const handleDeleteIcon = (index) => {
                const newIcons = [...icons];
                newIcons.splice(index, 1);
                setIcons(newIcons);
            };
        
        const handleUrlChange = (index, value) => {
            const newIcons = [...icons]; // Create a copy of the icons array
            newIcons[index].url = value; // Update the specific icon's URL
            setIcons(newIcons); // Update the state with the modified icons array
        };
        

        
        const handleEnter = (e) => {
            if (e.key === 'Enter' || e.target.id === 'saveButton') {
                setInputVisible(false);
            }
        };
        

        const saveToMongoDB = async (icons, userName, userName2, imagesnews) => {
            try {
                // Your fetch request to save data to MongoDB
                // Ensure that the icons state is being used here
                // Example:
                await fetch('your-api-endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ icons, userName, userName2, imagesnews }),
                });
        
                // Assuming the save operation is successful, you can update the input visibility state
                setInputVisible(false);
            } catch (error) {
                console.error('Error saving image data:', error);
            }
        };
        
        // Function to handle clicking on an icon
        const handleIconClick = (index) => {
            setCurrentUrlIndex(index);
            setSelectedIndex(index);
        };



        const userName = 'Leo_DN-shows';
        const userName2 = 'Leo_DN-news';





    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
          setIsVisible(true);
        }, 20 * 60 * 1000); // 30 minutes in milliseconds
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
                    const userName2 = 'Leo_DN';

                    setImageData([{ url: "", title: "", img: "", userName2 }, ...imageData]);
                    setInputVisible(true);

                };
            
                const handleDeleteImage = (index) => {
                    const updatedImageData = imageData.filter((_, i) => i !== index);
                    setImageData(updatedImageData);
                };

                const [selectedIndex, setSelectedIndex] = useState(null);

                // const handleIconClickd = (index) => {
                //     setSelectedIndex(index);
                // };




  return (
    <div className="profile-container-headerd">
        <div className="profile-containerd">
            <div className="profile-containerd-korean">
                <div className='korean-title'>
                    <i class="fa-solid fa-film"> </i> <span>Beautiful</span>
                    <div className="border-test">
                        <p>
                            <span></span>
                            <span>{daysDifference} days ago</span>

                        </p>
                    </div>             
                </div>
            </div>
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
                            </button>
                        )}
                        {currentUrlIndex !== null && (
                            <iframe width="100%" height="100%" src={icons[currentUrlIndex].url} frameBorder="0" scrolling="0" allowFullScreen=""></iframe>
                        )}
                        
                    </div> 
                            {/* <i className="fas fa-caret-square-right"></i> */}


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
    <a href="#cast" onClick={() => toggleSection('cast')}><span>Cast</span></a>
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
                                    {/* <div className="icon" style={{ cursor: 'pointer' }} onClick={() => handleIconClick(index)}>{index + 1}</div> */}
                                    
                                    
                                    <div
                        className={`icon ${selectedIndex === index ? 'selected' : ''}`}
                        onClick={() => handleIconClick(index)}
                    >
                        {index + 1}
                    </div>
                                    {isAdmin && (
                                    <button onClick={() => handleDeleteIcon(index)}>Delete</button>
                                    )}
                                </div>
                                ))}
                                <div style={{ margin: '5px' }}>
                                {isAdmin && (
                                    <>
                                    <button onClick={handleAddIcon}>Add Icon</button>
                                    <button id="saveButton" onClick={(e) => { handleEnter(e); saveToMongoDB(icons, userName); }}>Save</button>

                                    </>
                                )}
                                </div>
                            </div>
                         </div>
                        </div>
                     </div>
    </div>
    <div className="section" id="cast">
    <div className="shows">
        <div className="shows-container">
            <p> <span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>{'▶'}</span>Cast: </p>
        </div>
        {isAdmin && (
            <>
                <button onClick={handleAddImage}>Add Image</button>
                <button id="saveButton" onClick={(e) => { handleEnter(e); saveToMongoDB(imageData, userName2); }}>Save</button>


            </>
        )}
    <div className="news">
        {imageData.map((info, index) => (
                    <div key={index} className="image-container">
                        <a href={info.url} target="_blank" rel="noopener noreferrer">
                            <img src={info.img} alt={`Image ${index}`} />
                        </a>
                        {isAdmin ? (
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
                                    <p>{info.url}</p>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
        </div>
            {isVisible && (
                <div className="outside-drama-ads">
                    <div className="drama-bottom-ads">
                
                    
                    </div>
                    <span className="close-btn" onClick={handleClose}>X</span>
                </div>
            )}


                
            {/* <div className="drama-bottom-ads">
            <span className="close-btn" onClick={handleClose}>&times;</span>

            </div> */}
    </div>

);
};
export default It_Beautiful_Now
                  