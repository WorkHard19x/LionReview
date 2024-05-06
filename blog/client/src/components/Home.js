import '../styles/Home.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useState, useRef, useEffect  } from 'react';

import Image from "../assets/korean/korean.jpg";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Home = () => {
  const { pageId } = useParams(); // Get the pageId from the route parameter

  const [isBorder1Hovered, setIsBorder1Hovered] = useState(false);
  const [isBorder2Hovered, setIsBorder2Hovered] = useState(false);
  const [isBorder3Hovered, setIsBorder3Hovered] = useState(false);
  const [isBorder4Hovered, setIsBorder4Hovered] = useState(false);
  const imageWidth = 200; // Adjust this value to match the width of your images

  // Latest Releases
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageSliderRef = useRef(null);
  const images = [
    { url: "link1", title: "Today Love is Heavy", img: Image },
    { url: "link2", title: "Not today cause tomorrow better, do you agree or not", img: Image },
    { url: "link3", title: "Today Love is Heavy", img: Image },
    { url: "link2", title: "Not today cause tomorrow better", img: Image },
    { url: "link1", title: "Today Love is Heavy", img: Image },
    { url: "link2", title: "Not today cause tomorrow better", img: Image },
    { url: "link1", title: "Today Love is Heavy", img: Image },
    { url: "link2", title: "Not today cause tomorrow better", img: Image },
    { url: "link1", title: "Today Love is Heavy", img: Image },
    { url: "link2", title: "Not today cause tomorrow better", img: Image },
  ];

  const handleNextClick = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      imageSliderRef.current.scrollTo({
        left: imageSliderRef.current.scrollLeft + imageWidth,
        behavior: 'smooth'
      });
    }
  };
  const handlePrevClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      imageSliderRef.current.scrollTo({
        left: imageSliderRef.current.scrollLeft - imageWidth,
        behavior: 'smooth'
      });
    }
  };
  
  // Korean
  
  const [currentImageIndexk, setCurrentImageIndexk] = useState(0);
  const imageSliderRefk = useRef(null);
  const imagesk = [
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

  const handleNextClickk = () => {
    if (currentImageIndexk < imagesk.length - 1) {
      setCurrentImageIndexk(currentImageIndexk + 1);
      imageSliderRefk.current.scrollTo({
        left: imageSliderRefk.current.scrollLeft + imageWidth,
        behavior: 'smooth'
      });
    }
  };
  const handlePrevClickk = () => {
    if (currentImageIndexk > 0) {
      setCurrentImageIndexk(currentImageIndexk - 1);
      imageSliderRefk.current.scrollTo({
        left: imageSliderRefk.current.scrollLeft - imageWidth,
        behavior: 'smooth'
      });
    }
  };

  // China

  const [currentImageIndexc, setCurrentImageIndexc] = useState(0);
  const imageSliderRefc = useRef(null);
  const imagesc = [
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

  const handleNextClickc = () => {
    if (currentImageIndexc < imagesc.length - 1) {
      setCurrentImageIndexc(currentImageIndexc + 1);
      imageSliderRefc.current.scrollTo({
        left: imageSliderRefc.current.scrollLeft + imageWidth,
        behavior: 'smooth'
      });
    }
  };
  const handlePrevClickc = () => {
    if (currentImageIndexc > 0) {
      setCurrentImageIndexc(currentImageIndexc - 1);
      imageSliderRefc.current.scrollTo({
        left: imageSliderRefc.current.scrollLeft - imageWidth,
        behavior: 'smooth'
      });
    }
  };

    // Japan

    const [currentImageIndexj, setCurrentImageIndexj] = useState(0);
    const imageSliderRefj = useRef(null);
    const imagesj = [
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
  
    const handleNextClickj = () => {
      if (currentImageIndexj < imagesj.length - 1) {
        setCurrentImageIndexj(currentImageIndexj + 1);
        imageSliderRefj.current.scrollTo({
          left: imageSliderRefj.current.scrollLeft + imageWidth,
          behavior: 'smooth'
        });
      }
    };
    const handlePrevClickj = () => {
      if (currentImageIndexj > 0) {
        setCurrentImageIndexj(currentImageIndexj - 1);
        imageSliderRefj.current.scrollTo({
          left: imageSliderRefj.current.scrollLeft - imageWidth,
          behavior: 'smooth'
        });
      }
    };


// Japan

const [currentImageIndext, setCurrentImageIndext] = useState(0);
const imageSliderReft = useRef(null);
const imagest = [
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

const handleNextClickt = () => {
  if (currentImageIndext < imagest.length - 1) {
    setCurrentImageIndext(currentImageIndext + 1);
    imageSliderReft.current.scrollTo({
      left: imageSliderReft.current.scrollLeft + imageWidth,
      behavior: 'smooth'
    });
  }
};
const handlePrevClickt = () => {
  if (currentImageIndext > 0) {
    setCurrentImageIndext(currentImageIndext - 1);
    imageSliderReft.current.scrollTo({
      left: imageSliderReft.current.scrollLeft - imageWidth,
      behavior: 'smooth'
    });
  }
};

// ThaiLand

const [currentImageIndexth, setCurrentImageIndexth] = useState(0);
const imageSliderRefth = useRef(null);
const imagesth = [
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

const handleNextClickth = () => {
  if (currentImageIndexth < imagesth.length - 1) {
    setCurrentImageIndexth(currentImageIndexth + 1);
    imageSliderRefth.current.scrollTo({
      left: imageSliderRefth.current.scrollLeft + imageWidth,
      behavior: 'smooth'
    });
  }
};
const handlePrevClickth = () => {
  if (currentImageIndexth > 0) {
    setCurrentImageIndexth(currentImageIndexth - 1);
    imageSliderRefth.current.scrollTo({
      left: imageSliderRefth.current.scrollLeft - imageWidth,
      behavior: 'smooth'
    });
  }
};

// Other

const [currentImageIndexo, setCurrentImageIndexo] = useState(0);
const imageSliderRefo = useRef(null);
const imageso = [
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

const handleNextClicko = () => {
  if (currentImageIndexo < imageso.length - 1) {
    setCurrentImageIndexo(currentImageIndexo + 1);
    imageSliderRefo.current.scrollTo({
      left: imageSliderRefo.current.scrollLeft + imageWidth,
      behavior: 'smooth'
    });
  }
};
const handlePrevClicko = () => {
  if (currentImageIndexo > 0) {
    setCurrentImageIndexo(currentImageIndexo - 1);
    imageSliderRefo.current.scrollTo({
      left: imageSliderRefo.current.scrollLeft - imageWidth,
      behavior: 'smooth'
    });
  }
};

// Popular Celebrities

const [currentImageIndexCelebrities, setCurrentImageIndexCelebrities] = useState(0);
const imageSliderRefCelebrities = useRef(null);
const imagesCelebrities = [
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

const handleNextClickCelebrities = () => {
  if (currentImageIndexCelebrities < imagesCelebrities.length - 1) {
    setCurrentImageIndexCelebrities(currentImageIndexCelebrities + 1);
    imageSliderRefCelebrities.current.scrollTo({
      left: imageSliderRefCelebrities.current.scrollLeft + imageWidth,
      behavior: 'smooth'
    });
  }
};
const handlePrevClickCelebrities = () => {
  if (currentImageIndexCelebrities > 0) {
    setCurrentImageIndexCelebrities(currentImageIndexCelebrities - 1);
    imageSliderRefCelebrities.current.scrollTo({
      left: imageSliderRefCelebrities.current.scrollLeft - imageWidth,
      behavior: 'smooth'
    });
  }
};



// news

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


// const [posts, setPosts] = useState([]);
// const [error, setError] = useState(null);

// useEffect(() => {
//     fetchPosts();
// }, [pageId]);

// const fetchPosts = async () => {
//     try {
//         const response = await axios.get(`http://localhost:5000/api/news`);
//         console.log('Response:', response.data); // Log the response data
//         setPosts(response.data);
//         setError(null); // Reset error state if request is successful
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         setError('Error fetching posts. Please try again.'); // Set error message
//     }
// };

// if (error) {
//     return <div>Error: {error}</div>;
// }

// if (!posts || !posts.length) {
//     return <div>No posts available</div>;
// }


const [posts, setPosts] = useState([]);
const [error, setError] = useState(null);
const [postcel, setPostscel] = useState([]);
const [postkd, setPostskd] = useState([]);
const [postch, setPostsch] = useState([]);
const [postjp, setPostsja] = useState([]);
const [posttw, setPoststw] = useState([]);
const [postth, setPoststh] = useState([]);
const [postot, setPostsot] = useState([]);
const [postALL, setPostpostALL] = useState([]);

useEffect(() => {
    fetchPosts();
    fetchPostcel();
    fetchPostkd();
    fetchPostch();
    fetchPostja();
    fetchPosttw();
    fetchPostth();
    fetchPostot();
}, []);

const fetchPosts = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/news`);
        console.log('Response:', response.data); // Log the response data
        setPosts(response.data);
        setError(null); // Reset error state if request is successful
    } catch (error) {
        console.error(`Error fetching new posts:`, error);
        setError(`Error fetching new posts. Please try again.`); // Set error message
    }
};

const fetchPostcel = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/api/cel`);
      console.log('Response:', response.data); // Log the response data
      setPostscel(response.data);
      setError(null); // Reset error state if request is successful
  } catch (error) {
      console.error(`Error fetching cel posts:`, error);
      setError(`Error fetching cel posts. Please try again.`); // Set error message
  }
};

const fetchPostkd = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/api/kd`);
      console.log('Response:', response.data); // Log the response data
      setPostskd(response.data);
      setError(null); // Reset error state if request is successful
  } catch (error) {
      console.error(`Error fetching cel posts:`, error);
      setError(`Error fetching cel posts. Please try again.`); // Set error message
  }
};

const fetchPostch = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/api/ch`);
      console.log('Response:', response.data); // Log the response data
      setPostsch(response.data);
      setError(null); // Reset error state if request is successful
  } catch (error) {
      console.error(`Error fetching cel posts:`, error);
      setError(`Error fetching cel posts. Please try again.`); // Set error message
  }
};

const fetchPostja = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/api/ja`);
      console.log('Response:', response.data); // Log the response data
      setPostsja(response.data);
      setError(null); // Reset error state if request is successful
  } catch (error) {
      console.error(`Error fetching cel posts:`, error);
      setError(`Error fetching cel posts. Please try again.`); // Set error message
  }
};

const fetchPosttw = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/api/tw`);
      console.log('Response:', response.data); // Log the response data
      setPoststw(response.data);
      setError(null); // Reset error state if request is successful
  } catch (error) {
      console.error(`Error fetching cel posts:`, error);
      setError(`Error fetching cel posts. Please try again.`); // Set error message
  }
};

