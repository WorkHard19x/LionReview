
                import React, { useState, useEffect } from 'react';
                import '../../styles/Celebrities-form.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                import axios from 'axios';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

                function Yoon_Shi_Yoon() {
                
                
                    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
                    const [birthdated, setBirthdate] = useState('1986-09-26'); // Set initial birthdate
                    

                    const toggleDropdown = () => {
                        setIsDropdownOpen(!isDropdownOpen);
                    };
                    const shareOptions = ['Copy Link', 'Facebook', 'Twitter'];
                    const shareUrl = 'https://vivufilm.com/xem-phim';

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

                        const imagesshows = [
                            { url: "", title: "It's Beautiful Now (2022)", img: "https://i.mydramalist.com/k2lrO_4c.jpg?v=1" },
                            { url: "", title: "You Raise Me Up (2021)", img: "https://i.mydramalist.com/wbn6g_4c.jpg?v=1" },
                            { url: "", title: "Train (2020)", img: "https://i.mydramalist.com/kdEBO_4c.jpg?v=1" },
                            { url: "", title: "Psychopath Diary (2019)", img: "https://i.mydramalist.com/2g4yWc.jpg?v=1" },
                            { url: "", title: "The Nokdu Flower (2019)", img: "https://i.mydramalist.com/kXL5bc.jpg?v=1" },
                            { url: "", title: "Your Honor (2018)", img: "https://i.mydramalist.com/O5jzQc.jpg?v=1" },
                            { url: "", title: "Grand Prince (2018)", img: "https://i.mydramalist.com/244yEc.jpg?v=1" },
                            { url: "", title: "Hit the Top (2017)", img: "https://i.mydramalist.com/elgEec.jpg?v=1" },
                            { url: "", title: "Vivid Romance (2017)", img: "https://i.mydramalist.com/VKAjEc.jpg?v=1" },
                            { url: "", title: "Mirror of the Witch (2016)", img: "https://i.mydramalist.com/Brdq5c.jpg?v=1" },
                            { url: "", title: "Prime Minister and I (2013)", img: "https://i.mydramalist.com/kvA5Oc.jpg?v=1" },
                            { url: "", title: "Happy Noodle (2013)", img: "https://i.mydramalist.com/2QDRRc.jpg?v=1" },
                            { url: "", title: "Flower Boy Next Door (2013)", img: "https://i.mydramalist.com/Z82l1c.jpg?v=1" },
                            { url: "", title: "Brand Guardians (2012)", img: "data:image/jpeg;base64,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" },
                            { url: "", title: "Bread, Love and Dreams (2010)", img: "https://i.mydramalist.com/6024gc.jpg?v=1" },
                            { url: "", title: "High Kick Through the Roof! (2009)", img: "https://i.mydramalist.com/Kp5wRc.jpg?v=1" },
                            { url: "", title: "", img: "" },
                            { url: "", title: "", img: "" },
                            { url: "", title: "", img: "" },
                            { url: "", title: "", img: "" }

                        ];
                        
                        const imagesnews = [
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
                            } catch (error) {
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

                    return (
                        <div className="profile-container-header">
                            <div className="profile-container">
                                <div className="profile-border">
                                    <div className="profile-content">
                                        <div className="profile-info">
                                            <h1>Yoon_Shi_Yoon</h1>
                                            <p>윤시윤</p>
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
                                            <img src="https://image.kpopmap.com/2020/09/Yoon-shiyoon-cover.jpg" alt="Yoon_Shi_Yoon" />
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
                            <div className="news">
                                {imagesshows.map((info, index) => (
                                    <a key={index} href={info.url}  rel="noopener noreferrer" className="image-container">
                                        <img src={info.img} alt={`Image ${index}`} />
                                        <p className="image-title">{info.title}</p>
                                    </a>  
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
                                    Yoon Shi Yoon, born in Suncheon as Yoon Dong Gu, is a South Korean actor and television personality managed by MOA Entertainment. Yoon debuted in the daily sitcom "High Kick Through the Roof". He was nominated for Best New Actor in TV at the Baeksang Arts Awards and won MBC's Best Couple award with his co-star Shin Se Kyung.

The following year, Yoon was cast as the main character in the slice-of-life television series "King of Baking, Kim Takgu". The series was one of the most watched shows in South Korea in 2010 with a final episode viewership rating of 50.8%, and Yoon became a household name in Korea. Due to the drama's popularity, Yoon and co-star Lee Young Ah were named promotional ambassadors for North Chungcheong Province. In 2013, he starred in the cable series "My Cute Guys", the third installment of tvN 's "flower boy" series. The series was the highest sold cable drama ever to Japan.

Yoon appeared in a commercial for the cellphone Bubi Bubi with the famous girl group T-ara. He also sang 4 singles for the soundtrack of the commercial.

On April 28, 2014, Yoon secretly enlisted into the Republic of Korea Marine Corps and was discharged on January 27, 2016.
                                    </span>
                    
                                    <div className='more-detail'>
                                        <div className="detail">
                                            <p><span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>{'▶'}</span> More Details:</p>
                                            <span><i className="fa-regular fa-star" style={{color:'white'}}></i> Zodiac: Libra</span>
                                            <br /><span><i className="fa-solid fa-up-long" style={{color:'white'}}></i> Tall: 178cm</span>
                                            <br /><span><i className="fa-brands fa-font-awesome" style={{color:'white'}}></i> Nationality: South Korean</span>
                                            <br /><a href="https://www.instagram.com/moa_ent" ><span><i className="fa-brands fa-instagram" style={{color:'white'}}></i> Yoon Shi Yoon's instagram</span></a>
                                            <br /><a href="https://www.youtube.com/channel/UCzdxR414mQFe3eyrgt4WKDg" 
                                            target="_blank" ><span><i className="fa-brands fa-youtube" style={{color:'white'}}></i> Yoon Shi Yoon's youtube</span></a>
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
                                <div className="news">
                                    {imagesnews.map((info, index) => (
                                        <a key={index} href={info.url}  rel="noopener noreferrer" className="image-container">
                                            <img src={info.img} alt={`Image ${index}`} />
                                            <p className="image-title">{info.title}</p>
                                        </a>  
                                    ))}
                                </div>
                            </div>

                        </div>



                    </div>
                );
            };
                
            export default Yoon_Shi_Yoon;
            