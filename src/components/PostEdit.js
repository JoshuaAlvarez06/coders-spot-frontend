import React, { useState } from 'react';
import './PostEdit.css';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PostEdit = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const { REACT_APP_API_BASE_URL } = process.env;
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = React.useState(0);
  const { postId } = useParams();
  const [post, setPost] = React.useState([]);
  const [postFormData, setPostFormData] = React.useState({
    post_title: '',
    post_content: '',
  });

  React.useEffect(() => {
    if (user && isAuthenticated) {
      axios
        .get(`${REACT_APP_API_BASE_URL}/users/${user.email}`)
        .then((response) => setUserId(response.data.data.id));
    }
  }, [user, isAuthenticated, userId, REACT_APP_API_BASE_URL]);

  React.useEffect(() => {
    const { REACT_APP_API_BASE_URL = 'http://localhost:5001' } = process.env;
    axios
      .get(`${REACT_APP_API_BASE_URL}/posts/${postId}`)
      .then((res) => setPost(res.data.data))
      .then(
        setPostFormData({
          post_title: post?.post_title,
          post_content: post?.post_content,
        })
      )
      .catch(setError);
  }, [postId, post?.post_title, post?.post_content]);

  const changeHandler = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setPostFormData({
      ...postFormData,
      [target.name]: value,
    });
    console.log(postFormData);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (post.user_id === userId) {
      axios
        .put(`${REACT_APP_API_BASE_URL}/posts/${postId}`, {
          data: {
            ...postFormData,
          },
        })
        .then(() => history.push('/posts'))
        .catch(setError);
    } else {
      setError({
        message: 'You can only edit your own posts.',
      });
    }
  };

  return (
    <div className='postCreateContainer'>
      <form className='postCreateForm' onSubmit={submitHandler}>
        <h2>Edit Post</h2>
        <div className='formGroup'>
          {error && <p className='errorMsg'>{error.message}</p>}
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='post_title'
            placeholder='Title'
            value={postFormData.post_title}
            onChange={changeHandler}
            required
          />
        </div>
        <div className='formGroup'>
          <label htmlFor='body'>Body:</label>
          <textarea
            name='post_content'
            placeholder='Body'
            rows='10'
            className='textarea'
            value={postFormData.post_content}
            onChange={changeHandler}
            required
          ></textarea>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default PostEdit;
