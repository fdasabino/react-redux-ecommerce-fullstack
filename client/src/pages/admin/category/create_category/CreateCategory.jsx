import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminSidebar from "../../../../components/admin_side_bar/AdminSidebar";
import CategoryForm from "../../../../components/forms/category_form/CategoryForm";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../../functions/category";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import LocalSearch from "../../../../components/forms/local_search/LocalSearch";

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // step 1:
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Category "${res.data.name}" created successfully`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to remove this category?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.warn(`"${res.data.name}" removed successfully from database`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword);

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <AdminSidebar />
          <div className="col-md-6">
            <h4>Create a Parent Category</h4>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              loading={loading}
            />
            <hr />

            <LocalSearch setKeyword={setKeyword} keyword={keyword} />

            <hr />
            {categories.filter(searched(keyword)).map((category) => (
              <div className="row" key={category._id}>
                <div className="col">
                  <div className="list-group">
                    <div className="alert alert-success d-flex align-items-center justify-content-between mb-2 ">
                      <h6>{category.name.toUpperCase()}</h6>
                      <div>
                        <span className="btn btn-sm">
                          <Link to={`/admin/category/${category.slug}`}>
                            <AiOutlineEdit className="text-black" size={20} />
                          </Link>
                        </span>
                        <span
                          onClick={() => handleRemove(category.slug)}
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

export default CreateCategory;
