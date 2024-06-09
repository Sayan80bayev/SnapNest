import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleRegister } from "../api/api";
export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState();
  const handleFormChange = (e) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData ||
      !formData.email ||
      !formData.password ||
      !formData.username
    ) {
      setMessage({
        status: "__ERROR__",
        value: "Please fill all the gaps",
      });
      return;
    }
    try {
      const response = await handleRegister(formData);
      localStorage.setItem("authToken", response.token);
      return navigate("/chat");
    } catch (error) {
      setMessage({
        status: "__ERROR__",
        value: "Registration failed",
      });
    }
  };
  return (
    <main id="auth">
      <div className="form-auth">
        <div className="wrapper">
          <div className="title">
            <span>Registration Form</span>
          </div>
          <form action="#">
            {message && message?.status == "__ERROR__" && (
              <p className="alert alert-danger">{message.value}</p>
            )}
            <div class="form-floating mb-3">
              <input
                name="email"
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleFormChange}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                name="username"
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleFormChange}
              />
              <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating mb-3">
              <input
                name="password"
                type="password"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleFormChange}
              />
              <label for="floatingInput">Password </label>
            </div>

            <button
              typ="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
              id="auth-btn"
            >
              Register
            </button>
            <div className="signup-link">
              Already registered? <Link to="/login">Login </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
