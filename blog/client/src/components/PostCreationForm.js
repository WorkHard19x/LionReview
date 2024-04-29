import React, { useState } from 'react';
import axios from 'axios';

function PostCreationForm() {
    const [formData, setFormData] = useState({
        name: '',
        birthdate: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to the server
            await axios.post('http://localhost:5000/generate-jsx', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Form data submitted successfully');
        } catch (error) {
            console.log('Error submitting form data:', error);
            alert('Failed to submit form data');
        }
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
                    <label>Birthdate:</label>
                    <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                </div>
                <div>
                    <label>Country:</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PostCreationForm;
