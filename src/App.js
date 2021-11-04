import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavDropdown from "./components/NavDropdown";
import GlobalStyle from "./globalStyles";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingPage from "./components/LoadingPage";
import axios from "axios";
import PostCreate from "./components/PostCreate";
import PostView from "./components/PostView";

function App() {
  const [visibleNavMenu, setVisibleNavMenu] = React.useState(false);
  const navClickHandler = () => setVisibleNavMenu(!visibleNavMenu);
  const { isLoading } = useAuth0();
  const { user } = useAuth0();

  React.useEffect(() => {
    if (user) {
      const { REACT_APP_API_BASE_URL = "http://localhost:5001" } = process.env;
      axios.post(`${REACT_APP_API_BASE_URL}/users`, {
        data: {
          username: user.nickname,
          first_name: user.given_name,
          last_name: user.family_name,
          email: user.email,
        },
      });
    }
  }, [user]);

  return (
    <>
      <GlobalStyle />
      {isLoading && <LoadingPage />}
      <Navbar navClickHandler={navClickHandler} />
      {visibleNavMenu && <NavDropdown navClickHandler={navClickHandler} />}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/posts/create">
          <PostCreate />
        </Route>
        <Route exact path="/posts/:postId">
          <PostView />
        </Route>
        <Route exact path="/posts">
          <Posts />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </>
  );
}

export default App;
