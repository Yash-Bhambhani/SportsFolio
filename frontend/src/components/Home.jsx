import React from "react";
import { Helmet } from "react-helmet";
// import { Img, p, h1, button } from "../../components";
import rectangle1 from "../../public/images/img_rectangle_21.png";
import rectangle2 from "../../public/images/img_rectangle_22.png";
import rectangle3 from "../../public/images/img_rectangle_23.png";
import nba from "../../public/images/nba-logo-transparent.png";
import sc1 from "../../public/images/Screenshot 2024-04-02 021132.png";
import cards from "../../public/images/cards-pic.png";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>SportsFolio</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              height: "947px",
              maxHeight: "auto",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "stretch",
                  alignItems: "start",
                  gap: "186px",
                  padding: "13px",
                  backgroundColor: "#000000",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    marginBottom: "92px",
                    marginLeft: "53px",
                    gap: "21px",
                    "@media (min-width: 768px)": { marginLeft: "0px" },
                  }}
                >
                  <h1
                    style={{
                      fontStyle: "italic",
                      color: "white",
                      fontSize: "24px",
                    }}
                  >
                    “From player to organizer”
                  </h1>
                  <h2
                    style={{
                      marginLeft: "18px",
                      "@media (min-width: 768px)": { marginLeft: "0px" },
                      color: "white",
                    }}
                  >
                    <>
                      Discover tournaments or create your own,
                      <br />
                      all in one place.
                    </>
                  </h2>
                </div>
              </div>

              <div
                style={{
                  height: "682px",
                  width: "32%",
                  marginTop: "-241px",
                  marginRight: "24px",
                  "@media (min-width: 768px)": { marginRight: "0" },
                  position: "relative",
                  borderRadius: "33px",
                  overflow: "visible",
                }}
              >
                <img
                  src={nba}
                  alt="image"
                  style={{
                    border: "solid",
                    borderWidth: "thick",
                    borderRadius: "33px",
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    maxHeight: "100%",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "49%",
                gap: "1px",
                bottom: "20px",
                left: "5%",
                margin: "auto",
                position: "absolute",
                "@media (min-width: 768px)": { position: "relative" },
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "60%",
              marginTop: "154px",
              gap: "5px",
              padding: "5px",
              flexWrap: "wrap",
              "@media (min-width: 768px)": { width: "100%" },
            }}
          >
            <p
              style={{
                color: "#000000",
                fontFamily: "Julius Sans One",
                fontSize: "38px",
              }}
            >
              Discover
            </p>
            <p
              style={{
                color: "#000000",
                fontFamily: "Julius Sans One",
                fontSize: "38px",
              }}
            >
              Engage
            </p>
            <p
              style={{
                color: "#000000",
                fontFamily: "Julius Sans One",
                fontSize: "38px",
              }}
            >
              Participate
            </p>
          </div>

          <h2
            style={{
              marginTop: "179px",
              color: "#000000",
              pAlign: "center",
              fontSize: "32px",
            }}
          >
            Register Now and Explore Exciting Events Near You.
          </h2>
          <button
            style={{
              color: "white",
              backgroundColor: "black",
              marginTop: "37px",
              marginBottom: "75px",
              paddingTop: "15px",
              paddingBottom: "15px",
              paddingLeft: "15px",
              paddingRight: "15px",
              // padding: '10px 15px',
              minWidth: "266px",
              borderRadius: "37px",
            }}
          >
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Get Started
            </Link>
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "start",
              width: "100%",
              marginTop: "158px",
              gap: "5px",
              padding: "69px",
              margin: "auto",
              marginBottom: "280px",
              backgroundColor: "#000000",
              maxWidth: "1305px",
              "@media (min-width: 768px)": { flexDirection: "row" },
            }}
          >
            <div
              style={{
                height: "350px",
                width: "61%",
                marginLeft: "3px",
                padding: "5px",
                "@media (min-width: 768px)": { width: "auto", marginLeft: "0" },
                backgroundColor: "#ffffff",
                position: "relative",
                overflow: "hidden", // Changed from "visible" to "hidden"
              }}
            >
              <img
                src={sc1}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  maxHeight: "100%",
                }}
                alt="Your Image"
              />
            </div>

            <h2
              style={{
                width: "30%",
                marginTop: "153px",
                marginRight: "58px",
                color: "#000000",
                "@media (min-width: 768px)": {
                  width: "100%",
                  marginRight: "0",
                },
              }}
            >
              <>
                <span style={{ color: "white" }}>Scroll through your</span>
                <br />
                <span style={{ color: "white" }}>favorite activities.</span>
              </>
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "start",
              width: "100%",
              marginTop: "158px",
              gap: "5px",
              padding: "69px",
              margin: "auto",
              marginBottom: "280px",
              backgroundColor: "#000000",
              maxWidth: "1305px",
              "@media (min-width: 768px)": { flexDirection: "row" },
            }}
          >
            <h2
              style={{
                width: "30%",
                marginTop: "153px",
                marginRight: "58px",
                color: "#000000",
                "@media (min-width: 768px)": {
                  width: "100%",
                  marginRight: "0",
                },
              }}
            >
              <>
                <span style={{ color: "white" }}>Join or Create a team</span>
              </>
            </h2>
            <div
              style={{
                height: "438px",
                width: "61%",
                marginLeft: "3px",
                padding: "5px",
                "@media (min-width: 768px)": { width: "auto", marginLeft: "0" },
                backgroundColor: "#ffffff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={cards}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  maxHeight: "100%",
                }}
                alt="Your Image"
              />
            </div>
          </div>
          <footer
            style={{
              fontSize: "20px",
              display: "flex",
              flexDirection: "column",
              alignSelf: "stretch",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "306px",
              padding: "24px",
              "@media (min-Width: 640px)": { padding: "20px" },
              backgroundColor: "#333333",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "space-between",
                width: "62%",
                marginTop: "18px",
                marginLeft: "7px",
                zIndex: "1",
                "@media (min-width: 768px)": { width: "100%", marginLeft: "0" },
              }}
            >
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2.5px",
                }}
              >
                <li>
                  <a href="#">
                    <p style={{ color: "#FFD700" }}>Quick Links</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Home</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Contact Us</p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>About</p>
                  </a>
                </li>
              </ul>
              <p
                style={{
                  width: "34%",
                  marginTop: "0.5px",
                  marginLeft: "230px",
                  "@media (min-width: 768px)": {
                    width: "100%",
                    marginLeft: "0",
                  },
                }}
              >
                <>
                  Contact :<br />
                  +91 xxxxx-xxxxx
                  <br />
                  +91 xxxxx-xxxxx
                </>
              </p>
              <p
                style={{
                  marginTop: "8px",
                  marginLeft: "173px",
                  "@media (min-width: 768px)": { marginLeft: "0" },
                }}
              >
                example@mail.com
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: "5px",
                margin: "auto",
                maxWidth: "1029px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "flex-end",
                  alignItems: "center",
                  marginBottom: "2.5px",
                }}
              >
                <p style={{ fontFamily: "Irish Grover" }}>S. F.</p>
                <p
                  style={{
                    marginTop: "-6px",
                    padding: "1px",
                    fontFamily: "Irish Grover",
                    position: "relative",
                    border: "1px solid #FFFFFF",
                  }}
                >
                  S P O R T S F O L I O
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "67%",
                  gap: "15px",
                  "@media (min-width: 768px)": { width: "100%" },
                }}
              >
                <p
                  style={{
                    fontSize: "26px",
                    color: "white",
                    alignSelf: "flex-start",
                    marginLeft: "260px",
                    "@media (min-width: 768px)": { marginLeft: "0" },
                  }}
                >
                  Reach Us On
                </p>
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "94%",
                    "@media (min-width: 768px)": { width: "100%" },
                  }}
                >
                  <img
                    src={rectangle1}
                    alt="image"
                    style={{ width: "65px", objectFit: "cover" }}
                  />
                  <img
                    src={rectangle2}
                    alt="image_one"
                    style={{ width: "65px", objectFit: "cover" }}
                  />
                  <img
                    src={rectangle3}
                    alt="image_two"
                    style={{ width: "15%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
