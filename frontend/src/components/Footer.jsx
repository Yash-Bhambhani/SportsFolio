import { insta } from "../utils/constants";
import { github } from "../utils/constants";
import { linkdin } from "../utils/constants";
const footer = () => {
  return (
    <div className="footer">
      <button className="about-me">About Me</button>
      <div className="socialmedia">
        <button>
          <img className="insta" src={insta} />
        </button>
        <button>
          <img className="insta" src={github} />
        </button>
        <button>
          <img className="insta" src={linkdin} />
        </button>
      </div>
    </div>
  );
};
export default footer;
