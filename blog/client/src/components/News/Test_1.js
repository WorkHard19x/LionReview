
                import React, { useState, useEffect } from 'react';
                import axios from 'axios';
                import { useParams } from 'react-router-dom';

                import Editable from '../Editable';
                import '../../styles/News.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function Test_1() {
                    const { pageId } = useParams(); // Get the pageId from the route parameter

                    const [comments, setComments] = useState([]);
                    const [newComment, setNewComment] = useState('');

                    useEffect(() => {
                        fetchComments();
                    }, [pageId]);

                    const fetchComments = async () => {
                        try {
                            const response = await axios.get(`${API_BASE_URL}/api/comments/${pageId}`);
                            setComments(response.data.comments.reverse()); // Reverse the comments array
                        } catch (error) {
                            console.error('Error fetching comments:', error);
                        }
                    };

                    const handleCommentSubmit = async (e) => {
                        e.preventDefault(); // Prevent form submission default behavior
                        try {
                            const response = await axios.post(`${API_BASE_URL}/api/comments/${pageId}`, {
                                text: newComment
                            });
                            console.log('Comment submitted:', response.data);
                            setNewComment('');
                            fetchComments(); // Fetch updated comments after submission
                        }catch (error) {
                            console.error('Error submitting comment:', error);
                        }
                    };

                    const [news, setNews] = useState([]);

                    useEffect(() => {
                        fetchNews();
                    }, []);

                    const fetchNews = async () => {
                        try {
                            const response = await axios.get('${API_BASE_URL}/api/news'); // Update with your backend URL
                            setNews(response.data);
                        } catch (error) {
                            console.error('Error fetching news:', error);
                        }
                    };

                    const [summarytext, setName] = useState(localStorage.getItem(window.location.href + '-summarytext') ||
                      
                     
                    `
                    
                        
                    
                `);

                    useEffect(() => {
                        localStorage.setItem(window.location.href + '-summarytext', summarytext);
                    }, [summarytext]); // Run this effect whenever the name changes

                    const handleNameChange = (newName) => {
                        setName(newName);
                    };
                    const [fulldetail, setNamefulldetail] = useState(localStorage.getItem(window.location.href + '-fulldetail') || 
                    `
                    
                        
                    
                `);
                   

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
                    const [posts, setPosts] = useState([]);
                    const [error, setError] = useState(null);

                    useEffect(() => {
                        fetchPosts();
                    }, [pageId]);

                    const fetchPosts = async () => {
                        try {
                            const response = await axios.get(`${API_BASE_URL}/api/news`);      
                            console.log('Response:', response.data); // Log the response data        
                            setPosts(response.data);
                            setError(null); // Reset error state if request is successful
                        } catch (error) {
                            console.error('Error fetching posts:', error);
                            setError('Error fetching posts. Please try again.'); // Set error message
                        }
                    };
                        const [user, setUser] = useState({
                        name: '', // Initialize name as empty string
                        email: '',
                        is_admin: false,

                        // Add more fields as needed
                      });

                      // Define fetchUserData function
                      const fetchUserData = async () => {
                        try {
                          const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');

                        const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');

                        if (!loggedInUserEmail || !sessionToken) {
                          setUser(null);
                          console.log('User not logged in. Clearing user state.');
                          return;
                        }


                          const response = await fetch(`${API_BASE_URL}/login?email=${loggedInUserEmail}`, {
                            method: 'GET',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${sessionToken}`
                            },
                          });

                          if (response.ok) {
                            const userDataArray = await response.json();
                            const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                            if (loggedInUser) {
                              setUser(loggedInUser);
                              console.log('User data:', loggedInUser);
                            } else {
                              console.error('Logged-in user not found in response');
                              setUser(null); // Reset user state if user not found
                            }
                          } else {
                            console.error('Failed to fetch user data');
                            setUser(null); // Reset user state if fetch failed
                          }
                        } catch (error) {
                          console.error('Error occurred while fetching user data:', error);
                          setUser(null);
                        }
                      };


                      useEffect(() => {
                        fetchUserData();
                      }, []);


                    if (error) {
                        return <div>Error: {error}</div>;
                    }

                    if (!posts || !posts.length) {
                        return <div>No posts available</div>;
                    }

                return (
                    <div className='News'>
                    <div className='News-header'>
                        <div className='news-center'>
                        <div className="news-main-post">
                            <div className="news-tittle">
                                <h1>Test_1</h1>
                            </div>
                            <div className="news-author">
                                <p>Leo Doan</p>
                                <p>2024-05-09</p>
                            </div>
            <div className="news-image">
                <img src="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp" alt="" style={{height:'450px', width:'500px'}} />
                <br/><span >Leo DN</span>
            </div>
            <div className="news-summary">
                <p style={{fontWeight: 'bold', fontSize:'19px'}}>Summary: </p> 
                {user && user.is_admin ? (
                 <p><Editable initialValue={summarytext} onSave={handleNameChange} /></p>
                ) : (
                 <p>{summarytext}</p>
                )}

            </div>
            <div className="news-ads">
                {/* -ADS */}
            </div>

            <div className="news-details">
            <p style={{fontWeight: 'bold', fontSize:'19px'}}>Full Details: </p>
                {user && user.is_admin ? (
                     <p><Editable initialValue={fulldetail} onSave={handleNameChangefulldetail} /></p>
                ) : (
                    // Render non-editable version for regular users
                    <p>{fulldetail}</p>
                )}
            </div>
            <div className="news-provide">
                <p>Provided by: <a href="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp"> Link </a> </p>
            </div>
        </div>
        <div className="new-side">

            <div className="news-top-pick">
                    {posts.slice().reverse().map((post, index) => (
                        <div key={index} className='news-top-side-img'>
                            <div className="image-container-new">
                                <img src={post.imageUrlnews} alt={post.title} style={{ height: '150px', width: '125px', borderRadius: '10px' }}/>
                            </div>
                            <div className="text-container">
                                <p>{post.title}</p>
                                <a href={post.url_page}>Read more</a>
                            </div>
                        </div>
                    ))}

                {/* <div className='news-top-side-img' >
                    <img src="https://as2.ftcdn.net/v2/jpg/03/53/74/91/1000_F_353749142_LZnJlgaPH7DUJZnZfwpr8bzwTIWzQGzc.jpg"
                    alt="news-top-pick"
                    style={{ height: '125px', width: '125px', borderRadius: '10px' }} />
                </div>
                <span className='news-top-pick-tittle'>Love you title</span>  */}
             </div>
                {/* NEWS-SIDE-ADS */}
            <div className="news-side-ads">
            <p>love you</p>
            </div>

            <div className="news-comment">
                {comments.map((comment, index) => (
                    <div key={index} className="text-comment">
                        <div className="text-comment-user">
                            <img src="https://pics.craiyon.com/2023-10-09/586a631238574c7ead38a04260976ce8.webp" alt="User" style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                           {user && (
                                <span>{comment.user_name}</span> 
                            )}
                        </div>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
            <div className="news-enter-comment">
                {user && (
                <form onSubmit={handleCommentSubmit}>
                    <input
                    type="text"
                    name="inputcomment"
                    placeholder="Enter your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    />
                </form>
                )}
            </div>
        </div>
        </div>
    </div>
</div>
                );
            };
                
            export default Test_1;
            