import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../../components/admin_side_bar/AdminSidebar";
import ProductUpdateForm from "../../../../components/forms/product_update/ProductUpdateForm";
import FileUpload from "../../../../components/forms/file_upload/FileUpload";
import { getProduct, updateProduct } from "../../../../functions/product";
import { getCategories, getCategorySubs } from "../../../../functions/category";
import { toast } from "react-toastify";
import { initialState } from "../../../../initialState";
import { Link } from "react-router-dom";

const UpdateProduct = ({ history, match }) => {
  //initial state imported from ./initialState.js
  const [values, setValues] = useState(initialState);
  // initial states for category and sub-category selection
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  //redux state
  const { user } = useSelector((state) => ({ ...state }));

  //router
  const { slug } = match.params;

  //component mount
  useEffect(() => {
    loadProduct();
    loadCategories();
    // eslint-disable-next-line
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((product) => {
      // console.log("single product", product);

      // 1 load product
      setValues({ ...values, ...product.data });

      // 2 load single product category subCategories
      getCategorySubs(product.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load show subCategories
      });

      // 3 prepare array of ids to show as default at Select(ANT design)
      const array = [];

      // eslint-disable-next-line
      product.data.subCategories.map((subCategory) => {
        array.push(subCategory._id);
      });
      // console.log(array);
      setArrayOfSubs((prev) => array); //required for ant design to work
    });
  };

  const loadCategories = () =>
    getCategories().then((category) => {
      // console.log("Get categories in update", category.data);
      setCategories(category.data);
    });

  //handles the submission of all forms
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    values.category = selectedCategory ? selectedCategory : values.category;
    values.subCategories = arrayOfSubs;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`Product "${res.data.title}" updated successfully`);
        history.push("/products/:count");
      })
      .catch((err) => {
        console.log(err.response.data.err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  //handles the changing of all other forms
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(event.target.name, "---->", event.target.value);
  };

  // handles changing of parent category selection
  const handleCategoryChange = (event) => {
    event.preventDefault();

    // console.log("Clicked category: ", event.target.value);
    setValues({ ...values, subCategories: [] });

    setSelectedCategory(event.target.value);
    getCategorySubs(event.target.value).then((res) => {
      // console.log("Sub options on category clicked: ", res.data);
      setSubOptions(res.data);
    });
    // console.log("EXISTING CATEGORY values.category", values.category);

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === event.target.value) {
      loadProduct();
    }

    // clear old sub category ids
    setArrayOfSubs([]);
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <AdminSidebar />
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Update Product</h4>
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
            <ProductUpdateForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCategoryChange={handleCategoryChange}
              categories={categories}
              selectedCategory={selectedCategory}
              subOptions={subOptions}
              arrayOfSubs={arrayOfSubs}
              setArrayOfSubs={setArrayOfSubs}
              values={values}
              setValues={setValues}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateProduct;
