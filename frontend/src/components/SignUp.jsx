import { useState, useEffect } from "react";
import { CiUser, CiMail } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const notify = () => {
  toast.success("Successfully Signed Up", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const SignUp = () => {
  const initialValues = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  };
  const history = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [fromErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleClick = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate(formValues);
    console.log(Object.keys(error).length);
    setFormErrors(error);
    setIsSubmit(true);
    if (Object.keys(error).length === 0) {
      notify();
      try {
        await axios
          .post("http://localhost:8000/signup", {
            formValues,
          })
          .then((res) => {
            if ((res.data = "Username is unique"))
              history("/login", { state: { id: formValues.fullname } });
            else {
              alert("Username is not unique");
            }
          })
          .catch((e) => {
            alert("Enter details Correctly");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    if (Object.keys(formValues).length == 0 && isSubmit) {
      console.log(formValues);
    }
  });
  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regex1 = /^(?=.*[0-9])(?=.*[!@#$%^&*])(.{4,10})$/;
    if (!values.fullname) {
      errors.fullname = "Full name is required";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid Email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!regex1.test(values.password)) {
      errors.password = "Please Enter valid password";
    }
    if (!values.confirm) {
      errors.confirm = "Please confirm the password";
    } else if (values.confirm !== values.password) {
      errors.confirm = "Please enter the same password ";
    }
    return errors;
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="form">
        <form action="POST" onSubmit={handleSubmit}>
          <div className="fullname">
            <p className="nummy">
              <FaUserTie /> Your Name
            </p>
            <input
              type="text"
              placeholder="YourName"
              name="fullname"
              value={formValues.fullname}
              onChange={handleClick}
            />
          </div>
          <p className="required">{fromErrors.fullname}</p>
          <div className="username">
            <p className="dummy">
              <CiUser /> Username
            </p>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formValues.username}
              onChange={handleClick}
            />
          </div>
          <p className="required">{fromErrors.username}</p>
          <div className="email">
            <p className="dummy">
              <CiMail className="mail" /> Email
            </p>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleClick}
            />
          </div>
          <p className="required">{fromErrors.email}</p>
          <div className="password">
            <p className="dummy">
              <MdOutlinePassword /> Create Password
            </p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleClick}
            />
          </div>
          <p className="required">{fromErrors.password}</p>
          <div className="confirm">
            <p className="dummy">
              <TbPassword /> Confirm Password
            </p>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm"
              value={formValues.confirm}
              onChange={handleClick}
            />
          </div>
          <p className="required">{fromErrors.confirm}</p>
          <div className="submit">
            <button>Submit</button>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
