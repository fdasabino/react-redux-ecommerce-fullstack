import React from "react";

const PaymentInformation = ({ order }) => {
  return (
    <div>
      <div className="d-flex flex-column">
        <span>
          <b>Reference: </b> {order.paymentIntent.id}
        </span>
        <span>
          <b>Amount: </b>
          {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <span>
          <b>Currency: </b> {order.paymentIntent.currency.toUpperCase()}
        </span>
        <span>
          <b>Method: </b>{" "}
          {order.paymentIntent.payment_method_types[0].toUpperCase()}
        </span>
        <span>
          <b>Payment Status: </b> {order.paymentIntent.status.toUpperCase()}
        </span>
        <span>
          <b>Date Ordered: </b>{" "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
        <span>
          <b>Status: </b> {order.orderStatus}
        </span>
      </div>
    </div>
  );
};

export default PaymentInformation;
