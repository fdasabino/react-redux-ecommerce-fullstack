import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../functions/stripe";
import { createOrder, emptyUserCart } from "../../functions/user";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsArrowRight } from "react-icons/bs";
import {
  FaCcVisa,
  FaCcAmex,
  FaCcMastercard,
  FaApplePay,
  FaCcDinersClub,
  FaGooglePay,
} from "react-icons/fa";
import { Card } from "antd";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, couponRedux } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, couponRedux).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);

      // additional information received on successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, [user.token, couponRedux]);

  const cardStyle = {
    style: {
      base: {
        color: "#000000",
        fontFamily: "Urbanist, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "13px",
        "::placeholder": {
          color: "#555",
        },
      },
      invalid: {
        color: "red",
        iconColor: "red",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: e.target.name.value },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message} `);
      setProcessing(false);
    } else {
      //get result after successful payment
      //create order and save in db for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          //empty cart from localStorage
          if (typeof window !== undefined) {
            localStorage.removeItem("cart");
          }
          //empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          //empty cart from db
          emptyUserCart(user.token);
        }
      });
      // empty user card from redux storage and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      toast.success("Payment completed successfully.");
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element and
    // display any errors as the customer types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); //show error message
  };

  return (
    <>
      {succeeded ? (
        <Card>
          <div className="text-center">
            <div className="col alert-success stripe-form mx-auto">
              <h3 className="block-heading">Payment Completed</h3>
              <h6>
                <Link to="/user/history" className="btn ant-btn-primary">
                  See Order History
                </Link>
              </h6>
            </div>
          </div>
        </Card>
      ) : (
        <div className="container">
          <h3 className="block-heading">Complete Your Purchase</h3>
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <Card hoverable>
                <h6>Total: ${`${cartTotal},00`}</h6>
              </Card>
              {!succeeded && (
                <h6>
                  {couponRedux && totalAfterDiscount !== undefined ? (
                    <BsArrowRight className="mx-5 text-success" size={25} />
                  ) : (
                    ""
                  )}
                </h6>
              )}
              {!succeeded && (
                <h6>
                  {couponRedux && totalAfterDiscount !== undefined ? (
                    <Card hoverable className="mx-1">
                      <div className="p-0">
                        <span className="text-success fw-bold">
                          Discount: - ${(cartTotal - payable / 100).toFixed(2)}
                        </span>
                        <h6 className="mt-1">
                          Payable amount: ${(payable / 100).toFixed(2)}
                        </h6>
                      </div>
                    </Card>
                  ) : (
                    ""
                  )}
                </h6>
              )}
            </div>
          </div>
          <div className="col">
            <Card hoverable className="stripe-form mx-auto my-4">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} options={cardStyle} />
                <hr />
                <button
                  className="btn ant-btn-primary text-white my-3 w-50"
                  disabled={processing || disabled || succeeded}
                >
                  Pay Now
                </button>

                {error && (
                  <div className="">
                    <hr /> <p className="text-danger my-2 mx-auto">{error}</p>
                  </div>
                )}
                <div className="row">
                  <div className="col d-flex justify-content-center">
                    <FaCcVisa className="mx-1" size={25} />
                    <FaCcMastercard className="mx-1" size={25} />
                    <FaCcDinersClub className="mx-1" size={25} />
                    <FaCcAmex className="mx-1" size={25} />
                    <FaApplePay className="mx-1" size={25} />
                    <FaGooglePay className="mx-1" size={25} />
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default StripeCheckout;
