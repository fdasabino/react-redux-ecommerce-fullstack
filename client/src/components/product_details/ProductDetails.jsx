import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import RatingModal from "../rating_modal/RatingModal";
import { addToWishlist } from "../../functions/user";
import { Carousel } from "react-responsive-carousel";
import Placeholder from "../../images/placeholder.jpg";
import { BsListStars, BsBagPlus } from "react-icons/bs";
import { Card, Tabs, Tooltip } from "antd";
import ProductListDetails from "../product_list_details/ProductListDetails";
import "./ProductDetails.css";
import _ from "lodash";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const { Meta } = Card;
const { TabPane } = Tabs;

//this is child component of single product page
const ProductDetails = ({ product, onStarClick, star }) => {
  const { title, images } = product;
  const [tooltip, setTooltip] = useState("Click to add to cart");

  // redux state
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  //use history
  const history = useHistory();

  const handleAddToCart = () => {
    console.log("add to cart", product);
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
      console.log("unique", unique);
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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("added to wishlist", res.data, product.title);
      toast.success(`"${product.title}" added to wishlist`);
      history.push("/user/wishlist");
    });
  };

  return (
    <div className="row my-5">
      {/* carousel */}
      <div className="col-md-6">
        {images?.length ? (
          <Carousel
            className="carousel_product-details"
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            emulateTouch={true}
            infiniteLoop={true}
            autoPlay={true}
            autoFocus={true}
            interval={8000}
            showStatus={true}
            showThumbs={false}
            useKeyboardArrows={true}
            showArrows={true}
          >
            {images?.map((img) => (
              <img
                className="carousel_img"
                key={img.public_id}
                src={img.url}
                alt={title}
              />
            ))}
          </Carousel>
        ) : (
          <img src={Placeholder} alt="placeholder" />
        )}
        <Tabs className="my-4 text-start" type="card" defaultActiveKey="1">
          <TabPane tab="Description:" key="1">
            <div className="mx-2">{product.description}</div>
          </TabPane>
          <TabPane tab="Product Info:" key="2">
            <div className="mx-2">
              <p>
                <b>Qty sold: </b> {product.sold}
              </p>
              <p>
                <b>Pattern: </b> {product.color}
              </p>
              <p>
                <b>Fast Delivery: </b> {product.shipping}
              </p>
              <p>
                <b>Article number: </b> {product._id}
              </p>
            </div>
          </TabPane>
          <TabPane tab="Care:" key="3">
            <div className="mx-2">
              <p>
                <b>Care instructions : </b> 30 ° C machine wash
              </p>
            </div>
          </TabPane>
        </Tabs>
      </div>

      {/* CARD */}
      <div className="col-md-6">
        <Card
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          className="text-center"
          style={{ minWidth: 150 }}
          bordered
          hoverable
          actions={[
            <button onClick={handleAddToWishlist}>
              <BsListStars className="text-warning" key="view" size={20} />
              <br /> Add to Wishlist
            </button>,
            <Tooltip
              title={product.quantity >= 1 ? tooltip : "Product out stock"}
            >
              {product.quantity === 0 ? (
                <button onClick={handleAddToCart} disabled>
                  <FaTimes
                    className="text-danger"
                    key="add to cart"
                    size={20}
                  />
                  ,
                  <br /> Out of stock
                </button>
              ) : (
                <button onClick={handleAddToCart}>
                  <BsBagPlus
                    className="text-success"
                    key="add to cart"
                    size={20}
                  />
                  ,
                  <br /> Add to cart
                </button>
              )}
            </Tooltip>,
            <RatingModal>
              <StarRatings
                starRatedColor="gold"
                starHoverColor="teal"
                starEmptyColor="grey"
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                name={product._id}
                isSelectable={true}
              />
            </RatingModal>,
          ]}
        >
          <Meta title={product.title} description={`$ ${product.price}`} />
          <ProductListDetails product={product} />
          <hr />
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
