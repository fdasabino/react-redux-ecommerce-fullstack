import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="row">
          <div className="col text-center">
            <div className="lds-dual-ring" />
          </div>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {categories.map((category) => (
            <li key={category._id} className="mx-1">
              <Link
                to={`/category/${category.slug}`}
                className="nav-link p-0 text-black"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryList;
