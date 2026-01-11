import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center">
        <h2>The Zerodha Universe</h2>
        <p className="text-muted">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-lg-4  p-3 mt-5">
          <img
            src="media/images/zerodhaFundhouse.png"
            style={{ width: "45%" }}
          />
          <p className="text-small text-muted p-5" style={{ fontSize: "" }}>
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        <div className="col-lg-4 p-3 mt-5 ">
          <img src="media/images/sensibullLogo.svg" style={{ width: "69%" }} />
          <p className="text-small text-muted p-5">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>

        <div className="col-lg-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" />
          <p className="text-small text-muted mt-5">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>

        <div className="col-lg-4  p-3 mt-5">
          <img src="media/images/streakLogo.png" style={{ width: "31%" }} />
          <p className="text-small text-muted p-5">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>

        <div className="col-lg-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png" />
          <p className="text-small text-muted  p-5">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>

        <div className="col-lg-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png" style={{ width: "25%" }} />
          <p className="text-small text-muted p-5">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>

        <div>
          <Link to="/signup">
            <button
              className="p-2 btn btn-primary fs-5 mb-5"
              style={{ width: "15%", margin: "0 auto" }}
            >
              Sign up for free
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Universe;
