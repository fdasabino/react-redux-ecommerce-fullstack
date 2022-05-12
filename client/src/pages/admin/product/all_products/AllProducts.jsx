import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSidebar from "../../../../components/admin_side_bar/AdminSidebar";
import AdminProductCard from "../../../../components/cards/admin_product_card/AdminProductCard";
import LocalSearch from "../../../../components/forms/local_search/LocalSearch";

import {
  getProductsByCount,
  removeProduct,
} from "../../../../functions/product";

const AllProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      setLoading(true);
      removeProduct(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.warn(`"${res.data.title}" removed successfully from database`);
          loadAllProducts();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (product) =>
    product.title.toLowerCase().includes(keyword);

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-12 text-center my-2">
            <h4>Admin Panel - All Products</h4>
          </div>
          <AdminSidebar />
          <div className="col-10">
            <div className="row">
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
              <LocalSearch setKeyword={setKeyword} keyword={keyword} />
            </div>
            <hr />
            <div className="row">
              {loading && <div className="lds-dual-ring" />}
              {products.filter(searched(keyword)).map((product) => (
                <AdminProductCard
                  key={product._id}
                  product={product}
                  handleRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllProducts;
