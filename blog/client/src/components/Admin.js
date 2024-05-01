import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const response = await axios.get('/news');
            setNewsList(response.data);
        } catch (error) {
            console.error('Error loading news:', error);
        }
    };

    const createNewsPost = async () => {
        try {
            await axios.post('/news', { title, content });
            setTitle('');
            setContent('');
            loadNews();
        } catch (error) {
            console.error('Error creating news post:', error);
        }
    };

    const editNewsPost = async (id, newTitle, newContent) => {
        try {
            await axios.put(`/news/${id}`, { title: newTitle, content: newContent });
            loadNews();
        } catch (error) {
            console.error('Error editing news post:', error);
        }
    };

    const deleteNewsPost = async (id) => {
        try {
            await axios.delete(`/news/${id}`);
            loadNews();
        } catch (error) {
            console.error('Error deleting news post:', error);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="content">Content:</label>
                <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <button onClick={createNewsPost}>Create News Post</button>
            <ul>
                {newsList.map(news => (
                    <li key={news._id}>
                        {news.title} - {news.content} 
                        <button onClick={() => editNewsPost(news._id, prompt('Enter new title:'), prompt('Enter new content:'))}>Edit</button> 
                        <button onClick={() => deleteNewsPost(news._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
