import React from "react";

const ShowPaymentInfo = ({ order }) => (
  <div>
    <p className="m-0">
      <span className="border p-1 px-2 ">
        <b>Order Id:</b> {order.paymentIntent.id}
      </span>
      {"  "}
      <span className="border p-1 px-2">
        <b>Amount:</b>
        {"  "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "INR",
        })}
      </span>
      {"  "}
      <span className="border p-1 px-2">
        <b>Currency:</b> {order.paymentIntent.currency.toUpperCase()}
      </span>
      {"  "}
      <span className="border p-1 px-2">
        <b>Method:</b> {order.paymentIntent.payment_method_types[0]}
      </span>
      {"  "}
      <span className="border p-1 px-2">
        <b>Payment:</b> {order.paymentIntent.status.toUpperCase()}
      </span>
      {"  "}
      <span className="border p-1 px-2">
        <b>Orderd on:</b>
        {"  "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {"  "}
      <span className="badge bg-primary text-white  my-3">
        <span className="p-2 h6"> STATUS: {order.orderStatus}</span>
      </span>
    </p>
  </div>
);

export default ShowPaymentInfo;
