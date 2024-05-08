import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/PostCreationForm.css';
import { useParams } from 'react-router-dom';
import BoldToggle from './BoldToggle';


function PostCreationForm({ updatePosts  }) {
    const { pageId } = useParams(); // Get the pageId from the route parameter

    const [formData, setFormData] = useState({
        title: '',
        birthdate: '',
        nickname:'',
        country: '',
        imageUrl: '',
        name_url:'',
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
        url_pagecel: ''
    });
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/cel', formData);
    //         console.log('Response:', response.data);
    //         alert('Form data submitted successfully');
    //     } catch (error) {
    //         console.error('Error submitting form data:', error);
    //         alert('Failed to submit form data');
    //     }
    // };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'name_url') {
            const urlPage = `http://localhost:3000/Celebrities/${value}/1`;
            setFormData(prevState => ({ ...prevState, url_pagecel: urlPage }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            console.log('Form data:', formData); // Log the form data to check its content
    
            const response = await axios.post('http://localhost:5000/api/cel', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Response:', response.data); // Log the response data for debugging
    
            // Reset the form data after successful submission
            setFormData({
                title: '',
                birthdate: '',
                nickname:'',
                country: '',
                imageUrl: '',
                name_url:'',
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
                url_pagecel: '' // Reset url_page


            });

            const responsed = await axios.post('http://localhost:5000/generate-jsx', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Form data submitted successfully');
            // Add import statement to App.js
            const jsFileName = responsed.data.jsFileName;
            updateAppJs(jsFileName);
            updatePosts({
                title: response.data.title,
                imageUrl: response.data.imageUrl,
                name_url: response.data.name_url,

            });

            alert('Form data submitted successfully');
    
            // Fetch the updated news after submission
            fetchNews();
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

const fetchNews = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/cel');
        // Process the fetched news data as needed
    } catch (error) {
        console.error('Error fetching cel:', error);
        // Handle error if necessary
    }
};





    const updateAppJs = (jsFileName) => {
        axios.post('http://localhost:5000/update-app-js', { jsFileName }, {
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
                    <label>{`Imageshow_url ${i}:`}</label>
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
                <div className="Show_url" key={i}>
                    <label>{`Show_url ${i}:`}</label>
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
                    <label>{`Showtitle ${i}:`}</label>
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


    const [numInputsImagenews_url, setNumInputsImagenews_url] = useState(1);
    const [numInputsNews_url, setNumInputsNews_url] = useState(1);
    const [numInputsNew_title, setNumInputsNew_title] = useState(1);


    const handlePlusClickImagenews_url = () => {
        setNumInputsImagenews_url(numInputsImagenews_url + 1);
    };

    const handlePlusClickNews_url = () => {
        setNumInputsNews_url(numInputsNews_url + 1);
    };

    const handlePlusClicksNew_title = () => {
        setNumInputsNew_title(numInputsNew_title + 1);
    };


    const renderInputsImagenews_url = () => {
        const inputsImagenews_url = [];


        for (let i = 1; i <= numInputsImagenews_url; i++) {
            const inputNameimagenewsUrl = `imagenewsUrl${i}`;


            inputsImagenews_url.push(
                <div className="Imagenews_url" key={i}>
                    <label style={{color:"rgba(70, 247, 108, 0.932)"}}>{`Imagenews_url ${i}:`}</label>
                    <input
                        type="text"
                        name={inputNameimagenewsUrl}
                        value={formData[inputNameimagenewsUrl]}
                        onChange={(e) => handleChange(e, inputNameimagenewsUrl)}
                    />
                    {i === numInputsImagenews_url && (
                        <span style={{ cursor: 'pointer' }} onClick={handlePlusClickImagenews_url}>
                            <i className="fa-solid fa-plus" style={{ fontSize: '16px', paddingLeft: '0.5rem', color: 'rgba(175, 171, 171, 0.911)' }}></i>
                        </span>
                    )}
                </div>
            );
        }
        return inputsImagenews_url;
    };

    const renderInputsNews_url = () => {
        const inputsshowurlNews_url = [];
        // const inputsshowtitle = [];


        for (let i = 1; i <= numInputsNews_url; i++) {
            const inputNameNews_url = `newsurl${i}`;
            // const inputNameshowurl = `showurl${i}`;
            // const inputNameshowtitle = `showtitle${i}`;


            inputsshowurlNews_url.push(
                <div className="News_url" key={i}>
                    <label style={{color:"rgba(70, 247, 108, 0.932)"}}>{`News_url ${i}:`}</label>
                    <input
                        type="text"
                        name={inputNameNews_url}
                        value={formData[inputNameNews_url]}
                        onChange={(e) => handleChange(e, inputNameNews_url)}
                    />
                    {i === numInputsNews_url && (
                        <span style={{ cursor: 'pointer' }} onClick={handlePlusClickNews_url}>
                            <i className="fa-solid fa-plus" style={{ fontSize: '16px', paddingLeft: '0.5rem', color: 'rgba(175, 171, 171, 0.911)' }}></i>
                        </span>
                    )}
                </div>
            );
        }
        return inputsshowurlNews_url;
    };

    const renderInputsNew_title = () => {
        const inputsshowtitleNew_title = [];
        for (let i = 1; i <= numInputsNew_title; i++) {
            const inputNameshowtitleNew_title = `newstitle${i}`;

            inputsshowtitleNew_title.push(
                <div className="New_title" key={i}>
                    <label style={{color:"rgba(70, 247, 108, 0.932)"}}>{`New_title ${i}:`}</label>
                    <input
                        type="text"
                        name={inputNameshowtitleNew_title}
                        value={formData[inputNameshowtitleNew_title]}
                        onChange={(e) => handleChange(e, inputNameshowtitleNew_title)}
                    />
                    {i === numInputsNew_title && (
                        <span style={{ cursor: 'pointer' }} onClick={handlePlusClicksNew_title}>
                            <i className="fa-solid fa-plus" style={{ fontSize: '16px', paddingLeft: '0.5rem', color: 'rgba(175, 171, 171, 0.911)' }}></i>
                        </span>
                    )}
                </div>
            );
        }
        return inputsshowtitleNew_title;
    };


    return (
        <div className='Header'>
            <div className='border-all'>
            
            <form onSubmit={handleSubmit}>
            <h2>Create Celebrities Profiles</h2>
                <div className="input-container">
                    <label>Name_url:</label>
                    <input type="text" name="name_url" value={formData.name_url.replace(/\b\w/g, (char) => char.toUpperCase()).replace(/\s+/g, '_') } onChange={handleChange} />
                </div>
                <div className="input-container">
                    <label>Name:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>

                <div className="input-container">
                    <label>Nickname:</label>
                    <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
                </div>

                <div className="input-container">
                    <label>Birthdate:</label>
                    <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                </div>

                <div className="input-container">
                    <label>Country:</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} />
                </div>

                <div className="input-container">
                    <label>Image URL:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                
                </div>

                {/* Imageshow_url */}
                <div className='new_title'>
                    {renderInputs()}
                </div>

                {/* Show_url  */}
                <div className='new_title'>
                    {renderInputsshowurl()}
                </div>

                {/* <!-- Show_title --> */}
                <div className='new_title'>
                    {renderInputsshowtitle()}
                </div>
                
                {/* <!-- Imagenews_url --> */}
                <div className='new_title'>
                    {renderInputsImagenews_url()}
                </div>

                {/* <!-- News_url --> */}
                <div className='new_title'>
                    {renderInputsNews_url()}
                </div>
                
                {/* <!-- New_title --> */}
                <div className='new_title'>
                    {renderInputsNew_title()}
                </div>

                <div className="Describle">
                    <label>Describle:</label>
                    <textarea name="describle" value={formData.describle} onChange={handleChange} />
                </div>

                <div className="input-container">
                    <label>Zodiac:</label>
                    <input type="text" name="libra" value={formData.libra} onChange={handleChange} />
                </div>
                <div className="input-container">
                    <label>Tall:</label>
                    <input type="text" name="tall" value={formData.tall} onChange={handleChange} />
                </div>

                <div className="input-container">
                    <label>Nationality:</label>
                    <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
                </div>
                <div className="input-container">
                    <label>Instagram_url:</label>
                    <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
                </div>
                <div className="input-container">
                    <label>Name_instagram:</label>
                    <input type="text" name="nameinstagram" value={formData.nameinstagram} onChange={handleChange} />
                </div>
                <div className="input-container">
                    <label>Youtube_url:</label>
                    <input type="text" name="youtube" value={formData.youtube} onChange={handleChange} />
                </div>
                <div className="input-container">
                    <label>Name_youtube:</label>
                    <input type="text" name="nameyoutube" value={formData.nameyoutube} onChange={handleChange} />
                </div >
                <div className="buttons">
                    <button type="submit" className="submit-button">Submit</button>
                </div >
            </form>
            </div>
        </div>
    );
}

export default PostCreationForm;
