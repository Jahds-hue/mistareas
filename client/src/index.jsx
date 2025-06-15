import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./components/RequireAuth"; // ✅ nuevo
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            !localStorage.getItem("token") ? <Login /> : <Navigate to="/" />
          }
        />
        <Route
          path="/register"
          element={
            !localStorage.getItem("token") ? <Register /> : <Navigate to="/" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

