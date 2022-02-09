import React, { useEffect, useState } from 'react';
import './PostView.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const PostView = () => {
  const { postId } = useParams();
  const { user, isAuthenticated } = useAuth0();
  const [post, setPost] = useState([]);
  const [userId, setUserId] = useState(0);
  const [textHeight, setTextHeight] = useState(35);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [error, setError] = useState(null);
  const [viewCount, setViewCount] = useState(3);
  const { REACT_APP_API_BASE_URL = 'http://localhost:5001' } = process.env;

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_BASE_URL}/posts/${postId}`)
      .then((res) => setPost(res.data.data))
      .catch(setError);
    if (user) {
      axios
        .get(`${REACT_APP_API_BASE_URL}/users/${user.email}`)
        .then((response) => setUserId(response.data.data.id))
        .catch(setError);
    }
  }, [postId, REACT_APP_API_BASE_URL, user]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_BASE_URL}/posts/${postId}/comments`)
      .then((res) => setComments(res.data.data))
      .catch(setError);
  }, [REACT_APP_API_BASE_URL, postId, comments, commentCount]);

  useEffect(() => {
    document.getElementById('commentInput').style.height = `${textHeight}px`;
    if (!comment.length) setTextHeight(35);
  }, [textHeight, comment]);

  const onChange = (e) => {
    const commentInput = document.getElementById('commentInput');
    setTextHeight(commentInput.scrollHeight);
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(`${REACT_APP_API_BASE_URL}/posts/${postId}/comments`, {
        data: {
          user_id: userId,
          post_id: postId,
          comment_content: comment,
        },
      });
      setComment('');
      setCommentCount(commentCount + 1);
      setViewCount(comments.length + 1);
    } catch (error) {
      setError(error);
    }
  };

  const deleteComment = (commentId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this comment? This cannot be undone.'
      )
    ) {
      try {
        axios
          .delete(
            `${REACT_APP_API_BASE_URL}/posts/${postId}/comments/${commentId}`
          )
          .then(() => setCommentCount(commentCount - 1));
      } catch (error) {
        setError(error);
      }
    }
  };

  const increaseCount = () => setViewCount(viewCount + 3);

  return (
    <div className='postSection'>
      <h1>View Post</h1>
      <div className='postContainer'>
        <div className='postClicked'>
          <div className='postTitle'>
            <h2>{post.post_title}</h2>
          </div>
          <div className='postContent'>
            <p style={{ whiteSpace: 'pre-line' }}>{post.post_content}</p>
          </div>
          <div className='commentsSection'>
            {error &&
              error.message !== 'Request failed with status code 500' && (
                <p className='errorMsg my'>{error.message}</p>
              )}
            <form className='commentBar' onSubmit={handleSubmit}>
              <textarea
                onChange={onChange}
                value={comment}
                id='commentInput'
                type='text'
                placeholder='Add a comment...'
                rows='1'
              />
              <button
                type={isAuthenticated ? 'submit' : 'button'}
                className='commentBtn'
                onClick={
                  !isAuthenticated &&
                  function () {
                    alert('You must be logged in to comment.');
                  }
                }
              >
                <p className='commentSubmit'>
                  <i className='far fa-comment'></i>
                  Send
                </p>
              </button>
            </form>
            <div className='listComments'>
              <p className='commentHeader'>Comments</p>
              {comments.length ? (
                comments.map(
                  (com, index) =>
                    index < viewCount && (
                      <div key={com.comment_id} className='comment'>
                        <p className='commentName'>{com.email}</p>
                        <p
                          style={{ whiteSpace: 'pre-line' }}
                          className='commentContent'
                        >
                          {com.comment_content}
                        </p>
                        {userId === com.user_id && (
                          <button
                            className='deleteCommentBtn'
                            onClick={() => deleteComment(com.comment_id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    )
                )
              ) : (
                <p className='noComments'>No comments for this post</p>
              )}
              {viewCount < comments.length && viewCount !== comments.length && (
                <button onClick={increaseCount} className='commentCountBtn'>
                  View More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
