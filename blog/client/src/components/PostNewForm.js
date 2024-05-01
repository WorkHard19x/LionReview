import axios from 'axios';
import React, { useState, useRef } from 'react';
import BoldToggle from './BoldToggle';
import '../styles/PostCreationForm.css';


function PostNewForm() {
    const summaryTextareaRef = useRef(null);
    const fulldetailTextareaRef = useRef(null);
    const [formData, setFormData] = useState({
        title:'',
        author: '',
        date: '',
        imageUrlnews: '',
        imageUrltitle:'',
        summarytext:'',
        fulldetail:'',
        provided:'',
    });
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
// };


const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Send form data to the server
        const response = await axios.post('http://localhost:5000/news-jsx', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        alert('Form data submitted successfully');
        // Add import statement to App.js
        const jsFileName = response.data.jsFileName;
        updateAppJs(jsFileName);
    } catch (error) {
        console.log('Error submitting form data:', error);
        alert('Failed to submit form data');
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
  return (
      <div className='Header'>
            <div className='border-all'>
            
            <form onSubmit={handleSubmit}>


            <h2>Create News Form</h2>
               
                <div className="input-container">
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className="input-container">
                    <label>Author:</label>
                    <input type="text" name="author" value={formData.author} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className="input-container">
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className="input-container">
                    <label>Image URL:</label>
                    <input type="text" name="imageUrlnews" value={formData.imageUrlnews} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className="input-container">
                    <label>Image Title:</label>
                    <input type="text" name="imageUrltitle" value={formData.imageUrltitle} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>


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
                    <BoldToggle type="color" textareaRef={fulldetailTextareaRef} />
                    <BoldToggle type="link" textareaRef={fulldetailTextareaRef} />
                    <BoldToggle type="img" textareaRef={fulldetailTextareaRef} />
                </span>
            </div>

                <div className="input-container">
                    <label>Provided:</label>
                    <input type="text" name="provided" value={formData.provided} onChange={(e) => handleChange(e.target.name, e.target.value)} />
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
