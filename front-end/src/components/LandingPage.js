import React from "react";

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
          <div className="mosaic-item tall">
            <img src="image1.jpg" alt="Image for Feature 2" />
            <h3>Feature 2</h3>
          </div>
          <div className="mosaic-item" id="message">
            <div className="row">
              <h2>Instant messaging</h2>
            </div>
          </div>
          <div className="mosaic-item">Feature 4</div>
          <div className="mosaic-item">Feature 5</div>
          <div className="mosaic-item">Feature 6</div>
          <div className="mosaic-item">Feature 7</div>
          <div className="mosaic-item">Feature 8</div>
          {/* ... more mosaic items with different content and classes ... */}
        </div>
      </div>
    </main>
  );
}
