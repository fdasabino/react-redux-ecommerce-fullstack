import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";

const AllOrders = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row">
          <div className="accordion accordion-flush" id={`parent${order._id}`}>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading">
                <button
                  className="accordion-button border-bottom shadow p-3 mb-5 bg-body collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${order._id}`}
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <small>{new Date(order.createdAt).toDateString()}</small>

                  {order.orderStatus === "Not Processed" && (
                    <small className="mx-5 text-black">
                      <AiOutlineExclamationCircle /> Not processed
                    </small>
                  )}
                  {order.orderStatus === "Processing" && (
                    <small className="mx-5 text-info">
                      <GiSandsOfTime /> Processing
                    </small>
                  )}
                  {order.orderStatus === "Dispatched" && (
                    <small className="mx-5 text-warning">
                      <BsTruck /> Dispatched
                    </small>
                  )}
                  {order.orderStatus === "Cancelled" && (
                    <small className="mx-5 text-danger">
                      <AiOutlineCloseCircle /> Cancelled
                    </small>
                  )}
                  {order.orderStatus === "Completed" && (
                    <small className="mx-5 text-success">
                      <AiOutlineCheckCircle /> Completed
                    </small>
                  )}
                </button>
              </h2>
              <div
                id={`collapse${order._id}`}
                className="accordion-collapse collapse"
                aria-labelledby="heading"
                data-bs-parent={`parent${order._id}`}
              >
                <div className="accordion-body">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <span>Order ID: </span>
                        <small>{order._id}</small>
                      </h5>
                      <hr />
                      <h6>Customer Information:</h6>{" "}
                      <div className="row my-3 align-items-center">
                        <div className="col">
                          <h6 className="card-subtitle mb-2 text-muted">
                            {order.orderedBy}
                          </h6>
                        </div>
                        <div className="col">
                          <h6 className="card-subtitle mb-2 text-muted">
                            <span>Status: </span>
                            {order.orderStatus}
                          </h6>
                          <h6 className="card-subtitle mb-2 text-muted">
                            <span>Payment ID: </span>
                            {order.paymentIntent?.id}
                          </h6>
                          <h6 className="card-subtitle mb-2 text-muted">
                            <span>Date: </span>
                            {new Date(order.createdAt).toDateString()}
                          </h6>
                          <h6 className="card-subtitle mb-2 text-muted">
                            <span>Amount: </span>
                            {(order.paymentIntent?.amount / 100).toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "USD",
                              }
                            )}
                          </h6>
                          <h6 className="card-subtitle mb-2 text-muted">
                            <span>Method: </span>
                            {order.paymentIntent?.payment_method_types[0].toUpperCase()}
                          </h6>
                        </div>
                      </div>
                      <select
                        className="form-select form-select-lg mb-3"
                        defaultValue={order.orderStatus}
                        name="Order Status"
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option className="text-black" value="Not Processed">
                          Not Processed
                        </option>
                        <option className="text-info" value="Processing">
                          Processing
                        </option>
                        <option className="text-warning" value="Dispatched">
                          Dispatched
                        </option>
                        <option className="text-danger" value="Cancelled">
                          Cancelled
                        </option>
                        <option className="text-success" value="Completed">
                          Completed
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    {order.products.map((p, i) => (
                      <div className="col-lg-4 col-md-4 col-sm-12" key={i}>
                        <div className="card my-3 mx-1 p-2 text-center">
                          <div className="card-body">
                            <h5 className="card-title text-black">
                              {" "}
                              <b>{p.product?.title}</b>
                            </h5>
                            <p></p>
                            <hr />
                            <p className="mx-3 ">{p.product?.brand}</p>
                            <hr />
                            <p className="mx-3 ">${p.product?.price}</p>
                            <hr />
                            <p className="mx-3 ">
                              <b> Color:</b> {p.color}
                            </p>
                            <hr />
                            <p className="mx-3 ">
                              <b>Qty: </b>
                              {p.count}
                            </p>
                            <hr />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllOrders;
