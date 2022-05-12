import React, { useState, useEffect } from "react";
import ProductDetails from "../../../components/product_details/ProductDetails";
import ProductCard from "../../../components/cards/product_card/ProductCard";
import {
  getProduct,
  productStar,
  getRelatedProducts,
} from "../../../functions/product";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
    // eslint-disable-next-line
  }, [slug]);

  // eslint-disable-next-line
  useEffect(() => {
    if (product.ratings && user) {
      const existingRatingObject = product.ratings.find(
        (ele) => `${ele.postedBy}` === `${user._id}`
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelatedProducts(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      // console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <main>
      <div className="container-fluid p-0">
        <div className="row d-flex p-2 justify-content-center">
          <div className="col-10">
            <Link className="btn btn-sm ant-btn-primary" to="/">
              Back to the homepage
            </Link>
            <h4 className="text-black text-center alert-info p-3 my-3">
              {product.title}
            </h4>
            <ProductDetails
              product={product}
              onStarClick={onStarClick}
              star={star}
            />
          </div>
        </div>

        {/* related products */}
        <div className="row d-flex justify-content-center">
          <div className="col-10 py-5">
            <h4 className="text-black alert-warning p-3 my-3">
              Related Products
            </h4>

            <div className="row">
              {related.length
                ? related.map((r) => (
                    <div
                      key={r._id}
                      className="col d-flex justify-content-center my-2"
                    >
                      <ProductCard product={r} />
                    </div>
                  ))
                : "No related Products Found"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleProduct;