const fetchPostth = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/api/th`);
      console.log('Response:', response.data); // Log the response data
      setPoststh(response.data);
      setError(null); // Reset error state if request is successful
  } catch (error) {
      console.error(`Error fetching cel posts:`, error);
      setError(`Error fetching cel posts. Please try again.`); // Set error message
  }
};


const fetchPostot = async () => {
  try {
      const response = await axios.get(`http://localhost:5000/api/ot`);
      console.log('Response:', response.data); // Log the response data
      setPostsot(response.data);
      setError(null); // Reset error state if request is successful
  } catch (error) {
      console.error(`Error fetching cel posts:`, error);
      setError(`Error fetching cel posts. Please try again.`); // Set error message
  }
};




const [hoveredIndex, setHoveredIndex] = useState(1);
const [timerPaused, setTimerPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timerPaused) {
        // Reset all borders
        setIsBorder1Hovered(false);
        setIsBorder2Hovered(false);
        setIsBorder3Hovered(false);
        setIsBorder4Hovered(false);

        // Set the next border as hovered
        switch (hoveredIndex) {
          case 1:
            setIsBorder2Hovered(true);
            setHoveredIndex(2);
            break;
          case 2:
            setIsBorder3Hovered(true);
            setHoveredIndex(3);
            break;
          case 3:
            setIsBorder4Hovered(true);
            setHoveredIndex(4);
            break;
          case 4:
            setIsBorder1Hovered(true);
            setHoveredIndex(1);
            break;
          default:
            break;
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [hoveredIndex, timerPaused]);



if (error) {
  return <div>Error: {error}</div>;
}
  return (
    <div className="full-size" >
        <div className="container">
        {/* Four borders with images */}
        <div
          className={`border border1 ${isBorder1Hovered ? 'show-bg' : ''}`}
          onMouseEnter={() => {
            setIsBorder1Hovered(true);
            setTimerPaused(true);
          }}
          onMouseLeave={() => {
            setIsBorder1Hovered(false);
            setTimerPaused(false);
          }}
        >
          <div className="overlay-text">Business Proposal</div>
          <span className="arrow-icon">
            <a href="your_link_here">
              <i className="fas fa-arrow-circle-right" style={{ fontSize: '37px' }}></i>
            </a>
          </span>
        </div>
        <div
          className={`border border2 ${isBorder2Hovered ? 'show-bg' : ''}`}
          onMouseEnter={() => {
            setIsBorder2Hovered(true);
            setTimerPaused(true);
          }}
          onMouseLeave={() => {
            setIsBorder2Hovered(false);
            setTimerPaused(false);
          }}
        >
          <div className="overlay-text">Business Proposal</div>
          <span className="arrow-icon">
            <a href="your_link_here">
              <i className="fas fa-arrow-circle-right" style={{ fontSize: '37px' }}></i>
            </a>
          </span>
        </div>
        <div
          className={`border border3 ${isBorder3Hovered ? 'show-bg' : ''}`}
          onMouseEnter={() => {
            setIsBorder3Hovered(true);
            setTimerPaused(true);
          }}
          onMouseLeave={() => {
            setIsBorder3Hovered(false);
            setTimerPaused(false);
          }}
        >
          <div className="overlay-text">Business Proposal</div>
          <span className="arrow-icon">
            <a href="your_link_here">
              <i className="fas fa-arrow-circle-right" style={{ fontSize: '37px' }}></i>
            </a>
          </span>
        </div>
        <div
          className={`border border4 ${isBorder4Hovered ? 'show-bg' : ''}`}
          onMouseEnter={() => {
            setIsBorder4Hovered(true);
            setTimerPaused(true);
          }}
          onMouseLeave={() => {
            setIsBorder4Hovered(false);
            setTimerPaused(false);
          }}
        >
          <div className="overlay-text">Business Proposal</div>
          <span className="arrow-icon">
            <a href="your_link_here">
              <i className="fas fa-arrow-circle-right" style={{ fontSize: '37px' }}></i>
            </a>
          </span>
        </div>
      </div>

        {/* Latest Releases */}
        {/* <div class="tooltip">
          <a href=""><h1>Latest Releases <span style={{fontSize:'21px'}}>&gt;</span> </h1>
          <span class="tooltiptext"> See all &gt;  </span>
          </a>
        </div>
        <div className="continue">
        <div className='image-slider-continue' ref={imageSliderRef}>
          {images.map((info, index) => (
            <a key={index} href={info.url}  rel="noopener noreferrer" className="image-container">
            <img src={info.img} alt={`Image ${index}`}
            
            />
            <p className="image-title">{info.title}</p>
          </a> 
          ))}
        </div>
        <div className="navigation-arrows">
          <i className="fas fa-arrow-circle-left" onClick={handlePrevClick}></i>
        </div>
        <div className="navigation-arrows1">
          <i className="fas fa-arrow-circle-right" onClick={handleNextClick}></i>
        </div>
      </div> */}
        
      {/* Korean */}
      <div class="tooltipk">
          <a href=""><h1 style={{fontSize:'22px'}}>Korean <span >&gt;</span> </h1>
          <span class="tooltiptextk" style={{fontSize:'16px'}}> See all &gt;  </span>
          </a>
        </div>
        <div className="continue">
        <div className='image-slider-continue' ref={imageSliderRefk}>
        {postkd.slice().reverse().map((post, index) => (
              <div key={index} >
                <a href={post.korean_url}>
                  <div className="image-container">
                      <img src={post.img} alt={post.title} 
                      style={{height: '150px', width:'250px', margin:'2rem',  border: '1px solid white' }}
                      />
                      <p className="image-title">{post.title}</p>
                      </div>
                      </a>
                    
              </div>
            ))}

        </div>
        <div className="navigation-arrows">
          <i className="fas fa-arrow-circle-left" onClick={handlePrevClickk}></i>
        </div>
        <div className="navigation-arrows1">
          <i className="fas fa-arrow-circle-right" onClick={handleNextClickk}></i>
        </div>
      </div>

      {/* China */}
      <div class="tooltipk">
          <a href=""><h1 style={{fontSize:'22px'}}>China <span >&gt;</span> </h1>
          <span class="tooltiptextk" style={{fontSize:'16px'}}> See all &gt;  </span>
          </a>
        </div>
        <div className="continue">
        <div className='image-slider-continue' ref={imageSliderRefc}>
        {postch.slice().reverse().map((post, index) => (
              <div key={index} >
                <a href={post.chinese_url}>
                  <div className="image-container">
                      <img src={post.img} alt={post.title} 
                      style={{height: '150px', width:'250px', margin:'2rem',  border: '1px solid white' }}
                      />
                      <p className="image-title">{post.title}</p>
                      </div>
                      </a>
                  
              </div>
            ))}
        </div>
        <div className="navigation-arrows">
          <i className="fas fa-arrow-circle-left" onClick={handlePrevClickc}></i>
        </div>
        <div className="navigation-arrows1">
          <i className="fas fa-arrow-circle-right" onClick={handleNextClickc}></i>
        </div>
      </div>

      {/* Japan */}
      <div class="tooltipk">
          <a href=""><h1 style={{fontSize:'22px'}} >Japan <span>&gt;</span> </h1>
          <span class="tooltiptextk" style={{fontSize:'16px'}}> See all &gt;  </span>
          </a>
        </div>
        <div className="continue">
        <div className='image-slider-continue' ref={imageSliderRefj}>
        {postjp.slice().reverse().map((post, index) => (
              <div key={index} >
                <a href={post.japan_url}>
                  <div className="image-container">
                      <img src={post.img} alt={post.title} 
                      style={{height: '150px', width:'250px', margin:'2rem',  border: '1px solid white' }}

                      />
                      <p className="image-title">{post.title}</p>
                      </div>
                      </a>
                   
              </div>
            ))}
        </div>
        <div className="navigation-arrows">
          <i className="fas fa-arrow-circle-left" onClick={handlePrevClickj}></i>
        </div>
        <div className="navigation-arrows1">
          <i className="fas fa-arrow-circle-right" onClick={handleNextClickj}></i>
        </div>
      </div>

      {/* Taiwan */}
      <div class="tooltipk">
          <a href=""><h1>Taiwan <span style={{fontSize:'21px'}}>&gt;</span> </h1>
          <span class="tooltiptextk" style={{fontSize:'16px'}}> See all &gt;  </span>
          </a>
        </div>
        <div className="continue">
        <div className='image-slider-continue' ref={imageSliderReft}>
        {posttw.slice().reverse().map((post, index) => (
              <div key={index} >
                <a href={post.taiwan_url}>
                  <div className="image-container">
                      <img src={post.img} alt={post.title} 
                      style={{height: '150px', width:'250px', margin:'2rem',  border: '1px solid white' }}
                      />
                      <p className="image-title">{post.title}</p>
                      </div>
                      </a>
                   
              </div>
            ))}
        </div>
        <div className="navigation-arrows">
          <i className="fas fa-arrow-circle-left" onClick={handlePrevClickt}></i>
        </div>
        <div className="navigation-arrows1">
          <i className="fas fa-arrow-circle-right" onClick={handleNextClickt}></i>
        </div>
      </div>

      {/* ThaiLand */}
      <div class="tooltipk">
          <a href=""><h1>ThaiLand <span style={{fontSize:'21px'}}>&gt;</span> </h1>
          <span class="tooltiptextk" style={{fontSize:'16px'}}> See all &gt;  </span>
          </a>
        </div>
        <div className="continue">
        <div className='image-slider-continue' ref={imageSliderRefth}>
        {postth.slice().reverse().map((post, index) => (
              <div key={index} >
                <a href={post.thailand_url}>
                  <div className="image-container">
                      <img src={post.img} alt={post.title} 
                      style={{height: '150px', width:'250px', margin:'2rem',  border: '1px solid white' }}
                      />
                      <p className="image-title">{post.title}</p>
                      </div>
                      </a>
                    
              </div>
            ))}
        </div>
        <div className="navigation-arrows">
          <i className="fas fa-arrow-circle-left" onClick={handlePrevClickth}></i>
        </div>
        <div className="navigation-arrows1">
          <i className="fas fa-arrow-circle-right" onClick={handleNextClickth}></i>
        </div>
      </div>

      {/* Other */}
      <div class="tooltipk">
          <a href=""><h1>Other <span style={{fontSize:'21px'}}>&gt;</span> </h1>
          <span class="tooltiptextk" style={{fontSize:'16px'}}> See all &gt;  </span>
          </a>
        </div>
        <div className="continue">
        <div className='image-slider-continue' ref={imageSliderRefo}>
        {postot.slice().reverse().map((post, index) => (
              <div key={index} >
                <a href={post.other_url}>
                  <div className="image-container">
                      <img src={post.img} alt={post.title} 
                      style={{height: '150px', width:'250px', margin:'2rem',  border: '1px solid white' }}
                      />
                      <p className="image-title">{post.title}</p>
                      </div>
                      </a>
                   
              </div>
            ))}
        </div>
        <div className="navigation-arrows">
          <i className="fas fa-arrow-circle-left" onClick={handlePrevClicko}></i>
        </div>
        <div className="navigation-arrows1">
          <i className="fas fa-arrow-circle-right" onClick={handleNextClicko}></i>
        </div>
      </div>


        {/* Popular Celebrities */}
        <div class="tooltipk">
          <a href=""><h1>Popular Celebrities <span style={{fontSize:'21px'}}>&gt;</span> </h1>
          <span class="tooltiptextk" style={{fontSize:'16px',marginLeft: '-6rem'}}> See all &gt;  </span>
          </a>
        </div>
        <div className="continue">
          <div className='image-slider-continue' ref={imageSliderRefCelebrities}>

            {postcel.slice().reverse().map((post, index) => (
              <div key={index} >
                <a href={post.url_pagecel}>
                  <div className="image-container">
                      <img src={post.imageUrl} alt={post.title} 
                      style={{height: '150px', width:'250px', margin:'2rem',  border: '1px solid white' }}
                      />
                      <p className="image-title">{post.name}</p>
                      </div>
                      </a>
                   
              </div>
            ))}

          </div>
          <div className="navigation-arrows">
            <i className="fas fa-arrow-circle-left" onClick={handlePrevClickCelebrities}></i>
          </div>
          <div className="navigation-arrows1">
            <i className="fas fa-arrow-circle-right" onClick={handleNextClickCelebrities}></i>
          </div>
      </div>

      {/* news */}
      <div class="tooltipk">
          <a href=""><h1>News <span style={{fontSize:'21px'}}>&gt;</span> </h1>
          <span class="tooltiptextk" style={{fontSize:'16px'}}> See all &gt;  </span>
          </a>
        </div>
      <div className="news">
          {posts.slice().reverse().map((post, index) => (
            <div key={index} >
              <a href={post.url_page}>
                <div className="image-container">
                    <img src={post.imageUrlnews} alt={post.title} 
                    />
                    <p className="image-title">{post.title}</p>
                </div>
                </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

