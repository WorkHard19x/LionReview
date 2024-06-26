
                
                import React, { useState, useEffect } from 'react';
                import '../../styles/Drama.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                import Editable from '../Editable';
                import axios from 'axios';
                import { useParams } from 'react-router-dom';
                import { useLocation } from 'react-router-dom';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function PeachBoyRiverside() {
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


    const today = new Date();
    const uploadDate = new Date('2024-05-16'); // '2024-04-02' represents April 2, 2024

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
            const storedIcons = localStorage.getItem('Peach Boy Riverside_icons');
            return storedIcons ? JSON.parse(storedIcons) : [
               { url: "https://www.youtube.com/embed/k1PMys8kbG4"},
                { url: ""},
                { url: ""},
                { url: ""},
                { url: ""},
            ];
            });


    useEffect(() => {
        const storedIcons = localStorage.getItem('Peach Boy Riverside_icons');
        if (storedIcons) {
            setIcons(JSON.parse(storedIcons));
        }
    }, []);


    useEffect(() => {
        // Save icons state to localStorage whenever it changes
        localStorage.setItem('Peach Boy Riverside_icons', JSON.stringify(icons));
    }, [icons]);

    const handleAddIcon = () => {
        const newIcon = { url: "" };
        setIcons([...icons, newIcon]);
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

    const saveToMongoDB = async (icons, pageId) => {
                try {
                    const urls = icons.map(icon => icon.url); // Extract urls from icons
                    const response = await fetch(`${API_BASE_URL}/api/korenaMovie/${pageId}`, {    
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ urls }), // Pass urls to the backend
                    });

                    const responseData = await response.json();
                    console.log(responseData);
            
                    const debugInfo = document.getElementById('debug-info');
                    debugInfo.innerHTML = `Page ID: ${pageId}<br />Saved Data: ${JSON.stringify(urls)}`;
            
                    console.log('Data saved successfully to MongoDB');
                } catch (error) {
                    console.error('Error saving data to MongoDB:', error);
                }
            };



        const location = useLocation();
        useEffect(() => {
            const hash = location.hash;
            if (hash) {
                toggleSection(hash.substring(1));
            } else {
                toggleSection('shows');
            }
        }, [location]);



        function toggleSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.style.display = section.id === sectionId ? 'block' : 'none';
            });
        }




 







        const handleEnter = (e) => {
            if (e.key === 'Enter' || e.target.id === 'saveButton') {
                setInputVisible(false);
            }
        };



        






        // Function to handle clicking on an icon
        const handleIconClick = (index) => {
            setCurrentUrlIndex(index);
            setSelectedIndex(index);
        };



        const userName = 'Peach Boy Riverside-epdisode';
        const userName2 = 'Peach Boy Riverside-image';





    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
          setIsVisible(true);
        }, 20 * 60 * 1000); // 30 minutes in milliseconds
      };



                    const [imageData, setImageData] = useState(() => {
                    const storedImageData = localStorage.getItem('Peach Boy Riverside-image');
                    return storedImageData ? JSON.parse(storedImageData) : [
                        { url: "",
                          title: "",
                            img: "" },
                        { url: "",
                          title: "",
                            img: "" },
                        { url: "",
                          title: "",
                            img: "" },
                        { url: "",
                          title: "",
                            img: "" },
                        { url: "",
                          title: "",
                            img: "" },
                        ];
                });
                
                    useEffect(() => {
                    const storedImageData = localStorage.getItem('Peach Boy Riverside-image');
                    if (storedImageData) {
                        setImageData(JSON.parse(storedImageData));
                    }
                }, []);

                useEffect(() => {
                    // Save icons state to localStorage whenever it changes
                    localStorage.setItem('Peach Boy Riverside-image', JSON.stringify(imageData));
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
                    console.log('Logged In User Email:', loggedInUserEmail);

                    const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');
                    console.log('Session Token:', sessionToken);

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
                    

                     const [lastIdData, setLastIdData] = useState(null);     

                    // Function to fetch id_data values and update state
                    const fetchLastIdData = async () => {
                        try {
                            const response = await axios.get(`${API_BASE_URL}/api/kd/id_data`);
                            const idDataList = response.data;
                            if (idDataList.length > 0) {
                                setLastIdData(idDataList[idDataList.length - 1]);
                            }
                        } catch (error) {
                            console.error('Error fetching id_data:', error);
                        }
                    };

                    useEffect(() => {
                        // Fetch the last id_data value when component mounts
                        fetchLastIdData();
                    }, []);

                    // Another function that uses the id_data value
                    const anotherFunction = (id_data) => {
                        // Convert id_data to a string enclosed within double quotes
                        const Id_data = `"${String(id_data)}"`;
                        console.log(Id_data);

                        // Your function logic here...
                    };

                    // Call anotherFunction automatically when lastIdData changes
                    useEffect(() => {
                        if (lastIdData !== null) {
                            anotherFunction(lastIdData);
                        }
                    }, [lastIdData]);

const [searchTitle, setSearchTitle] = useState('');
                    const [searchResult, setSearchResult] = useState(null);
                    const [editedTitle, setEditedTitle] = useState('');
                    const [editeddate, setEditeddate] = useState('');
                    const [editedepisode, setEditepisode] = useState('');

                    const [error, setError] = useState('');

                    const handleSearch = async () => {
                        try {
                            const response = await axios.get(`${API_BASE_URL}/api/kd?title=${searchTitle}`);
                            setSearchResult(response.data);
                            setEditedTitle(response.data.title); // Initialize editedTitle with the retrieved title
                            setEditeddate(response.data.date); // Initialize editedTitle with the retrieved title
                            setEditepisode(response.data.episode); // Initialize editedTitle with the retrieved title

                            setError('');
                        } catch (error) {
                            if (error.response && error.response.data) {
                                setError(error.response.data.error);
                            } else {
                                setError('Failed to search for Korean drama.');
                            }
                            setSearchResult(null);
                        }
                    };

                    const handleEditTitleChange = (e) => {
                        setEditedTitle(e.target.value);
                    };
                    const handleEditdate = (e) => {
                        setEditeddate(e.target.value);
                    };
                     const handleEditepisode = (e) => {
                        setEditepisode(e.target.value);
                    };

                    const handleUpdateTitle = async () => {
                        try {
                            // Assuming `searchResult.id_data` contains the correct `id_data` value
                            const response = await axios.put(`${API_BASE_URL}/api/kd/${searchResult.id_data}`, {
                                title: editedTitle.trim(), // Trim any leading or trailing whitespace
                                date: editeddate.trim(), // Trim any leading or trailing whitespace
                                episode: editedepisode.trim()

                            });
                            alert(response.data.message); // Display success message
                        } catch (error) {
                            console.error('Failed to update title:', error);
                            alert('Failed to update title. Please try again.'); // Display error message
                        }
                    };



                    // Call handleSearch when the component mounts or searchTitle changes
                    useEffect(() => {
                        if (searchTitle) {
                            handleSearch();
                        }
                    }, [searchTitle]);

                    console.log("searchResult", searchResult)

                    

  return (
    <div className="profile-container-headerd">
        <div className="profile-containerd">
            <div className="profile-containerd-korean">
                <div className='korean-title'>
                    <i className="fa-solid fa-film"> </i> <span> Peach Boy Riverside</span>
                    <div className="border-test">
                        <p>
                            <span style={{fontSize:"15px"}}>Genre:['Action', 'Adventure', 'Fantasy']</span>

                            <span>{daysDifference} days ago</span>
                        </p>
                        {user && user.is_admin &&(
                        
                        <div>
                            {/* Your JSX code here */}
                            {/* Input field for searching Korean dramas by title */}
                            <input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                            <button onClick={handleSearch}>Search</button>
                            {error && <p>{error}</p>}
                            {searchResult && (
                                <div>
                                    {/* Input field for editing the title */}
                                    <input type="text" value={editedTitle} onChange={handleEditTitleChange} />
                                    <input type="date" value={editeddate} onChange={handleEditdate} />
                                    <input type="text" value={editedepisode} onChange={handleEditepisode} />

                                    <button onClick={handleUpdateTitle}>Update Title</button>
                                </div>
                            )}
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="profile-borderd">
                <div className="video-left">
                    <div className="vide-left-ads">
                        <div>
                           {/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}
                        </div>
                    </div>
                </div>

                <div className="video">
                    {showAd && !adClicked && (
                        <button className="ad-overlay" onClick={handleStartVideoClick}></button>
                    )}
                    {currentUrlIndex !== null && (
                        <iframe width="100%" height="100%" src={icons[currentUrlIndex].url} scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"
                        style={{border:"none", overflow:"hidden"}}
                        ></iframe>
                    )}
                </div>

                <div className="video-right">
                    <div className="vide-right-ads">
                        {/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}
                    </div>
                </div>
            </div>
        </div>
        <div className='tittled'>
            <a href="#shows" onClick={() => toggleSection('shows')}><span>Episode</span></a>
            {/* <a href="#cast" onClick={() => toggleSection('cast')}><span>Cast</span></a> */}
            <a href="#summary" onClick={() => toggleSection('summary')}><span>Summary</span></a>
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
                    <div className="icon-container">
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {icons.map((icon, index) => (
    <div key={index} style={{ margin: '4px' }}>
        {isInputVisible && index === icons.length - 1 && ( // Only show input for the last added icon
            <input
                type="text"
                value={icon.url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                onKeyDown={handleEnter}
                style={{ width: '100%', boxSizing: 'border-box' }}
            />
        )}
        <div
            className={`icon ${selectedIndex === index ? 'selected' : ''}`}
            onClick={() => handleIconClick(index)}
        >
            {index + 1}
        </div>
        {user && user.is_admin &&(

            <button onClick={() => handleDeleteIcon(index)}>Delete</button>
        )}
    </div>
))}
<div style={{ margin: '5px' }}>
    {user && user.is_admin &&(

        <>
            <button onClick={() => { handleAddIcon(); setInputVisible(true); }}>Add Icon</button>
            <button id="saveButton" onClick={(e) => { handleEnter(e); saveToMongoDB(icons, userName); setInputVisible(false); }}>Save</button>
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
                {user && user.is_admin &&(

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
                            {user && user.is_admin ?(

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
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="section" id="summary">
            <div className="summary-main">
                    <div className="summary-nav">
                        <div className="summary-first">
                            <img src="https://cdn.myanimelist.net/images/anime/1535/115023.jpg" alt=""
                             style={{width:"230px", height:"230px"}}/>
                        </div>
   
                        <div className="summary-second">
                                <p>Detail:</p>
                                <p> <p>Type: TV</p>
<p>Episodes: 12
</p><p>Status: Finished Airing
</p><p>Aired: Jul 1, 2021 to Sep 16, 2021
</p><p>Premiered: Summer 2021
</p><p>Broadcast: Thursdays at 22:00 (JST)</p></p>
                        </div>
                    </div>
            </div>
             <div className="summary-seconds">
                        <p>Summary:</p>
                                <p> In a magical world where humans, demihumans, and oni are heavily at odds with each other, a princess named Saltorine "Sally" Aldike is on a journey to find a person named Mikoto Kibitsu. Traversing the world, Sally comes across many truths that she had been ignorant of due to her lineage—including the knowledge that the oni possess power potent enough to wipe out humanity.
<p>
Seemingly blessed with a way to counter the oni's might, Sally has a strange power that manifests itself as a sigil resembling a peach, giving her superhuman abilities capable of defeating powerful oni with ease. Even so, Sally refuses to discriminate between humans, demihumans, and oni as much as possible, believing that peace between the three factions could be attainable one day.
</p>

<p>
On the contrary, Mikoto—who also has the same ability as Sally's but with greater mastery—has a different goal. Mikoto is out to kill and torment all oni in existence, stopping at nothing to fulfill this objective. As Sally and Mikoto continue to cross paths, the power they possess will spell the difference between amicable coexistence and utter annihilation.
</p></p>
                    </div>
        </div>

        {isVisible && (
            <div className="outside-drama-ads">
                <div className="drama-bottom-ads">
                </div>
                <span className="close-btn" onClick={handleClose}>X</span>
            </div>
        )}
    </div>
);
};


                
            
            export default PeachBoyRiverside;
            