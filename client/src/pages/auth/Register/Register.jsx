import React, { useState, useEffect } from "react";
import { BiMailSend } from "react-icons/bi";
import { Button } from "antd";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "./Register.css";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
      // toast.info("You are already logged in to your account");
    }
  }, [history, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      <div className="text-center">
        Email sent to {email}. Click the link provided to complete your
        registration.
      </div>
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter a valid email address..."
        className="form-control"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoFocus
      />
      <Button
        block
        type="primary"
        onClick={handleSubmit}
        className="btn btn-primary mt-3"
        disabled={email.length < 6}
      >
        <BiMailSend size={20} /> Register
      </Button>
    </form>
  );

  return (
    <div className="register__container">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <h4 className="mb-3">Register</h4>
            <p>
              We will send the registration link to the email address provided.
            </p>
            <div className="register__wrapper">{registerForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
