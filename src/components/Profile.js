import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const history = useHistory();
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState(null);
  const { REACT_APP_API_BASE_URL = 'http://localhost:5001' } = process.env;

  const handleDelete = (postId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this post? This cannot be undone.'
      )
    ) {
      try {
        axios.delete(`${REACT_APP_API_BASE_URL}/posts/${postId}`);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  React.useEffect(() => {
    if (user) {
      axios
        .get(`${REACT_APP_API_BASE_URL}/users/${user.email}`)
        .then((response) => setUserId(response.data.data.id))
        .then(() => {
          if (userId >= 1) {
            axios
              .get(`${REACT_APP_API_BASE_URL}/users/${userId}/posts`)
              .then((response) => setPosts(response.data.data));
          }
        });
    }
  }, [user, userId, REACT_APP_API_BASE_URL, posts]);

  return (
    isAuthenticated && (
      <div className='profileContainer'>
        <div className='profileSection'>
          <h1>Profile</h1>
          {error && (
            <h3 style={{ maxWidth: '500px' }} className='errorMsg'>
              {error.message}
            </h3>
          )}
          <div className='userInfoSection'>
            <div className='topInfo'>
              <h2>{user?.name}</h2>
              <img src={user?.picture} alt={user?.nickname} />
            </div>
            <div className='info'>
              <p>Name:</p>
              <p>
                {!user?.given_name || !user?.family_name
                  ? `Unknown`
                  : `${user?.given_name} ${user?.family_name}`}
              </p>
            </div>
            <div className='info'>
              <p>Username:</p>
              <p>{user?.nickname}</p>
            </div>
            <div className='info'>
              <p>Email:</p>
              <p>{user?.email}</p>
            </div>
            <div className='info'>
              <p>Posts:</p>
              <p>{posts?.length}</p>
            </div>
          </div>
          {isAuthenticated && (
            <div className='userPosts'>
              <h2>Your Posts</h2>
              {posts?.length ? (
                posts.map((post, index) => (
                  <div
                    className='userPostsSection'
                    key={post.post_id}
                    id={post.post_id}
                  >
                    <Link to={`/posts/${post.post_id}`} className='postLink'>
                      <div className='post'>
                        <div className='postName'>
                          <h3>{post.post_title}</h3>
                        </div>
                        <div className='postBodySample'>
                          <p>{post.post_content.slice(0, 200)}...</p>
                        </div>
                      </div>
                    </Link>
                    <div className='postsBtnGroup'>
                      <button
                        onClick={() =>
                          history.push(`/posts/${post.post_id}/edit`)
                        }
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post.post_id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>You have no posts to show</p>
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
