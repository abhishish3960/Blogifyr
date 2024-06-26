import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost} from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import './blog.css';

const Blog = () => {
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTheme = useSelector(state => state.theme);
  
  const [expandedPosts, setExpandedPosts] = useState([]);

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(postId));
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const toggleExpanded = (postId) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter(id => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
    }
  };

  

  return (
    <div className={`blog-container ${currentTheme === 'dark' ? 'dark-theme' : ''}`}>
    
      <h2 className="blog-heading">Blog Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="blog-post">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-description">{post.description}</p>
          <div className={`post-body ${expandedPosts.includes(post.id) ? 'expanded' : ''}`}>
            <div dangerouslySetInnerHTML={{ __html: expandedPosts.includes(post.id) ? post.content : post.content.slice(0, 200) + '...' }}></div>
          </div>
          <div className="button-container">
            {post.content.length > 200 && (
              <button className="read-more-button edit-button" onClick={() => toggleExpanded(post.id)}>
                {expandedPosts.includes(post.id) ? 'Read Less' : 'Read More'}
              </button>
            )}
            <button className="edit-button" onClick={() => handleEdit(post.id)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
