import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { auth, googleAuthProvider } from "../../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../../functions/auth";
import "./Login.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("fdasabino@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const intended = history.location.state;
    if (intended) {
      return;
    } else if (user?.token) history.push("/");
  }, [user?.token, history]);

  const dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    const intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  // Handle login with email and password
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      // history.push("/");
      toast.success(`Successfully logged in as: ${email}`);
    } catch (error) {
      console.log(error.message);
      toast.error(`${error.message}`);
      setLoading(false);
    }
  };

  // Handle login with google
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
        toast.success(`Successfully logged in as: ${user.email}`);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Your email address..."
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoFocus
      />
      <input
        type="password"
        className="form-control"
        placeholder="Your password..."
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {!loading ? (
        <Button
          block
          type="primary"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={!email || password.length < 6}
        >
          <AiOutlineMail size={20} /> Login with Email/Password
        </Button>
      ) : (
        <Button
          block
          type="primary"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={!email || password.length < 6}
        >
          <AiOutlineMail size={20} /> Loading...
        </Button>
      )}
    </form>
  );

  return (
    <div className="login__container">
      <div className="container p-1 text-center">
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <h4 className="mb-3">Login</h4>
            <p>Login with your email address and password.</p>
            <div className="login__wrapper">
              {loginForm()}
              <button className="btn btn-dark w-100 mt-3" onClick={googleLogin}>
                <FcGoogle size={20} /> Login with Google
              </button>
              <div className="mt-3">
                <Link to="/forgot/password" className="text-danger">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
