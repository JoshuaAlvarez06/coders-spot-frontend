import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const { REACT_APP_API_BASE_URL = "http://localhost:5001" } = process.env;

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
  }, [user, userId]);

  return (
    isAuthenticated && (
      <div className="profileContainer">
        <div className="profileSection">
          <h1>Profile</h1>
          <div className="userInfoSection">
            <div className="topInfo">
              <h2>{user.name}</h2>
              <img src={user.picture} alt={user.nickname} />
            </div>
            <div className="info">
              <p>Name:</p>
              <p>
                {user.given_name === undefined || user.family_name === undefined
                  ? `Unknown`
                  : `${user.given_name} ${user.family_name}`}
              </p>
            </div>
            <div className="info">
              <p>Username:</p>
              <p>{user.nickname}</p>
            </div>
            <div className="info">
              <p>Email:</p>
              <p>{user.email}</p>
            </div>
            <div className="info">
              <p>Posts:</p>
              <p>{posts.length}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
