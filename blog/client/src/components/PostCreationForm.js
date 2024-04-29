import React, { useState } from 'react';
import axios from 'axios';

function PostCreationForm() {
    const [formData, setFormData] = useState({
        name: '',
        birthdate: '',
        nickname:'',
        country: '',
        imageUrl: '' // Assuming imageUrl is the key for the image URL
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to the server
            const response = await axios.post('http://localhost:5000/generate-jsx', formData, {
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
        <div>
            <h2>Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Nickname:</label>
                    <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
                </div>
                <div>
                    <label>Birthdate:</label>
                    <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                </div>
                <div>
                    <label>Country:</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PostCreationForm;
