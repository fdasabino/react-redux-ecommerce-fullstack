import React from "react";
import { Tooltip } from "antd";
import {
  AiOutlineClose,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { useDispatch } from "react-redux";

import ModalImage from "react-modal-image-responsive";
import Placeholder from "../../images/placeholder.jpg";

const CartDetails = ({ p }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;
    let cart = [];

    if (count > p.quantity) {
      return p.quantity;
    }

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((item, i) => {
        if (item._id === p._id) {
          cart[i].count = count;
        }
        return cart;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = (e) => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((item, i) => {
        if (item._id === p._id) {
          cart.splice(i, 1);
        }
        return cart;
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <div className="product">
      <div className="row">
        <div className="col-md-3 d-flex justify-content-center">
          <div className="img-container">
            {p.images.length ? (
              <ModalImage
                className="px-5"
                small={p.images[0].url}
                large={p.images[0].url}
                alt={p.title}
              />
            ) : (
              <img src={Placeholder} alt="placeholder" />
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div className="info ">
            <div className="row">
              <div className="col-md-5 product-name">
                <div className="product-name">
                  <div>
                    <b>{p.title}</b>
                  </div>
                  <div className="product-info">
                    <div>
                      <span className="value">{p.brand}</span>
                    </div>
                    <div>
                      <span className="value">
                        {p.count} x <b>$ {p.price}</b>
                      </span>
                    </div>
                    <div>
                      SKU:{" "}
                      <span className="value">
                        <small>
                          {" "}
                          <b>{p._id} </b>
                        </small>
                      </span>
                    </div>
                    <div>
                      Color:{" "}
                      <span className="value">
                        <b>{p.color}</b>
                      </span>
                    </div>
                    <div>
                      Fast Delivery:{" "}
                      <span className="value">
                        <b>
                          {p.shipping === "Yes" ? (
                            <AiOutlineCheckCircle color="green" size={20} />
                          ) : (
                            <AiOutlineCloseCircle color="tomato" size={20} />
                          )}
                        </b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 quantity my-auto">
                <label>Quantity:</label>
                <Tooltip title={`Items in stock: ${p.quantity}`}>
                  <input
                    type="number"
                    onChange={handleQuantityChange}
                    value={p.count}
                    max={p.quantity}
                    min={1}
                    className="form-control quantity-input"
                  />
                </Tooltip>
              </div>
              <div className="col-md-3 price my-auto">
                <span>$ {p.price * p.count}</span>
                <span className="mx-1">
                  <Tooltip title={"Click to remove item"}>
                    <button onClick={handleRemove}>
                      <AiOutlineClose size={20} className="text-danger" />
                    </button>
                  </Tooltip>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
