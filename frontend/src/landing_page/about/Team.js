import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-5 ">
        <h1 className=" text-center mt-5 text-muted ">People</h1>
      </div>

      <div className="row p-5 ">
        <div className="col-12 col-md-6  text-center text-muted">
          <img
            src="media/images/myPhoto.jpg"
            style={{ borderRadius: "20%", width: "50%" }}
          />
          <h4 className="mt-5">Prateek Chauragade</h4>
          <h6>Made by me</h6>
        </div>

        <div className="col-12 col-md-6 text-muted mt-5" style={{lineHeight: "1.8", fontSize: "16px"}}>
          <p>
            I am an aspiring full-stack developer with a strong passion for building real-world applications and learning through hands-on projects. Recently, I created a fully working clone of a production-level website, replicating its core features, design, and user flow from scratch.
          </p>

          <p>
            This project helped me strengthen my skills in React, JavaScript, Node.js, API integration, routing, and responsive UI development. By rebuilding the platform end-to-end, I gained practical experience in structuring components, managing state, handling forms, and connecting the frontend with backend logic.
          </p>

          <p>Playing basketball is his zen.</p>

          <p>Connect on Homepage / TradingQnA / Twitter</p>
        </div>
      </div>
    </div>
  );
}

export default Team;
