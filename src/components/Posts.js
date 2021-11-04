import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const { REACT_APP_API_BASE_URL = "http://localhost:5001" } = process.env;
    axios
      .get(`${REACT_APP_API_BASE_URL}/posts`)
      .then((res) => setPosts(res.data.data))
      .catch(console.log);
  }, []);
  return (
    <div className="postsSection">
      <div className="postsContainer">
        <h1>Posts</h1>
        <Link to="/posts/create" className="createBtn">
          Create a Post
        </Link>
        <p className="directions">Click on post to read more</p>
        {posts.map((post) => (
          <Link
            key={post.post_id}
            to={`/posts/${post.post_id}`}
            className="postLink"
          >
            <div className="post">
              <div className="postName">
                <h3>{post.post_title}</h3>
              </div>
              <div className="postBodySample">
                <p>{post.post_content.slice(0, 200)}...</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
