// src/components/LoginGoogle.jsx
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginGoogle = ({ onLoginSuccess }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // user al back
      onLoginSuccess(user);
    } catch (error) {
      console.error("Error en login con Google:", error);
    }
  };

  return (
    <button className="btn btn-outline-dark" onClick={handleGoogleLogin}>
      Iniciar sesión con Google
    </button>
  );
};

export default LoginGoogle;
