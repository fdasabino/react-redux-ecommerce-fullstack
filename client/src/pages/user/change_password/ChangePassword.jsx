import React, { useState } from "react";
import { auth } from "../../../firebase";
import { Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaUserLock } from "react-icons/fa";
import UserSidebar from "../../../components/user_side_bar/UserSidebar";
import { Link, useHistory } from "react-router-dom";

const ChangePassword = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    loading && toast.info("Page is Loading");
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        history.push("/user/dashboard");
        toast.success("Password updated successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdatedForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          className="form-control"
          placeholder="Enter new password"
          value={password}
          disabled={loading}
        />
        <Button
          block
          type="primary"
          icon={<FaUserLock size={20} />}
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading || !password || password.length < 6}
        >
          Update Password
        </Button>
      </div>
    </form>
  );

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <UserSidebar />
          <div className="d-flex justify-content-center align-items-center">
            {user.role === "subscriber" && (
              <Link className="btn ant-btn-primary mx-2" to="/user/dashboard">
                Back to Dashboard
              </Link>
            )}
            {user.role === "admin" && (
              <Link className="btn ant-btn-primary mx-2" to="/admin/dashboard">
                Back to Dashboard
              </Link>
            )}
          </div>
          <div className="col-md-6">
            <h4>Password Update</h4>
            {passwordUpdatedForm()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChangePassword;
