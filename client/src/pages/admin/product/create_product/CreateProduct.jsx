import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../../components/admin_side_bar/AdminSidebar";
import ProductCreateForm from "../../../../components/forms/product_create/ProductCreateForm";
import FileUpload from "../../../../components/forms/file_upload/FileUpload";
import { createProduct } from "../../../../functions/product";
import { getCategories, getCategorySubs } from "../../../../functions/category";
import { toast } from "react-toastify";
import { initialState } from "../../../../initialState";
import { Link } from "react-router-dom";

const CreateProduct = ({ history }) => {
  //initial state imported from ./initialState.js
  const [values, setValues] = useState(initialState);

  // initial states for category and sub-category selection
  const [subOptions, setSubOptions] = useState([]);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [loading, setLoading] = useState(false);

  //redux state
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line
  }, []);
  const loadCategories = () =>
    getCategories().then((category) =>
      setValues({ ...values, categories: category.data })
    );

  //handles the submission of all forms
  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success(`Product "${res.data.title}" created successfully`);
        history.push("/products/:count");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  //handles the changing of all other forms
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(event.target.name, "---->", event.target.value);
  };

  // handles changing of parent category selection
  const handleCategoryChange = (event) => {
    event.preventDefault();
    console.log("Clicked category: ", event.target.value);
    setValues({ ...values, subCategories: [], category: event.target.value });
    getCategorySubs(event.target.value).then((res) => {
      console.log("Sub options on category clicked: ", res.data);
      setSubOptions(res.data);
    });
    setShowSubCategory(true);
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <AdminSidebar />
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Create a Product</h4>
              <Link className="btn ant-btn-primary mx-2" to="/products/:count">
                Back to Products
              </Link>
            </div>
            {loading && <div className="lds-dual-ring" />}
            <hr />
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
            <hr />
            <ProductCreateForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCategoryChange={handleCategoryChange}
              subOptions={subOptions}
              showSubCategory={showSubCategory}
              values={values}
              setValues={setValues}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateProduct;
