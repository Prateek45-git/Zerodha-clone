import { useNavigate } from "react-router-dom";
import { openDashboardSafely } from "../../utils/tryDemo";

function RightSection({ productName, productDescription, imageURL }) {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6 p-5">
          <h1 style={{ lineHeight: "1.8" }}>{productName}</h1>
          <p style={{ lineHeight: "1.8" }}>{productDescription}</p>

          <button
            onClick={() => openDashboardSafely(navigate)}
            style={{
              background: "none",
              border: "none",
              color: "#387ed1",
              cursor: "pointer",
            }}
          >
            Learn More <i className="fa fa-long-arrow-right" />
          </button>
        </div>

        <div className="col-lg-6 mt-5">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
