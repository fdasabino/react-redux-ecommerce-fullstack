import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin_side_bar/AdminSidebar";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { AiOutlineDelete } from "react-icons/ai";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import { Link } from "react-router-dom";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        return console.log("create coupon err", err);
      });
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Would like to delete this coupon?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <AdminSidebar />
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Create a Coupon</h4>
              <Link className="btn ant-btn-primary mx-2" to="/products/:count">
                Back to Products
              </Link>
            </div>
            {loading && <div className="lds-dual-ring" />}
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Name"
                    aria-label="Discount Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    autoFocus
                  />
                  <small>Choose a Discount Name</small>{" "}
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control my-2"
                      placeholder="Amount %"
                      aria-label="Amount %"
                      onChange={(e) => setDiscount(e.target.value)}
                      value={discount}
                      required
                    />
                  </div>
                  <small>No need to type %</small>{" "}
                </div>
                <div className="col-md-4 text-center">
                  <DatePicker
                    className="form-control my-2"
                    selected={expiry}
                    value={expiry}
                    placeholderText="Expiry Date"
                    onChange={(date) => setExpiry(date)}
                    required
                  />
                  <small>Pick expiry date</small>{" "}
                </div>
              </div>
              <button className="btn ant-btn-primary my-3">
                Create Coupon
              </button>
            </form>
            <hr />
            {coupons.map((cp) => (
              <div
                key={cp._id}
                className="accordion accordion-flush "
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed alert-success mb-2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${cp.name}`}
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      {/* action buttons */}
                      <div>
                        <Tooltip title="Remove this Coupon?">
                          <AiOutlineDelete
                            size={20}
                            className="text-danger mx-2"
                            onClick={() => handleRemove(cp._id)}
                          />
                        </Tooltip>
                      </div>
                      <div className="mx-1">{cp.name}</div>
                    </button>
                  </h2>
                  <div
                    id={cp.name}
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col d-flex justify-content-evenly">
                          <span>
                            Name:
                            <p>
                              <b>{cp.name}</b>
                            </p>
                          </span>
                          <span>
                            Amount:
                            <p>
                              <b>{cp.discount}%</b>
                            </p>
                          </span>
                          <span>
                            Expires on:
                            <p>
                              <b>{new Date(cp.expiry).toLocaleDateString()}</b>
                            </p>
                          </span>
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

export default CreateCouponPage;
