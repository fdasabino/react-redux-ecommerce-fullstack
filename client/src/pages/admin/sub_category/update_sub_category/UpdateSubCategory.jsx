import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../../components/admin_side_bar/AdminSidebar";
import CategoryForm from "../../../../components/forms/category_form/CategoryForm";
import { getCategories } from "../../../../functions/category";

import {
  getSubCategory,
  updateSubCategory,
} from "../../../../functions/subCategory";
import { toast } from "react-toastify";

const UpdateSubCategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategory();
    // eslint-disable-next-line
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const loadSubCategory = () =>
    getSubCategory(match.params.slug).then((res) => {
      setName(res.data.sub.name);
      // console.log(res);
      setParent(res.data.sub.parent);
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    updateSubCategory(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Sub category "${res.data.name}" updated successfully`);
        history.push("/admin/sub-category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <AdminSidebar />
          <div className="col-md-6">
            <h4>Update Sub Category</h4>
            <hr />
            <select
              className="form-select"
              aria-label="Select a Parent Category"
              onChange={(event) => setParent(event.target.value)}
              value={parent}
            >
              <option>SELECT A PARENT CATEGORY</option>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateSubCategory;
