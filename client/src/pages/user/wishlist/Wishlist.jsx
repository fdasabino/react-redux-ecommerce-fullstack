import React, { useEffect, useState } from "react";
import UserSidebar from "../../../components/user_side_bar/UserSidebar";
import { getWishlist, removeWishlist } from "../../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Placeholder from "../../../images/placeholder.jpg";
import { AiOutlineDelete } from "react-icons/ai";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
    // eslint-disable-next-line
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (ObjectId) =>
    removeWishlist(ObjectId, user.token)
      .then((res) => {
        loadWishlist();
      })
      .catch((err) => {
        console.log(err);
      });

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <UserSidebar />
          <div className="col-md-10">
            <h4 className="block-heading">
              {wishlist.length === 0
                ? "No Items in Your Wishlist"
                : `Your Wishlist (${wishlist.length})`}
            </h4>
            <hr />
            {wishlist.map((p) => (
              <div key={p._id} className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#wishlist${p._id}`}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div className="row">
                        <div className="col d-flex align-items-center mb-2">
                          {p.title}
                          <span
                            className="text-danger btn-sm rounded-0 border-0 mx-2"
                            onClick={() => {
                              handleRemove(p._id);
                              toast.warning(
                                `"${p.title}" has been removed from your wishlist.`
                              );
                            }}
                          >
                            <AiOutlineDelete size={18} />
                          </span>
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`wishlist${p._id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="card border-0 mb-3">
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img
                              src={
                                p.images?.length ? p.images[0].url : Placeholder
                              }
                              className="img-thumbnail"
                              alt={p.title}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">{p.title}</h5>
                              <p className="card-text">
                                {p.price.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </p>
                              <p className="card-text">{p.color}</p>
                              <p className="card-text small">{p.description}</p>
                              <Link to={`/product/${p.slug}`}>
                                <span className="btn ant-btn-primary btn-sm">
                                  More Information
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
