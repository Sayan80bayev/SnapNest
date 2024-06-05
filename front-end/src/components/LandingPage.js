import React from "react";
export default function LandingPage() {
  return (
    <main id="landingPage">
      <div className="container hero">
        <div className="row">
          <div className="col">
            <h1>SnapNest - Your place in the world of instant connections</h1>
            <button className="btn btn-primary">Get started</button>
          </div>
          <video className="col" autoPlay muted loop>
            <source src="/5977122-uhd_3840_2160_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
}
