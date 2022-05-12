import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CountDown from "../../count_down/CountDown";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Route {...rest} /> : <CountDown />;
};

export default UserRoute;
