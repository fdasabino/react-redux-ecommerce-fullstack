import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../../components/admin_side_bar/AdminSidebar";
import CategoryForm from "../../../../components/forms/category_form/CategoryForm";
import LocalSearch from "../../../../components/forms/local_search/LocalSearch";
import { getCategories } from "../../../../functions/category";
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory,
} from "../../../../functions/subCategory";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const CreateSubCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));
  const loadSubCategories = () =>
    getSubCategories().then((sub_category) =>
      setSubCategories(sub_category.data)
    );

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    createSubCategory({ name, parent: category }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Sub category "${res.data.name}" created successfully`);
        loadSubCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword);

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to remove this sub-category?")) {
      setLoading(true);
      removeSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.warn(`"${res.data.name}" removed successfully from database`);
          loadSubCategories();
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <AdminSidebar />
          <div className="col-md-6">
            <h4>Create a Product Type</h4>
            <hr />
            <select
              className="form-select"
              aria-label="Select a Parent Category"
              onChange={(event) => setCategory(event.target.value)}
            >
              <option defaultValue>SELECT A PARENT CATEGORY</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name.toUpperCase()}
                  </option>
                ))}
            </select>

            <hr />
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              loading={loading}
            />
            <hr />

            <LocalSearch setKeyword={setKeyword} keyword={keyword} />

            <hr />
            {subCategories.filter(searched(keyword)).map((subCategory) => (
              <div className="row" key={subCategory._id}>
                <div className="col">
                  <div className="list-group">
                    <div className="alert alert-success d-flex align-items-center justify-content-between mb-2 ">
                      <h6>{subCategory.name.toUpperCase()}</h6>
                      <div>
                        <span className="btn btn-sm">
                          <Link to={`/admin/sub-category/${subCategory.slug}`}>
                            <AiOutlineEdit className="text-black" size={20} />
                          </Link>
                        </span>
                        <span
                          onClick={() => handleRemove(subCategory.slug)}
                          className="btn btn-sm"
                        >
                          <AiOutlineDelete className="text-danger" size={20} />
                        </span>
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

export default CreateSubCategory;
