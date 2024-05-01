import React, { useState, useEffect } from 'react';
import '../styles/News.css';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';

function News({ pageId }) {

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
                        <p>love you</p>
                    </div>
                    <div className="news-image">
                        <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTHF5pXo_PEKEMIAdffx-uW2bg85E3qJaTRMlRyid12NW14r4lk" alt="" style={{height:'450px', width:'500px'}} />
                        <br/><span >Love you</span>
                    </div>
                    <div className="news-summary">
                        <p style={{fontWeight: 'bold', fontSize:'19px'}}>Summary: </p> 
                        <p>With this setup, regardless of the original dimensions of the images, they will be scaled to fill the .news-image container while maintaining their aspect ratio. The object-fit: cover; property ensures that the entire container is covered by the image, and any excess is cropped as needed. Adjust the border-radius value as desired to apply rounded corners to the images.</p>
                    </div>
                    <div className="news-ads">
                        <h1>Love</h1>
                    </div>
                    
                    <div className="news-details">
                    <p style={{fontWeight: 'bold', fontSize:'19px'}}>Full Details: </p> 
                    <p>With this setup, regardless of the original dimensions of the images, they will be scaled to fill the .news-image container while maintaining their aspect ratio. The object-fit: cover; property ensures that the entire container is covered by the image, and any excess is cropped as needed. Adjust the border-radius value as desired to apply rounded corners to the images.</p>
                    </div>
                    <div className="news-provide">
                        <a href=""><p>Provided by: </p></a>
                    </div>
                </div>
                <div className="new-side">
                    <div className="news-top-pick">
                        {/* {news.map((post, index) => (
                        <div key={index} className="news-post">
                            <div className='news-top-side-img'>
                                <img src={post.imageUrl} alt={post.title} style={{ height: '125px', width: '125px', borderRadius: '10px' }} />
                            </div>
                            <span className='news-top-pick-tittle'>{post.title}</span>
                        </div>
                        ))}
                    </div> */}

                        <div className='news-top-side-img' >
                            <img src="https://as2.ftcdn.net/v2/jpg/03/53/74/91/1000_F_353749142_LZnJlgaPH7DUJZnZfwpr8bzwTIWzQGzc.jpg" 
                            alt="news-top-pick" 
                            style={{ height: '125px', width: '125px', borderRadius: '10px' }} />
                        </div>
                        <span className='news-top-pick-tittle'>Love you title</span> 
                     </div>
                        {/* NEWS-SIDE-ADS */}
                    <div className="news-side-ads">
                    <p>love you</p>
                    </div>

                    <div className="news-comment">
                        <span>Comment</span>
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
