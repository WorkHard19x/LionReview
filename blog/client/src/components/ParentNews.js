import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Test_3 from './Test_3'; // Import the Test_3 component
import Test_11 from './Test_11'; // Import the Test_3 component

import PostNewForm from './PostNewForm'; // Import the PostNewForm component

function ParentNews() {
    const { pageId } = useParams(); // Get the pageId from the route parameter
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news');
            console.log('Response:', response.data); // Log the response data
            const reversedPosts = response.data.reverse(); // Reverse the array of posts
            setPosts(reversedPosts);
            setError(null); // Reset error state if request is successful
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Error fetching posts. Please try again.'); // Set error message
        }
    };

    // Function to update posts state
    const updatePosts = (newPost) => {
        // Extract required information from the new post
        const { title, imageUrlnews, url_page } = newPost;
        // Update the posts state with the new post using the functional form of setState
        setPosts(prevPosts => [{ title, imageUrlnews, url_page }, ...prevPosts]);
    };
    

    return (
        <div>
            <PostNewForm updatePosts={updatePosts} /> {/* Render the PostNewForm component */}
            {error && <div>Error: {error}</div>}
            {posts.length === 0 && !error && <div>No posts available</div>}
            {posts.length > 0 && <Test_3 posts={posts.reverse()} />}
            {posts.length > 0 && <Test_11 posts={posts.reverse()} />}

        </div>
    );
}

export default ParentNews;
