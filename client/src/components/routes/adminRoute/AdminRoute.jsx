import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CountDown from "../../count_down/CountDown";
import { currentAdmin } from "../../../functions/auth";
import { toast } from "react-toastify";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user?.token) {
      currentAdmin(user.token)
        .then((res) => {
          // console.log("CURRENT ADMIN RESPONSE: ", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERROR: ", err);
          toast.error("YOU DO NOT HAVE ADMIN PRIVILEGES", err.message);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <CountDown />;
};

export default AdminRoute;
