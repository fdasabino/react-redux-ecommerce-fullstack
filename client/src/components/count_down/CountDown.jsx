import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const CountDown = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      //decrement the count / changing the state
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once the count is equal to 0
    count === 0 && history.push("/login");
    // cleanup <<<-----
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center">
      <h3>You need to login to access this page!</h3>
      <h3>We're redirecting you in {count} seconds!</h3>
      <div id="floatingCirclesG">
        <div className="f_circleG" id="frotateG_01" />
        <div className="f_circleG" id="frotateG_02" />
        <div className="f_circleG" id="frotateG_03" />
        <div className="f_circleG" id="frotateG_04" />
        <div className="f_circleG" id="frotateG_05" />
        <div className="f_circleG" id="frotateG_06" />
        <div className="f_circleG" id="frotateG_07" />
        <div className="f_circleG" id="frotateG_08" />
      </div>
    </div>
  );
};

export default CountDown;
