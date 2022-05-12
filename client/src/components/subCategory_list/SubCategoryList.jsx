import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../functions/subCategory";

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories().then((res) => {
      setSubCategories(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="row">
          <div className="col text-center">
            <div className="lds-dual-ring" />
          </div>
        </div>
      ) : (
        <div className="col text-center mt-4 ">
          <ul className="d-flex justify-content-center">
            {subCategories.map((subCategory) => (
              <li key={subCategory._id} className="mx-2">
                <Link
                  to={`/sub-category/${subCategory.slug}`}
                  className="nav-link p-0"
                >
                  <div className="btn btn-outline-info">{subCategory.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubCategoryList;
