import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Placeholder from "../../images/placeholder.jpg";

const ActionDrawer = ({ p }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <Drawer
      title={
        <b>
          Cart Total:{" "}
          {getTotal().toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </b>
      }
      placement="right"
      width="fit-content"
      visible={drawer}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      className="text-center"
    >
      {cart.map((p) => {
        return (
          <div key={p._id} className="product mt-2">
            <div className="row m-0">
              <div className="col">
                <div className="info d-flex justify-content-start align-items-center my-2">
                  {p.images.length ? (
                    <img className="w-25" src={p.images[0].url} alt={p.title} />
                  ) : (
                    <img src={Placeholder} alt="placeholder" />
                  )}
                  <div className="col">
                    <div className="product-info">
                      <div>
                        <b>{p.title}</b>
                      </div>
                      <div>
                        <span className="value">{p.brand}</span>
                      </div>
                      <div>
                        <span className="value">
                          {p.count} x <b>$ {p.price}</b>
                        </span>
                      </div>
                      <div>
                        Color:{" "}
                        <span className="value">
                          <b>{p.color}</b>
                        </span>
                      </div>
                      <div>
                        <span className="value">
                          <span>$ {p.price * p.count}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        );
      })}
      <div className="row">
        <div className="col">
          <p>
            <b>
              {cart.length > 1
                ? `You have ${cart.length} items in your cart.`
                : `You have ${cart.length} item in your cart.`}
            </b>
          </p>
        </div>
      </div>
      {cart.length > 0 && (
        <Link
          className="btn ant-btn-primary mb-2"
          to="/cart"
          onClick={() => {
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            });
          }}
        >
          Go to Cart
        </Link>
      )}
    </Drawer>
  );
};

export default ActionDrawer;
