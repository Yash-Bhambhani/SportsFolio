import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Empty = () => {
  const navigate = useLocation();
  return (
    <div className="empty">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          You haven't hosted any event right now. Kindly register.
        </div>
        <div style={{ textAlign: "center" }}>
          <div>Suggestions:</div>
          <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
            <li>
              Your event timeline must have expired. Kindly register to host a
              new event.
            </li>
            <li>Kindly press the button below to register.</li>
            <li>Go back to join any tournament.</li>
          </ul>
        </div>
        <div>
          <button className="emptybutton">
            <Link
              to="/landingpage/registration"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Host Tournament
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Empty;
