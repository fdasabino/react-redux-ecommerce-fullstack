import React, { useEffect, useState } from "react";
import UserSidebar from "../../../components/user_side_bar/UserSidebar";
import { getUserOrders } from "../../../functions/user";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { GiSandsOfTime } from "react-icons/gi";
import { BsTruck } from "react-icons/bs";
import PaymentInformation from "../../../components/payment_information/PaymentInformation";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
    // eslint-disable-next-line
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInAccordion = (order) => (
    <>
      {orders && (
        <div className="accordion m-0" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id={`collapse${order._id}`}>
              <Tooltip title={`Order number: ${order._id}`}>
                <button
                  className="accordion-button text-black p-3"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#outside${order._id}`}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <div className="row mx-4 w-100 text-center">
                    <div className="col-12">
                      <span>{new Date(order.createdAt).toDateString()}</span>
                      <div className="col-12 py-2">
                        <span>
                          {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="col-12">
                      <span>
                        {order.orderStatus === "Not Processed" && (
                          <span className="text-black">
                            <AiOutlineExclamationCircle /> Not processed
                          </span>
                        )}
                        {order.orderStatus === "Processing" && (
                          <span className="text-info">
                            <GiSandsOfTime /> Processing
                          </span>
                        )}
                        {order.orderStatus === "Dispatched" && (
                          <span className="text-warning">
                            <BsTruck /> Dispatched
                          </span>
                        )}
                        {order.orderStatus === "Cancelled" && (
                          <span className="text-danger">
                            <AiOutlineCloseCircle /> Cancelled
                          </span>
                        )}
                        {order.orderStatus === "Completed" && (
                          <span className="text-success">
                            <AiOutlineCheckCircle /> Completed
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </button>
              </Tooltip>
            </h2>
            <div
              id={`outside${order._id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`collapse${order._id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="accordion text-center" id="accordionExample">
                  <div className="accordion-item border-0 my-2">
                    <div className="row text-center justify-content-center">
                      <h5>
                        <b>Ordered Products:</b>
                      </h5>
                      {order.products.map((p, i) => (
                        <div
                          key={i}
                          className="mx-1 col-lg-3 col-md-6 col-sm-12 card text-center my-1 p-2"
                        >
                          <p>
                            <b>{p.product?.title}</b>
                          </p>
                          <p className="mx-3">{p.product?.brand}</p>
                          <p className="mx-3">${p.product?.price}</p>
                          <p className="mx-3">
                            <b> Color:</b> {p.color}
                          </p>
                          <p className="mx-3 ">
                            <b>Qty: </b>
                            {p.count}
                          </p>
                          <p className="mx-3 ">
                            {p.product?.shipping === "Yes" ? (
                              <AiOutlineCheckCircle size={20} color="green" />
                            ) : (
                              <AiOutlineCloseCircle size={20} color="red" />
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <h5>
                    <b>Payment Details:</b>
                  </h5>
                  <PaymentInformation order={order} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const showEachOrder = () =>
    orders.map((order, i) => (
      <div key={i} className="mt-2">
        <div className="row">
          <div className="col">{showOrderInAccordion(order)}</div>
        </div>
      </div>
    ));

  return (
    <main>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <UserSidebar />

          <div className="col-md-10">
            <h4 className="block-heading">
              {orders.length > 0 || orders
                ? `Your order summary (${orders.length})`
                : "No orders to show"}
            </h4>
            <hr />
            {showEachOrder().reverse()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderHistory;
