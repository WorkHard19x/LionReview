
import React, { useState, useEffect } from 'react';
import '../../styles/Celebrities-form.css';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function A1Cel() {
const [formData, setFormData] = useState({
        name: '',
        birthdate: '',
        nickname:'',
        country: '',
        imageUrl: '',

        imageshowUrl: '',
        showurl: '',
        showtitle: '',
        
        imageshowUrl1: '',
        showurl1: '',
        showtitle1: '',

        imageshowUrl2: '',
        showurl2: '',
        showtitle2: '',

        imageshowUrl3: '',
        showurl3: '',
        showtitle3: '',

        imageshowUrl4: '',
        showurl4: '',
        showtitle4: '',

        imageshowUrl5: '',
        showurl5: '',
        showtitle5: '',

        imageshowUrl6: '',
        showurl6: '',
        showtitle6: '',

        imageshowUrl7: '',
        showurl7: '',
        showtitle7: '',

        imageshowUrl8: '',
        showurl8: '',
        showtitle8: '',

        imageshowUrl9: '',
        showurl9: '',
        showtitle9: '',

        imageshowUrl10: '',
        showurl10: '',
        showtitle10: '',

        imageshowUrl11: '',
        showurl11: '',
        showtitle11: '',

        imageshowUrl12: '',
        showurl12: '',
        showtitle12: '',

        imageshowUrl13: '',
        showurl13: '',
        showtitle13: '',

        imageshowUrl14: '',
        showurl14: '',
        showtitle14: '',

        imageshowUrl15: '',
        showurl15: '',
        showtitle15: '',

        imageshowUrl16: '',
        showurl16: '',
        showtitle16: '',

        imageshowUrl17: '',
        showurl17: '',
        showtitle17: '',

        imageshowUrl18: '',
        showurl18: '',
        showtitle18: '',

        imageshowUrl19: '',
        showurl19: '',
        showtitle19: '',

        imageshowUrl20: '',
        showurl20: '',
        showtitle20: '',

        imagenewsUrl: '',
        newsurl: '',
        newstitle: '',

        imagenewsUrl1: '',
        newsurl1: '',
        newstitle1: '',

        imagenewsUrl2: '',
        newsurl2: '',
        newstitle2: '',

        imagenewsUrl3: '',
        newsurl3: '',
        newstitle3: '',

        imagenewsUrl4: '',
        newsurl4: '',
        newstitle4: '',

        imagenewsUrl5: '',
        newsurl5: '',
        newstitle5: '',

        imagenewsUrl6: '',
        newsurl6: '',
        newstitle6: '',

        imagenewsUrl7: '',
        newsurl7: '',
        newstitle7: '',

        imagenewsUrl8: '',
        newsurl8: '',
        newstitle8: '',

        imagenewsUrl9: '',
        newsurl9: '',
        newstitle9: '',

        imagenewsUrl10: '',
        newsurl10: '',
        newstitle10: '',

        imagenewsUrl11: '',
        newsurl11: '',
        newstitle11: '',

        imagenewsUrl12: '',
        newsurl12: '',
        newstitle12: '',

        imagenewsUrl13: '',
        newsurl13: '',
        newstitle13: '',

        imagenewsUrl14: '',
        newsurl14: '',
        newstitle14: '',

        imagenewsUrl15: '',
        newsurl15: '',
        newstitle15: '',

        imagenewsUrl16: '',
        newsurl16: '',
        newstitle16: '',

        imagenewsUrl17: '',
        newsurl17: '',
        newstitle17: '',

        imagenewsUrl18: '',
        newsurl18: '',
        newstitle18: '',

        imagenewsUrl19: '',
        newsurl19: '',
        newstitle19: '',

        imagenewsUrl20: '',
        newsurl20: '',
        newstitle20: '',

        describle: '',

        libra: '',
        tall: '',
        nationality: '',
        instagram: '',
        nameinstagram: '',
        youtube: '',
        nameyoutube: '',
    });


    const [isEditingName, setIsEditingName] = useState(false);
    const [nameValue, setNameValue] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/celebrity`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleNameEdit = () => {
        setIsEditingName(true);
        setNameValue(formData.name);
    };

    const handleNameSave = async () => {
        setIsEditingName(false);
        try {
            await axios.put(`${API_BASE_URL}/api/celebrity`, { name: nameValue });
            fetchData();
        } catch (error) {
            console.error('Error updating name:', error);
        }
    };

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    };











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
                            {isEditingName ? (
                                <input type="text" value={nameValue} onChange={handleNameChange} />
                            ) : (
                                <h1>{formData.name}</h1>
                            )}
                            {/* Button to toggle edit mode */}
                            <button onClick={isEditingName ? handleNameSave : handleNameEdit} className="edit-btn">
                                {isEditingName ? 'Save' : 'Edit'}
                            </button>
                            {/* Render other fields similarly */}
                            <p>leo</p>
                            <p>korean</p>
                            <p>08181998</p>

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
                            <img src={formData.imageUrl} alt="Yoon_Shi_Yoon" />
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

export default A1Cel;
