import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../public/images";
const HostCard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getHomes = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/landingpage/HostCard"
      );
      setData(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getHomes();
  }, []);
  return (
    <div className="tut">
      {data ? (
        data.map((home, index) => (
          <div className="data">
            <div
              key={index}
              className="cards"
              onClick={() =>
                navigate(`/landingpage/details/${home._id}`, {
                  state: { id: home._id },
                })
              }
            >
              <img src={images[home.sport]} alt="Football" />
              <h2 className="name">{home.sport}</h2>
              <h3>Hosted by: {home.name}</h3>
              <h3>
                Tagline: <b>{home.tageline}</b>
              </h3>
              <h3>Venue: {home.venue}</h3>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>Loading......</p>
        </div>
      )}
    </div>
  );
};

export default HostCard;
