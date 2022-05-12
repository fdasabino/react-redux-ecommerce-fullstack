import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin_side_bar/AdminSidebar";
import { getOrders, changeStatus } from "../../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AllOrders from "../../../components/all_orders/AllOrders";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Order status updated");
      loadOrders();
    });
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <AdminSidebar />
          <div className="col-md-10">
            <div className="d-flex justify-content-center align-items-center">
              <Link className="btn ant-btn-primary mx-2" to="/admin/product">
                Create a Product
              </Link>
              <Link className="btn ant-btn-primary mx-2" to="/admin/category">
                Manage Categories
              </Link>
              <Link
                className="btn ant-btn-primary mx-2"
                to="/admin/sub-category"
              >
                Product Types
              </Link>
            </div>
            <hr />
            <h4>Admin Dashboard - Latest Orders</h4>
            <hr />
            <AllOrders
              user={user}
              orders={orders}
              handleStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
