import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        border: "none",
        background: "none",
        padding: "none",
        cursor: "pointer",
      }}
    >
      Log In
    </button>
  );
};

export default LoginButton;
