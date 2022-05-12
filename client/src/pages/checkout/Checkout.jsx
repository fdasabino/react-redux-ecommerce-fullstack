import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon } from "../../functions/user";
import { Badge, Tooltip } from "antd";
import { GrNext } from "react-icons/gr";
import { toast } from "react-toastify";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const [savedAddress, setSavedAddress] = useState(false);

  const dispatch = useDispatch();
  const { user, couponRedux, addressReducer } = useSelector((state) => ({ ...state }));

  console.log(savedAddress);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("User cart response: ", res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user.token]);

  const saveAddressToDb = (e) => {
    e.preventDefault();
    console.log(address1, address2, city, country, postcode);
    saveUserAddress(user.token, {
      address1,
      address2,
      city,
      country,
      postcode,
    }).then((res) => {
      if (address1 === "" || address2 === "" || city === "" || country === "" || postcode === "") {
        toast.warn("You need an address in order to continue...");
      } else if (res.data.ok) {
        //set address to redux
        dispatch({
          type: "SAVED_ADDRESS",
          payload: true,
        });

        setSavedAddress(true);
        history.push("payment");
        toast.success("Address successfully saved");
      }
    });
  };

  const emptyCart = () => {
    //remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    //remove from db
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.info("Cart removed successfully");
      setTotalAfterDiscount(0);
      setCoupon("");
      history.push("/");
    });
  };

  const applyDiscountCoupon = (e) => {
    e.preventDefault();
    // console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      // console.log("RES coupon apply: ", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });

        if (coupon) {
          toast.success(`Coupon ${coupon} applied successfully`);
        }
      }

      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  return (
    <main>
      <div className="container mt-4">
        {/* Order Summary */}
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-1">
              <Badge count={products.length} color="teal" offset={[10, 5]} showZero>
                <h4 className="text-primary">Your cart</h4>
              </Badge>
            </h4>
            <ul className="list-group mb-3">
              {/* products */}
              <div
                className="accordion accordion-flush list-group-item p-0 my-2"
                id="reviewPurchase"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button ant-btn-primary text-white p-3 collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Review your purchase
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#reviewPurchase"
                  >
                    <div className="accordion-body p-0">
                      {products.map((p, i) => (
                        <li
                          key={i}
                          className="list-group-item d-flex justify-content-between lh-sm"
                        >
                          <div>
                            <h6 className="my-0">
                              <b>{p.product.title}</b>
                              <span>
                                <small> x {p.count}</small>
                              </span>
                            </h6>
                            <small className="text-muted">{p.color}</small>
                          </div>
                          <span className="text-muted">${p.price * p.count}</span>
                        </li>
                      ))}
                      <div className="text-center">
                        <Tooltip title="Danger! All items in the cart will be removed.">
                          <button
                            onClick={emptyCart}
                            className="btn ant-btn-danger btn-sm m-2"
                            disabled={!products.length}
                          >
                            Empty Cart
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">
                    <b>Promo code</b>
                  </h6>
                </div>
                {totalAfterDiscount > 0 && (
                  <strong className="text-success">{coupon.toUpperCase()}</strong>
                )}
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>
                  <b>Total (USD)</b>
                </span>
                {!totalAfterDiscount && <strong>{`$${total},00`}</strong>}
                {totalAfterDiscount > 0 && <strong>{`$${totalAfterDiscount}`}</strong>}
              </li>
            </ul>
            {couponRedux === true ? (
              ""
            ) : (
              <div className="accordion accordion-flush list-group-item p-0 my-2" id="discountCode">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button
                      className="accordion-button ant-btn-primary text-white p-3"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Got a Discount Code?
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse show"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#discountCode"
                  >
                    <div className="accordion-body p-0">
                      {/* Coupon */}
                      <form className="card p-2">
                        <div className="input-group">
                          <input
                            onChange={(e) => {
                              setCoupon(e.target.value);
                              setDiscountError("");
                            }}
                            value={coupon}
                            type="text"
                            className="form-control"
                            placeholder="Promo code"
                          />
                          <button
                            onClick={applyDiscountCoupon}
                            type="submit"
                            className="btn ant-btn-primary"
                          >
                            Apply
                          </button>
                        </div>
                        {discountError && (
                          <small className="text-danger my-2 mx-auto">{discountError}</small>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Billing Information */}
          {!savedAddress && (
            <>
              <h3 className="block-heading">Address Information</h3>
              <div className="col-md-7 col-lg-8">
                <form>
                  <div className="row g3">
                    <div className="col-12  my-2">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setAddress1(e.target.value)}
                        value={address1}
                        id="address"
                        placeholder="1234 Main St"
                        required
                      />
                      <div className="invalid-feedback">Please enter your shipping address.</div>
                    </div>

                    <div className="col-12 my-2">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setAddress2(e.target.value)}
                        value={address2}
                        id="address2"
                        placeholder="Address 2"
                      />
                    </div>

                    <div className="col-md-5 my-2">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        id="city"
                        placeholder="City"
                        required
                      />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>

                    <div className="col-md-4 my-2">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        id="country"
                        placeholder="Country"
                        required
                      />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>

                    <div className="col-md-3 my-2">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setPostcode(e.target.value)}
                        value={postcode}
                        id="postcode"
                        placeholder="PostCode"
                        required
                      />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    className="btn ant-btn-primary btn-block my-2"
                    onClick={saveAddressToDb}
                    disabled={!products.length}
                  >
                    Save Address and Continue <GrNext />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Checkout;
