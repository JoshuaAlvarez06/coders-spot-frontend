import React from "react";
import { Link } from "react-router-dom";
import "./NavDropdown.css";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const NavDropdown = ({ navClickHandler }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="dropdownContainer" onClick={navClickHandler}>
      <i className="fas fa-times icon" onClick={navClickHandler}></i>
      <ul className="dropdownItems">
        <li className="dropdownItem">
          <Link to="/">Home</Link>
        </li>
        <li className="dropdownItem">
          <Link to="/posts">Posts</Link>
        </li>
        {isAuthenticated && (
          <li className="dropdownItem">
            <Link to="/profile">Profile</Link>
          </li>
        )}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </ul>
    </div>
  );
};

export default NavDropdown;
