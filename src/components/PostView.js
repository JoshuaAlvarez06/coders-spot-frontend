import React from "react";
import "./PostView.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = React.useState([]);
  React.useEffect(() => {
    const { REACT_APP_API_BASE_URL = "http://localhost:5001" } = process.env;
    axios
      .get(`${REACT_APP_API_BASE_URL}/posts/${postId}`)
      .then((res) => setPost(res.data.data));
  }, [postId]);

  return (
    <div className="postSection">
      <h1>View Post</h1>
      <div className="postContainer">
        <div className="postClicked">
          <div className="postTitle">
            <h2>{post.post_title}</h2>
          </div>
          <div className="postContent">
            <p>{post.post_content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
