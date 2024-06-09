import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleLogin } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState(location.state || "");

  const [formData, setFormData] = useState();
  const handleForm = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage({
        status: "error",
        message: "Email and password are required",
      });
      return;
    }
    try {
      const response = await handleLogin(formData);
      if (response != null) {
        localStorage.setItem("authToken", response.token);
        return navigate("/chat");
      } else {
        setMessage({
          status: "error",
          message: "Wrong credentials",
        });
      }
    } catch (error) {
      setMessage({
        status: "error",
        message: "Authentication failed",
      });
    }
  };
  return (
    <main id="auth">
      <div className="form-auth">
        <div className="wrapper">
          <div className="title">
            <span>Login Form</span>
          </div>
          <form action="#">
            <div class="form-floating mb-3">
              <input
                name="email"
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleForm}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                name="password"
                type="password"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleForm}
              />
              <label for="floatingInput">Password </label>
            </div>
            <div className="pass">
              <a href="#">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              id="auth-btn"
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className="signup-link">
              Not a member? <a href="#">Signup now</a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
