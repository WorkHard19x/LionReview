import React, { useState, useEffect } from 'react';
import '../../styles/Celebrities-form.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Image from "../../assets/korean/korean.jpg";

function Yoon_Shi_Yoon() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const handleFollow = () => {
      setIsFollowing(!isFollowing);
    };
  
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

    function calculateAge() {
        const birthDate = new Date('1986-09-25');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        }
        return age;
    }

    const imagesshows = [
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
      ];
    
      const imagesnews = [
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
        { url: "link1", title: "Today Love is Heavy", img: Image },
        { url: "link2", title: "Not today cause tomorrow better", img: Image },
      ];

    return (
      <div className="profile-container-header">
        <div className="profile-container">
            <div className="profile-border">
            <div className="profile-content">
                <div className="profile-info">
                <h1>Yoon Shi Yoon</h1>
                <p>윤시윤</p>
                <p>Korea</p>
                <p>Sep 25, 1986 (age {age})</p>
                <p>{isFollowing ? 'Followers: 1,000,000' : 'Follow'}</p>
                <button onClick={handleFollow} className="follow">{isFollowing ? <i className="fa-solid fa-heart" > Following</i>  : <i className="fa-regular fa-heart" > Follow</i>}</button>
                <button className="share-button" onClick={toggleDropdown}>
                <i className="fa-solid fa-share-nodes" ></i> Share {'\u25BC'}
                {isDropdownOpen && (
                    <div  className="dropdown">
                    {shareOptions.map((option, index) => (
                        <div key={index} className="dropdown-option">
                        {option}
                        </div>
                    ))}
                    </div>
                )}
                </button>
                </div>
                <div className="profile-image"></div>
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
                <p> <span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>{'\u25B6'}</span>Shows </p>
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
                        {'\u25B6'}</span>About </p>
                    <span>
                    Yoon Shi Yoon, born in Suncheon as Yoon Dong Gu, is a South Korean actor and television personality managed by MOA Entertainment. Yoon debuted in the daily sitcom "High Kick Through the Roof". He was nominated for Best New Actor in TV at the Baeksang Arts Awards and won MBC's Best Couple award with his co-star Shin Se Kyung.

The following year, Yoon was cast as the main character in the slice-of-life television series "King of Baking, Kim Takgu". The series was one of the most watched shows in South Korea in 2010 with a final episode viewership rating of 50.8%, and Yoon became a household name in Korea. Due to the drama's popularity, Yoon and co-star Lee Young Ah were named promotional ambassadors for North Chungcheong Province. In 2013, he starred in the cable series "My Cute Guys", the third installment of tvN 's "flower boy" series. The series was the highest sold cable drama ever to Japan.

Yoon appeared in a commercial for the cellphone Bubi Bubi with the famous girl group T-ara. He also sang 4 singles for the soundtrack of the commercial.

On April 28, 2014, Yoon secretly enlisted into the Republic of Korea Marine Corps and was discharged on January 27, 2016.
                    </span>
                    
                    <div className='more-detail'>
                        <div className="detail">
                        <p><span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>{'\u25B6'}</span> More Details:</p>
                        <span><i className="fa-regular fa-star" style={{color:'white'}}></i> Zodiac: Libra</span>
                        <br /><span><i className="fa-solid fa-up-long" style={{color:'white'}}></i> Tall: 178cm</span>
                        <br /><span><i className="fa-brands fa-font-awesome" style={{color:'white'}}></i> Nationality: South Korean</span>
                        <br /><a href="https://www.instagram.com/moa_ent/?hl=ko" target="_blank" ><span><i className="fa-brands fa-instagram" style={{color:'white'}}></i> Yoon Shi Yoon's instagram</span></a>
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
                <p> <span style={{fontSize:'16px', color:'rgb(13, 104, 241)'}}>{'\u25B6'}</span>News </p>
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
export default Yoon_Shi_Yoon
