
                import React, { useState, useEffect } from 'react';
                import axios from 'axios';
                import { useParams } from 'react-router-dom';

                import Editable from '../Editable';
                import '../../styles/News.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function Test_3() {
                    const { pageId } = useParams(); // Get the pageId from the route parameter

                    const [comments, setComments] = useState([]);
                    const [newComment, setNewComment] = useState('');

                    useEffect(() => {
                        fetchComments();
                    }, [pageId]);

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
                            const response = await axios.get('http://localhost:5000/api/news'); // Update with your backend URL
                            setNews(response.data);
                        } catch (error) {
                            console.error('Error fetching news:', error);
                        }
                    };

                    const [summarytext, setName] = useState(localStorage.getItem(window.location.href + '-summarytext') ||
                      
                     
                    `
                    {
                        The former Trump spokeswoman testified about his 2016 campaign’s damage-control efforts after the infamous “Access Hollywood” tape, in which the candidate spoke of groping women, became public. Prosecutors say it made Mr. Trump’s aides more eager to quash damaging stories, like Stormy Daniels’s account of an affair.
                    }
                `);

                    useEffect(() => {
                        localStorage.setItem(window.location.href + '-summarytext', summarytext);
                    }, [summarytext]); // Run this effect whenever the name changes

                    const handleNameChange = (newName) => {
                        setName(newName);
                    };
                    const [fulldetail, setNamefulldetail] = useState(localStorage.getItem(window.location.href + '-fulldetail') || 
                    `
                    {
                        The former Trump spokeswoman testified about his 2016 campaign’s damage-control efforts after the infamous “Access Hollywood” tape, in which the candidate spoke of groping women, became public. Prosecutors say it made Mr. Trump’s aides more eager to quash damaging stories, like Stormy Daniels’s account of an affair.
                    }
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
                            const response = await axios.get(`http://localhost:5000/api/news`);
                            console.log('Response:', response.data); // Log the response data
                            setPosts(response.data);
                            setError(null); // Reset error state if request is successful
                        } catch (error) {
                            console.error('Error fetching posts:', error);
                            setError('Error fetching posts. Please try again.'); // Set error message
                        }
                    };
                
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
                                        <h1>Leo Doan</h1>
                                    </div>
                                    <div className="news-author">
                                        <p>Leo Doan</p>
                                        <p>2024-05-03</p>
                                    </div>
                    <div className="news-image">
                        <img src="https://t3.ftcdn.net/jpg/06/48/50/58/360_F_648505884_bxioT9qrfODG4SbRZgHvBOLGesjsIa1j.jpg" alt="" style={{height:'450px', width:'500px'}} />
                        <br/><span >Leo DN</span>
                    </div>
                    <div className="news-summary">
                        <p style={{fontWeight: 'bold', fontSize:'19px'}}>Summary: </p> 
                        {/*<p>{summarytext}</p>*/}
                        {isAdmin && <p><Editable initialValue={summarytext} onSave={handleNameChange} /></p>}
                        {!isAdmin && <p>{summarytext}</p>}

                    </div>
                    <div className="news-ads">
                        <h1>Love</h1>
                    </div>
                    
                    <div className="news-details">
                    <p style={{fontWeight: 'bold', fontSize:'19px'}}>Full Details: </p> 
                        {/* <p>  {fulldetail}</p> */}
                    {isAdmin && <p><Editable initialValue={fulldetail} onSave={handleNameChangefulldetail} /></p>}
                    {!isAdmin && <p>{fulldetail}</p>}
                    </div>
                    <div className="news-provide">
                        <p>Provided by: <a href="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp"> Link </a> </p>
                    </div>
                </div>
                <div className="new-side">
                    
                    <div className="news-top-pick">
                            {posts.map((post, index) => (
                                <div key={index} className='news-top-side-img'>
                                    <div className="image-container">
                                        <img src={post.imageUrlnews} alt={post.title} 
                                        style={{ height: '125px', width: '125px', borderRadius: '10px' }}/>
                                    </div>
                                    <div className="text-container">
                                        <p>{post.title}</p>
                                        <p>{post.summarytext}</p>
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
        </div>

                );
            };
                
            export default Test_3;
            