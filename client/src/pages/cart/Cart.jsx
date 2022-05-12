import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardCheckout from "../../components/cart_details/CartDetails";
import { userCart } from "../../functions/user";
import EmptyCart from "../../images/empty-cart.png";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("Cart", JSON.stringify(cart));
    userCart(cart, user.token)
      .then((res) => {
        // console.log("Cart saved to database: ", res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => {
        console.log("cart save error: ", err);
      });
  };

  return (
    <main>
      <section className="shopping-cart">
        <div className="container">
          {!cart.length ? (
            <div className="row">
              <div className="col d-flex flex-column justify-content-center">
                <img
                  src={EmptyCart}
                  alt="empty-cart"
                  className="mt-4 mx-auto empty-cart"
                />
                <h3 className="block-heading p-1">
                  Oops! Your cart is empty - but it does not have to be
                </h3>

                <Link to="/shop" className="btn ant-btn-primary mx-auto">
                  Products Page
                </Link>
              </div>
            </div>
          ) : (
            <div className="content">
              <div className="row">
                <div className="block-heading">
                  <h3>
                    Shopping Cart{" "}
                    {cart.length > 1
                      ? ` | ${cart.length} Products`
                      : ` | ${cart.length} Product`}
                  </h3>
                </div>
                <div className="col-md-12 col-lg-8">
                  <div className="items">
                    {cart.map((p) => (
                      <ProductCardCheckout key={p._id} p={p} />
                    ))}
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <div className="summary">
                    <h3>Summary</h3>
                    <div className="summary-item">
                      <span className="text">Products</span>
                      <span className="price">{cart.length}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Subtotal</span>
                      <span className="price">
                        {" "}
                        {getTotal().toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>
                    <div className="summary-item mt-1">
                      <span className="text">Total</span>
                      <span className="price">
                        <b>
                          {" "}
                          {getTotal().toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </b>
                      </span>
                    </div>
                    {user ? (
                      <button
                        onClick={saveOrderToDb}
                        type="button"
                        className="btn ant-btn-primary btn-block my-2"
                        disabled={!cart.length}
                      >
                        Checkout
                      </button>
                    ) : (
                      <Link
                        to={{ pathname: "/login", state: { from: "cart" } }}
                        className="btn ant-btn-primary btn-block my-2"
                      >
                        Login to Checkout
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cart;
