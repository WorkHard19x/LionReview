import axios from 'axios';
import React, { useState, useRef } from 'react';
import BoldToggle from './BoldToggle';
import '../styles/PostCreationForm.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function PostNewForm({ updatePosts  }) {
    const summaryTextareaRef = useRef(null);
    const fulldetailTextareaRef = useRef(null);

    const [formData, setFormData] = useState({
        title_korean_url:'',
        title_chinese_url:'',
        title_japan_url:'',
        title_taiwan_url:'',
        title_thailand_url:'',
        title_other_url:'',
        title:'',
        date: '',
        episode: '',
        ep1: '',
        ep2: '',
        ep3: '',
        imageshowUrl1: '',
        showurl1: '',
        showtitle1: '',
        imageshowUrl2: '',
        showurl2: '',
        showtitle2: '',
        imageshowUrl3: '',
        showurl3: '',
        showtitle3: '',
        korean_url:'',
        chinese_url:'',
        japan_url:'',
        taiwan_url:'',
        thailand_url:'',
        other_url:'',
        img:'',
        summarytext:'',
        fulldetail:'',

        genres: [], // Change to array for multiple genres

    });


    const handleChange = (nameOrEvent, value) => {
        let name, newValue;
        if (typeof nameOrEvent === 'string') {
            name = nameOrEvent;
            newValue = value;
        } else {
            name = nameOrEvent.target.name;
            newValue = nameOrEvent.target.value;
        }
        setFormData(prevData => ({
            ...prevData,
            [name]: newValue
        }));


        if (name === 'title_korean_url') {
            const urlPage = `http://localhost:3000/Anime/${value}/1`;
            setFormData(prevState => ({ ...prevState, korean_url: urlPage }));
        }
        if (name === 'title_chinese_url') {
            const urlPage = `http://localhost:3000/Movie/${value}/1`;
            setFormData(prevState => ({ ...prevState, chinese_url: urlPage }));
        }
        if (name === 'title_japan_url') {
            const urlPage = `http://localhost:3000/Japan/${value}/1`;
            setFormData(prevState => ({ ...prevState, japan_url: urlPage }));
        }
        if (name === 'title_taiwan_url') {
            const urlPage = `http://localhost:3000/Taiwan/${value}/1`;
            setFormData(prevState => ({ ...prevState, taiwan_url: urlPage }));
        }
        if (name === 'title_thailand_url') {
            const urlPage = `http://localhost:3000/Thailand/${value}/1`;
            setFormData(prevState => ({ ...prevState, thailand_url: urlPage }));
        }
        if (name === 'title_other_url') {
            const urlPage = `http://localhost:3000/Other/${value}/1`;
            setFormData(prevState => ({ ...prevState, other_url: urlPage }));
        }
        
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let apiUrl = ''; // Initialize apiUrl variable
    
    // Determine the API endpoint URL based on the selected option
        switch (selectedOption) {
            case 'korean':
                apiUrl = `${API_BASE_URL}/api/kd`;
                break;
            case 'chinese':
                apiUrl = `${API_BASE_URL}/api/ch`;
                break;
            case 'japan':
                apiUrl = `${API_BASE_URL}/api/ja`;
                break;
            case 'taiwan':
                apiUrl = `${API_BASE_URL}/api/tw`;
                break;
            case 'thailand':
                apiUrl = `${API_BASE_URL}/api/th`;
                break;
            case 'other':
                apiUrl = `${API_BASE_URL}/api/ot`;
                break;
            default:
                // Handle default case or show error message
                break;
        }
        try {
            console.log('Form data:', formData); // Log the form data to check its content
    
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { id } = response.data;
            localStorage.setItem('objectId', id);

            console.log('Response:', response.data); // Log the response data for debugging
    
            // Reset the form data after successful submission
            setFormData({
                title_korean_url:'',
                title_chinese_url:'',
                title_japan_url:'',
                title_taiwan_url:'',
                title_thailand_url:'',
                title_other_url:'',
                title:'',
                date: '',
                episode: '',
                img:'',
                korean_url:'',
                chinese_url:'',
                japan_url:'',
                taiwan_url:'',
                thailand_url:'',
                other_url:'',
                summarytext:'',
                fulldetail:'',

                
                genres: [], // Change to array for multiple genres
            });
            const responsed = await axios.post(`${API_BASE_URL}/korean-drama`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Add import statement to App.js
            const jsFileName = responsed.data.jsFileName;
            updateAppJs(jsFileName);
            updatePosts({
                title: response.data.title,
                img: response.data.img,
                korean_url: response.data.korean_url,
                chinese_url: response.data.chinese_url,
                japan_url: response.data.japan_url,
                taiwan_url: response.data.taiwan_url,
                thailand_url: response.data.thailand_url,
                other_url: response.data.other_url,
            });

            alert('Form data submitted successfully');

            window.location.reload();

            // Fetch the updated news after submission
            fetchNews();
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

const fetchNews = async () => {
    let apiUrl = ''; // Initialize apiUrl variable
    
    // Determine the API endpoint URL based on the selected option
        switch (selectedOption) {
            case 'korean':
                apiUrl = `${API_BASE_URL}/api/kd`;
                break;
            case 'chinese':
                apiUrl = `${API_BASE_URL}/api/ch`;
                break;
            case 'japan':
                apiUrl = `${API_BASE_URL}/api/ja`;
                break;
            case 'taiwan':
                apiUrl = `${API_BASE_URL}/api/tw`;
                break;
            case 'thailand':
                apiUrl = `${API_BASE_URL}/api/th`;
                break;
            case 'other':
                apiUrl = `${API_BASE_URL}/api/ot`;
                break;
            default:
                // Handle default case or show error message
                break;
        }
    try {
        const response = await axios.get(apiUrl);
        // const response = await axios.get('http://localhost:5000/api/news');
        // Process the fetched news data as needed
    } catch (error) {
        console.error('Error fetching news:', error);
        // Handle error if necessary
    }
};
   

















// const handleChange = (nameOrEvent, value) => {
//     let name, newValue;
//     if (typeof nameOrEvent === 'string') {
//         name = nameOrEvent;
//         newValue = value;
//     } else {
//         name = nameOrEvent.target.name;
//         newValue = nameOrEvent.target.value;
//     }

//     setFormData(prevData => ({
//         ...prevData,
//         [name]: newValue
//     }));
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         // Send form data to the server
//         const response = await axios.post('http://localhost:5000/korean-drama', formData, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         alert('Form data submitted successfully');
//         // Add import statement to App.js
//         const jsFileName = response.data.jsFileName;
//         updateAppJs(jsFileName);
//     } catch (error) {
//         console.log('Error submitting form data:', error);
//         alert('Failed to submit form data');
//     }
// };

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


const [numInputs, setNumInputs] = useState(1);
const [numInputsshowurl, setNumInputsshowurl] = useState(1);
const [numInputsshowtitle, setNumInputsshowtitle] = useState(1);


const handlePlusClick = () => {
    setNumInputs(numInputs + 1);
};

const handlePlusClickshowurl = () => {
    setNumInputsshowurl(numInputsshowurl + 1);
};

const handlePlusClickshowtitle = () => {
    setNumInputsshowtitle(numInputsshowtitle + 1);
};

const renderInputs = () => {
    const inputs = [];
    // const inputsshowurl = [];
    // const inputsshowtitle = [];


    for (let i = 1; i <= numInputs; i++) {
        const inputName = `imageshowUrl${i}`;
        // const inputNameshowurl = `showurl${i}`;
        // const inputNameshowtitle = `showtitle${i}`;


        inputs.push(
            <div className="Imageshow_url" key={i}>
                <label>{`Cast_Image_url ${i}:`}</label>
                <input
                    type="text"
                    name={inputName}
                    value={formData[inputName]}
                    onChange={(e) => handleChange(e, inputName)}
                />
                {i === numInputs && (
                    <span style={{ cursor: 'pointer' }} onClick={handlePlusClick} >
                        <i className="fa-solid fa-plus " style={{ fontSize: '16px', paddingLeft: '0.5rem', color: 'rgba(175, 171, 171, 0.911)' }}></i>
                    </span>
                )}
            </div>
        );
    }
    return inputs;
};

const renderInputsshowurl = () => {
    const inputsshowurl = [];


    for (let i = 1; i <= numInputsshowurl; i++) {
        // const inputName = `imageshowUrl${i}`;
        const inputNameshowurl = `showurl${i}`;
        // const inputNameshowtitle = `showtitle${i}`;


        inputsshowurl.push(
            <div className="Cast_url" key={i}>
                <label>{`Cast_url ${i}:`}</label>
                <input
                    type="text"
                    name={inputNameshowurl}
                    value={formData[inputNameshowurl]}
                    onChange={(e) => handleChange(e, inputNameshowurl)}
                />
                {i === numInputsshowurl && (
                    <span style={{ cursor: 'pointer' }} onClick={handlePlusClickshowurl}>
                        <i className="fa-solid fa-plus" style={{ fontSize: '16px', paddingLeft: '0.5rem', color: 'rgba(175, 171, 171, 0.911)' }}></i>
                    </span>
                )}
            </div>
        );
    }
    return inputsshowurl;
};

const renderInputsshowtitle = () => {
    const inputsshowtitle = [];


    for (let i = 1; i <= numInputsshowtitle; i++) {

        const inputNameshowtitle = `showtitle${i}`;


        inputsshowtitle.push(
            <div className="Showtitle" key={i}>
                <label>{`CastName ${i}:`}</label>
                <input
                    type="text"
                    name={inputNameshowtitle}
                    value={formData[inputNameshowtitle]}
                    onChange={(e) => handleChange(e, inputNameshowtitle)}
                />
                {i === numInputsshowtitle && (
                    <span style={{ cursor: 'pointer' }} onClick={handlePlusClickshowtitle}>
                        <i className="fa-solid fa-plus" style={{ fontSize: '16px', paddingLeft: '0.5rem', color: 'rgba(175, 171, 171, 0.911)' }}></i>
                    </span>
                )}
            </div>
        );
    }
    return inputsshowtitle;
};



const [numInputsep, setNumInputsep] = useState(1);
const handlePlusClickImagenews_url = () => {
    setNumInputsep(numInputsep + 1);
};
const renderInputsImagenews_url = () => {
    const inputsImagenews_url = [];


    for (let i = 1; i <= numInputsep; i++) {
        const inputNameimagenewsUrl = `ep${i}`;


        inputsImagenews_url.push(
            <div className="ep" key={i}>
                <label style={{color:"rgba(70, 247, 108, 0.932)"}}>{`Episode ${i}:`}</label>
                <input
                    type="text"
                    name={inputNameimagenewsUrl}
                    value={formData[inputNameimagenewsUrl]}
                    onChange={(e) => handleChange(e, inputNameimagenewsUrl)}
                />
                {i === numInputsep && (
                    <span style={{ cursor: 'pointer' }} onClick={handlePlusClickImagenews_url}>
                        <i className="fa-solid fa-plus" style={{ fontSize: '16px', paddingLeft: '0.5rem', color: 'rgba(175, 171, 171, 0.911)' }}></i>
                    </span>
                )}
            </div>
        );
    }
    return inputsImagenews_url;
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
            
           


            <h2 style={{marginTop:"2.5rem"}}>Create Drama Form</h2>

            <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">

              <a href="#" onClick={() => setSelectedOption('korean')}>Anime</a>
              <a href="#" onClick={() => setSelectedOption('chinese')}>Movie</a>
              {/* <a href="#" onClick={() => setSelectedOption('japan')}>Japanese</a>
              <a href="#" onClick={() => setSelectedOption('taiwan')}>Taiwanese</a>
              <a href="#" onClick={() => setSelectedOption('thailand')}>Thai</a>
              <a href="#" onClick={() => setSelectedOption('other')}>Other</a> */}
            </div>
          </div>

          <div className="genre-selection">
                    <div className="checkbox-container">
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Action')} onChange={() => handleGenreChange('Action')} />
                            Action
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Adventure')} onChange={() => handleGenreChange('Adventure')} />
                            Adventure
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Supernatural')} onChange={() => handleGenreChange('Supernatural')} />
                            Supernatural
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Fantasy')} onChange={() => handleGenreChange('Fantasy')} />
                            Fantasy
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Science')} onChange={() => handleGenreChange('Science')} />
                            Science Fiction
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Historical')} onChange={() => handleGenreChange('Historical')} />
                            Historical
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Comedy')} onChange={() => handleGenreChange('Comedy')} />
                            Comedy
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Drama')} onChange={() => handleGenreChange('Drama')} />
                            Drama
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Sport')} onChange={() => handleGenreChange('Sport')} />
                            Sport
                        </label>
                        <label>
                            <input type="checkbox" checked={formData.genres.includes('Mystery')} onChange={() => handleGenreChange('Mystery')} />
                            Mystery
                        </label>
                        {/* Add more genres as needed */}
                    </div>
                </div>

          <form onSubmit={handleSubmit}>
          {/* Inputs */}
          {selectedOption && (
            <div className="input-container">
              <label>{`Title ${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} URL:`}</label>
              <input 
                type="text" 
                name={`title_${selectedOption}_url`} 
                // value={formData[`title_${selectedOption}_url`]} 
                value={formData[`title_${selectedOption}_url`] ? formData[`title_${selectedOption}_url`].replace(/\b\w/g, (char) => char.toUpperCase()).replace(/\s+/g, '_') : ''}
                onChange={(e) => handleChange(e.target.name, e.target.value)} 
              />
            </div>
          )}


          {/* Common input */}
          <div className="input-container">
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </div>
          <div className="input-container">
            <label>Episode:</label>
            <input type="text" name="episode" value={formData.episode} onChange={(e) => handleChange(e.target.name, e.target.value)} />
          </div>
          <div className="input-container">
            <label>Image URL:</label>
            <input type="text" name="img" value={formData.img} onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="input-container">
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
                {/* Episode  */}

            <div className='new_title'>
                    {renderInputsImagenews_url()}
            </div>
                {/* Iamge_url  */}

                <div className='new_title'>
                    {renderInputsshowtitle()}
            </div>

                {/* Cast_url  */}
            <div className='new_title'>
                    {renderInputsshowurl()}
            </div>
            <div className='new_title'>
                    {renderInputs()}
            </div>
                {/* <!-- CastName --> */}
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
            <div className="buttons">
                <button type="submit" className="submit-button">Submit</button>
            </div > 
                </form>

            </div>
    </div>
  )
}

export default PostNewForm
