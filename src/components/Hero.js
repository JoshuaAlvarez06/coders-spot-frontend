import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import { useAuth0 } from "@auth0/auth0-react";

const Hero = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="heroSection">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="heroContainer">
        <h1>Coder's Spot</h1>
        <h2>The spot to talk code!</h2>
        {isAuthenticated && <h2>Hey {user.given_name || user.nickname}!</h2>}
        <Link to="/posts">Start Talking</Link>
      </div>
    </div>
  );
};

export default Hero;
