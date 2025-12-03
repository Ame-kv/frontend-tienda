// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Espera a cargar usuario desde localStorage

  // Cargar usuario desde localStorage al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false); // Ya terminó de cargar
  }, []);

  // Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/"); // redirige al dashboard
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Verifica si el usuario está logueado
  const requireAuth = () => {
    return !!user && !!user.token; // solo devuelve true o false
  };

  // Mientras carga el usuario, podemos mostrar un loader
  if (loading) {
    return <div>Cargando sesión...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
