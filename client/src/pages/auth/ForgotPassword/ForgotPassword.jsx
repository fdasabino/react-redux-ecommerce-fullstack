import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { auth } from "../../../firebase";
import { Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "./ForgotPassword.css";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
      // toast.info(`You are currently logged in as ${user.email}`);
    }
  }, [history, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(`Your password reset has been sent to: ${email}`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="forgot-password__container">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <form onSubmit={handleSubmit}>
              {!loading ? <h4>Reset Password</h4> : <h4>Loading...</h4>}
              <div className="forgot-password__wrapper">
                <input
                  type="email"
                  className="form-control mb-2"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address..."
                  autoFocus
                />
                <Button
                  block
                  type="primary"
                  className="mt-3"
                  onClick={handleSubmit}
                  disabled={email.length < 6}
                >
                  <AiOutlineMail size={20} /> Send Password Reset Link
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
