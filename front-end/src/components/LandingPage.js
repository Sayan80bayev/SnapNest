import React from "react";
import UserReviews from "./UserReviews";
import Pricing from "./Pricing";
export default function LandingPage() {
  return (
    <main id="landingPage">
      <div className="container">
        <div className="container hero mb-5">
          <div className="row">
            <div className="col">
              <h1>SnapNest </h1>
              <h2>
                Where every click leads to a new connection, enriching your
                digital landscape with meaningful interactions.
              </h2>
              <button className="btn btn-primary">Get started</button>
            </div>
            <video className="col" autoPlay muted loop>
              <source src="/5977122-uhd_3840_2160_25fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <h1>Feautures</h1>
        <div className="mosaic-content">
          <div className="mosaic-item large" id="easy-post">
            <div className="row">
              <h2>Easy posting system</h2>
            </div>
          </div>
          <div className="mosaic-item" id="message">
            <div className="row">
              <h2>Instant messaging</h2>
            </div>
          </div>
          <div className="mosaic-item" id="community">
            <div className="row">
              <h2>Communities of Interest</h2>
            </div>
          </div>
          <div className="mosaic-item" id="security">
            <div className="row">
              <h2>Security and privacy</h2>
            </div>
          </div>
        </div>
        {/* <UserReviews /> */}
        <Pricing />
      </div>
    </main>
  );
}
