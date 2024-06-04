import React from "react";

export default function Login() {
  return (
    <div className="form-auth">
      <div className="wrapper">
        <div className="title">
          <span>Login Form</span>
        </div>
        <form action="#">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Password </label>
          </div>
          <div className="pass">
            <a href="#">Forgot password?</a>
          </div>
          <button className="btn btn-primary">Login</button>
          <div className="signup-link">
            Not a member? <a href="#">Signup now</a>
          </div>
        </form>
      </div>
    </div>
  );
}
