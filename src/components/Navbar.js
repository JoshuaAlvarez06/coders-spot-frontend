import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ navClickHandler }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="navbarContainer">
      <Link to="/" className="logo">
        <i className="fas fa-code"></i>
      </Link>
      <div className="menuItemsContainer">
        <i className="fas fa-bars bars" onClick={navClickHandler}></i>
        <ul className="menuItems">
          <li className="menuItem">
            <Link to="/">Home</Link>
          </li>
          <li className="menuItem">
            <Link to="/posts">Posts</Link>
          </li>
          {isAuthenticated && (
            <li className="menuItem">
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
