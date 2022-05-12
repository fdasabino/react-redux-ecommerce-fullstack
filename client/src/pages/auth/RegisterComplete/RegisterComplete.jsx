import React, { useState, useEffect } from "react";
import { BiMailSend } from "react-icons/bi";
import { auth } from "../../../firebase";
import { Button } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../../functions/auth";
import "./RegisterComplete.css";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
      // toast.info(`You are currently logged in as ${user.email}`);
    } else {
      setEmail(window.localStorage.getItem("emailForRegistration"));
      console.log(window.localStorage.getItem("emailForRegistration"));
    }
  }, [history, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validation
    if (!email || !password) {
      toast.error("No empty fields allowed.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // console.log(result);
      if (result.user.emailVerified) {
        // remove user email from localStorage
        window.localStorage.removeItem("emailForRegistration");

        // get user id token
        const user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult);
        //redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => console.log(err));
        // redirect
        history.push("/");
        toast.success("Account activated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const registerCompleteForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control mb-2"
        value={email}
        disabled
      />
      <input
        type="password"
        className="form-control mb-2"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoFocus
      />
      <Button
        block
        type="primary"
        onClick={handleSubmit}
        className="btn btn-primary mt-3"
        disabled={password.length < 6}
      >
        <BiMailSend size={20} /> Complete Registration
      </Button>
    </form>
  );

  return (
    <div className="register-complete__container">
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4 className="mb-3">Complete Registration</h4>
            <p>Enter a password to complete the registration process.</p>
            <div className="register-complete__wrapper">
              {registerCompleteForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
