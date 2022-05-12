import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import Placeholder from "../../../images/placeholder.jpg";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./AdminProductCard.css";

const AdminProductCard = ({ product, handleRemove }) => {
  return (
    <div className="accordion accordion-flush " id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed alert-success mb-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${product.slug}`}
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            {/* action buttons */}
            <div className="">
              <Tooltip title="Click to edit this product.">
                <Link to={`/admin/product/${product.slug}`}>
                  <AiOutlineEdit size={20} className="text-black" />
                </Link>
              </Tooltip>

              <Tooltip title="Remove this product?">
                <AiOutlineDelete
                  size={20}
                  className="text-danger mx-2"
                  onClick={() => handleRemove(product.slug)}
                />
              </Tooltip>
            </div>
            <div className="mx-1">{product.title}</div>
          </button>
        </h2>
        <div
          id={product.slug}
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <div className="row">
              <div className="col d-flex flex-column text-center">
                <p>
                  <span>
                    Available:
                    <b className="mx-2">{product.quantity}</b>
                  </span>
                </p>
                <hr className="m-0 mb-2" />
                <p>
                  Sold:
                  <span>
                    <b className="mx-2">{product.sold}</b>
                  </span>
                </p>
                <hr className="m-0 mb-2" />
                <p>
                  <span>
                    Color:
                    <b className="mx-2">{product.color}</b>
                  </span>
                </p>
                <hr className="m-0 mb-2" />
                <p>
                  <span>
                    Brand:
                    <b className="mx-2">{product.brand}</b>
                  </span>
                </p>
                <hr className="m-0 mb-2" />
                {product.category && (
                  <p className="text-black">
                    <span>
                      Category:
                      <b className="mx-2">
                        {product.category.name.toUpperCase()}
                      </b>
                    </span>
                  </p>
                )}
                <hr className="m-0 mb-2" />
                {product.subCategories && (
                  <p className="">
                    Product type:
                    {product.subCategories.map((item) => (
                      <span className="text-black m-0" key={item._id}>
                        <b className="mx-2">{item.name}</b>
                      </span>
                    ))}
                  </p>
                )}
                <hr className="m-0 mb-2" />
                <span className="admin_img">
                  <img
                    alt={product.title}
                    src={
                      product.images?.length
                        ? product.images[0].url
                        : Placeholder
                    }
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
