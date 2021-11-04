import React from "react";
import "./PostCreate.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

const PostCreate = () => {
  const history = useHistory();
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = React.useState(0);
  const [postFormData, setPostFormData] = React.useState({
    post_title: "",
    post_content: "",
  });
  React.useEffect(() => {
    if (user && isAuthenticated) {
      const { REACT_APP_API_BASE_URL = "http://localhost:5001" } = process.env;
      axios
        .get(`${REACT_APP_API_BASE_URL}/users/${user.email}`)
        .then((response) => setUserId(response.data.data.id));
    }
  }, [user, isAuthenticated, userId]);

  const changeHandler = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setPostFormData({
      ...postFormData,
      [target.name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { REACT_APP_API_BASE_URL = "http://localhost:5001" } = process.env;
    axios.post(`${REACT_APP_API_BASE_URL}/posts`, {
      data: {
        ...postFormData,
        user_id: userId,
      },
    });
    setPostFormData({
      post_title: "",
      post_content: "",
    });
    history.push("/posts");
  };

  return (
    <div className="postCreateContainer">
      {isAuthenticated ? (
        <form className="postCreateForm" onSubmit={submitHandler}>
          <h2>Create Post</h2>
          <div className="formGroup">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="post_title"
              placeholder="Title"
              value={postFormData.post_title}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="body">Body:</label>
            <textarea
              name="post_content"
              placeholder="Body"
              rows="10"
              className="textarea"
              value={postFormData.post_content}
              onChange={changeHandler}
              required
            ></textarea>
          </div>
          <button type="submit">Post</button>
        </form>
      ) : (
        <div className="mustBeLoggedIn">
          <h2>Must Be Logged In To Create Post</h2>
          <LoginButton />
        </div>
      )}
    </div>
  );
};

export default PostCreate;
