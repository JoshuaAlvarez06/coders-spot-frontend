import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const [displayAmount, setDisplayAmount] = React.useState(4);
  const { REACT_APP_API_BASE_URL } = process.env;

  const increasePosts = () => setDisplayAmount(displayAmount + 5);
  const decreasePosts = () => setDisplayAmount(4);

  React.useEffect(() => {
    if (!isFetching) return;
    axios.get(`${REACT_APP_API_BASE_URL}/posts`).then((res) => {
      let data = res.data.data;
      data = data.sort((a, b) => b.post_id - a.post_id);
      setPosts(data);
    });
    setIsFetching(false);
  }, [REACT_APP_API_BASE_URL, posts, isFetching]);

  return (
    <div className='postsSection'>
      <div className='postsContainer'>
        <h1>Posts</h1>
        <Link to='/posts/create' className='createBtn'>
          Create a Post
        </Link>
        {posts.length === 0 ? 
          <p className="loading-text">Loading...</p> 
          : 
          <p className='directions'>Click on post to read more</p>
        }
        {posts.map(
          (post, index) =>
            index < displayAmount && (
              <Link
                key={post.post_id}
                to={`/posts/${post.post_id}`}
                className='postLink'
              >
                <div className='post'>
                  <div className='postName'>
                    <h3>{post.post_title}</h3>
                  </div>
                  <div className='postBodySample'>
                    <p>{post.post_content}</p>
                  </div>
                </div>
              </Link>
            )
        )}
        {posts.length !== 0 && displayAmount < posts.length && displayAmount !== posts.length && (
          <button className='postsBtn' onClick={increasePosts}>
            View More
          </button>
        )}
        {posts.length !== 0 && displayAmount > posts.length && displayAmount !== posts.length && (
          <button className='postsBtn' onClick={decreasePosts}>
            View Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Posts;
