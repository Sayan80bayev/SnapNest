import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="mt-5 text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-2 text-center">
            <img
              src="/2-removebg-preview.png"
              alt="LOGO"
              className="img-fluid"
              style={{ height: "50px" }}
            />
          </div>
          <div className="col-md-8">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  About us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Carier
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 text-center">
            <div className="mb-2">
              <a href="#" className="text-white mx-2">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="text-white mx-2">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-white mx-2">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div>
              <p className="mb-0">
                <FontAwesomeIcon icon={faEnvelope} /> email@example.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} /> +123 456 7890
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
