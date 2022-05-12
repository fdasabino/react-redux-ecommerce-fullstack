import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Tooltip } from "antd";
import Placeholder from "../../../images/placeholder.jpg";
import { AiOutlineEye } from "react-icons/ai";
import { BsBagPlus } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { showAverage } from "../../../functions/ratingAverage";
import { toast } from "react-toastify";
import _ from "lodash";
import "./ProductCard.css";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add to cart");
  // redux state
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // console.log("add to cart", product);
    // create cart array
    let cart = [];

    if (typeof window !== "undefined") {
      // if cart is in localStorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      } // push the new item to cart array
      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates
      const unique = _.uniqWith(cart, _.isEqual);
      // save cart array to localStorage
      // console.log("unique", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      toast.success(`"${product.title}" added to cart`);

      // show tooltip
      setTooltip("Added to cart");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <Card
      className="text-center product-card_wrapper"
      style={{ minWidth: 250, maxWidth: 250 }}
      hoverable
      cover={
        <Link to={`/product/${product.slug}`}>
          <img
            alt={product.title}
            src={product.images?.length ? product.images[0].url : Placeholder}
          />
        </Link>
      }
      actions={[
        <Link to={`/product/${product.slug}`}>
          <AiOutlineEye className="text-primary" key="view" size={20} />
          <br /> View
        </Link>,
        <Tooltip title={product.quantity >= 1 ? tooltip : "Product out stock"}>
          {product.quantity === 0 ? (
            <button onClick={handleAddToCart} disabled>
              <FaTimes className="text-danger" key="add to cart" size={20} />
              ,
              <br /> Out of stock
            </button>
          ) : (
            <button onClick={handleAddToCart}>
              <BsBagPlus className="text-success" key="add to cart" size={20} />
              ,
              <br /> Add to cart
            </button>
          )}
          ,
        </Tooltip>,
      ]}
    >
      <small>
        <b>{product.brand}</b>
      </small>
      <hr />

      <Meta title={product.title} description={`$ ${product.price}`} />
      <hr />
      <div className="d-flex justify-content-evenly">
        {product?.ratings && product.ratings?.length > 0
          ? showAverage(product)
          : "This product has no ratings"}
      </div>
    </Card>
  );
};

export default ProductCard;
