import React, { useState, useEffect } from 'react';
import '../../styles/News.css';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import Editable from '../Editable';

function News({ pageId }) {

    const createPost = async (postData) => {
        try {
            // Make POST request to create a new post
            await axios.post('http://localhost:5000/api/news', postData); // Adjust URL as needed
    
            // After successful creation, fetch updated list of news posts in News.js
            // This will trigger a re-render and display the latest releases
            // Fetching news posts can be done using a useEffect hook in News.js
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/comments/${pageId}`);
            setComments(response.data.comments.reverse()); // Reverse the comments array
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        try {
            const response = await axios.post(`http://localhost:5000/api/comments/${pageId}`, {
                text: newComment
            });
            console.log('Comment submitted:', response.data);
            setNewComment('');
            fetchComments(); // Fetch updated comments after submission
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news'); // Update with your backend URL
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };


        const [summarytext, setName] = useState(localStorage.getItem(window.location.href + '-summarytext') || 'summarytext');

        useEffect(() => {
            localStorage.setItem(window.location.href + '-summarytext', summarytext);
        }, [summarytext]); // Run this effect whenever the name changes

        const handleNameChange = (newName) => {
            setName(newName);
        };
        const [fulldetail, setNamefulldetail] = useState(localStorage.getItem(window.location.href + '-fulldetail') || 'fulldetail');

        useEffect(() => {
            localStorage.setItem(window.location.href + '-fulldetail', fulldetail);
        }, [fulldetail]); // Run this effect whenever the name changes

        const handleNameChangefulldetail = (newNamed) => {
            setNamefulldetail(newNamed);
        };
        const [isAdmin, setIsAdmin] = useState(false);
                        
        // Effect to check if user is admin
        useEffect(() => {
            // Logic to check if user is admin
            // For example, you might check if the user is logged in and has admin privileges
            const userIsAdmin = checkIfUserIsAdmin(); // You need to implement this function
            setIsAdmin(userIsAdmin);
        }, []);

        // Effect to save the name to localStorage whenever it changes
        

        // Function to check if user is admin (you need to implement this)
        const checkIfUserIsAdmin = () => {
            // Logic to determine if user is admin
            // For example, you might check if the user is logged in and has admin privileges
            // Return true if user is admin, false otherwise
            const isLoggedIn = true; // Example: You would replace this with your actual authentication logic
            const isAdmin = true; // Example: You would replace this with your actual admin check logic
            return isLoggedIn && isAdmin;
        };

  return (
    <div className='News'>
            <div className='News-header'>
                <div className="news-main-post">
                    <div className="news-tittle">
                        <h1>Tittle</h1>
                    </div>
                    <div className="news-author">
                        <p>Auther</p>
                        <p>date</p>
                        <p style={{color:"red"}}>love you</p>
                    </div>
                    <div className="news-image">
                        <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTHF5pXo_PEKEMIAdffx-uW2bg85E3qJaTRMlRyid12NW14r4lk" alt="" style={{height:'450px', width:'500px'}} />
                        <br/><span >Love you</span>
                    </div>
                    <div className="news-summary">
                        <p style={{fontWeight: 'bold', fontSize:'19px'}}>Summary: </p> 
                        {/* <p>With this setup, regardless of the original dimensions of the images, they will be scaled to fill the .news-image container while maintaining their aspect ratio. The object-fit: cover; property ensures that the entire container is covered by the image, and any excess is cropped as needed. Adjust the border-radius value as desired to apply rounded corners to the images.</p> */}

                        {isAdmin && <p><Editable initialValue={summarytext} onSave={handleNameChange} /></p>}
                        {!isAdmin && <p>{summarytext}</p>}
                    </div>
                    <div className="news-ads">
                        <h1>Love</h1>
                    </div>
                    
                    <div className="news-details">
                    <p style={{fontWeight: 'bold', fontSize:'19px'}}>Full Details: </p> 
                    {/* <p>With this setup, regardless of the original dimensions of the images, they will be scaled to fill the .news-image container while maintaining their aspect ratio. The object-fit: cover; property ensures that the entire container is covered by the image, and any excess is cropped as needed. Adjust the border-radius value as desired to apply rounded corners to the images.</p> */}
                    {isAdmin && <p><Editable initialValue={fulldetail} onSave={handleNameChangefulldetail} /></p>}
                        {!isAdmin && <p>{fulldetail}</p>}
                    
                    </div>
                    <div className="news-provide">
                        <a href=""><p>Provided</p></a>
                    </div>
                </div>
                <div className="new-side">
                    <div className="news-top-pick">
                    {news.map((post, index) => (
                        <div key={index} className="news-post">
                            <div className='news-top-side-img'>
                                <img src={post.imageUrl} alt={post.title} style={{ height: '125px', width: '125px', borderRadius: '10px' }} />
                            </div>
                            <span className='news-top-pick-tittle'>{post.title}</span>
                        </div>
                    ))}
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        {/* <div className='news-top-side-img' >
                            <img src="https://as2.ftcdn.net/v2/jpg/03/53/74/91/1000_F_353749142_LZnJlgaPH7DUJZnZfwpr8bzwTIWzQGzc.jpg" 
                            alt="news-top-pick" 
                            style={{ height: '125px', width: '125px', borderRadius: '10px' }} />
                        </div>
                        <span className='news-top-pick-tittle'>Love you title</span> */}
                    </div>
                        {/* NEWS-SIDE-ADS */}
                    <div className="news-side-ads">
                    <p>love you</p>
                    </div>

                    <div className="news-comment">
                        {comments.map((comment, index) => (
                            <div key={index} className="text-comment">
                                <div className="text-comment-user">
                                    <img src="https://as2.ftcdn.net/v2/jpg/03/53/74/91/1000_F_353749142_LZnJlgaPH7DUJZnZfwpr8bzwTIWzQGzc.jpg" alt="User" style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                                    <span>User</span>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="news-enter-comment">
                        <form onSubmit={handleCommentSubmit}>
                            <input
                                type="text"
                                name="inputcomment"
                                placeholder="Enter your comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </form>
                    </div>
                
                
                </div>
                
                

            </div>

    </div>
  )
}

export default News
