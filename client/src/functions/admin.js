import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/admin/orders`, {
    headers: { authtoken },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: { authtoken },
    }
  );
