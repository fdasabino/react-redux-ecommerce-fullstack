import React from "react";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/ratingAverage";

const ProductListDetails = ({ product }) => {
  const { category, subCategories } = product;

  return (
    <div>
      <hr />
      Available:{" "}
      <span>
        <b>{product.quantity}</b>
      </span>
      <hr />
      Color:{" "}
      <span>
        <b>{product.color}</b>
      </span>
      <hr />
      <span>
        <b>{product.brand}</b>
      </span>
      {category && (
        <div className="text-decoration-underline">
          <hr />
          <Link className="text-black" to={`/category/${category.slug}`}>
            <b>{category.name.toUpperCase()}</b>
          </Link>
        </div>
      )}
      {subCategories && (
        <div className="text-decoration-underline">
          <hr />
          {subCategories.map((item) => (
            <Link
              className="text-black mx-1"
              key={item._id}
              to={`/sub-category/${item.slug}`}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}
      <hr />
      <div className="d-flex justify-content-evenly">
        {product?.ratings && product.ratings?.length > 0
          ? showAverage(product)
          : "This product has no ratings"}
        <span className="h6">{`( ${product.ratings?.length} )`}</span>
      </div>
    </div>
  );
};

export default ProductListDetails;
