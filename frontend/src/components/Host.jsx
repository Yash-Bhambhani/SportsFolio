import { useState, useEffect } from "react";
import axios from "axios";
import { useTheContext } from "../context/index.js";
import { useNavigate } from "react-router-dom";
import images from "../../public/images";

const Host = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [upData, setUpData] = useState([]);
  const { username } = useTheContext();
  const getHost = async () => {
    try {
      console.log(username);
      const res = await axios.post("http://localhost:8000/landingpage/Host", {
        username,
      });
      setData(res.data.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteHost = async (index) => {
    try {
      const res = await axios.delete("http://localhost:8000/landingpage/Host", {
        data: { id: data[index]._id },
      });
      // Handle response or update UI accordingly
      setData((prevData) => prevData.filter((index, i) => i !== index));
      setUpData(data);
    } catch (err) {
      console.log(err);
      // Handle error
    }
  };

  useEffect(() => {
    console.log(username);
    getHost();
  }, [upData]);
  if (data?.length === 0) {
    navigate("/landingpage/empty");
  }
  return (
    <div className="tut">
      {data && data?.length > 0 ? (
        data.map((home, index) => (
          <div className="data">
            <div key={index} className="cards">
              <img src={images[home.sport]} alt="Football" />
              <h2 className="name">{home.sport}</h2>
              <h3>Hosted by: {home.name}</h3>
              <h3>
                Tagline: <b>{home.tagline}</b>
              </h3>
              <h3>Venue: {home.venue}</h3>
              <button
                className="delete"
                onClick={() => deleteHost(index)}
                style={{ cursor: "pointer" }}
              >
                Delete
              </button>
              <button
                className="delete"
                onClick={() => {
                  // console.log(home);
                  navigate("/landingpage/update", {
                    state: { id: home },
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                Update
              </button>
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
export default Host;
