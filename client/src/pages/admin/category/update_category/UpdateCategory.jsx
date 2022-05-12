import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../../components/admin_side_bar/AdminSidebar";
import CategoryForm from "../../../../components/forms/category_form/CategoryForm";
import { getCategory, updateCategory } from "../../../../functions/category";
import { toast } from "react-toastify";

const UpdateCategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
    // eslint-disable-next-line
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((res) => {
      const { name } = res.data.category;
      // console.log("category name: ", name);
      // console.log("slug data: ", match.params.slug);
      setName(name);
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Category "${res.data.name}" updated successfully`);
        history.push("/admin/category");
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
            <h4>Update Category</h4>
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

export default UpdateCategory;
