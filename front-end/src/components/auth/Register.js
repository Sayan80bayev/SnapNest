import React from "react";

export default function Register() {
  return (
    <main id="auth">
      <div className="form-auth">
        <div className="wrapper">
          <div className="title">
            <span>Registration Form</span>
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
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Username</label>
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

            <button className="btn btn-primary" id="auth-btn">
              Register
            </button>
            <div className="signup-link">
              Already registered? <a href="#">Login </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
