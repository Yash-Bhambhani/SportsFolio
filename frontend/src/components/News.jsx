import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsComponent = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.post("http://localhost:8000/news");
      console.log(response.data);
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2
        style={{
          color: "#333",
          borderBottom: "2px solid #333",
          paddingBottom: "10px",
        }}
      >
        Latest News
      </h2>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {news
          .slice()
          .reverse()
          .map((item) => (
            <li
              key={item._id}
              style={{ marginBottom: "10px", fontSize: "18px" }}
            >
              {item.news}{" "}
              <span
                style={{
                  color: item.message === "delete" ? "red" : "green",
                  fontStyle: "italic",
                }}
              >
                (
                {item.message === "delete"
                  ? "This tournament has been deleted"
                  : "This tournament has been updated"}
                )
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NewsComponent;
