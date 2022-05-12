import React, { useState, useEffect } from "react";
import { getSubCategory } from "../../functions/subCategory";
import ProductCard from "../../components/cards/product_card/ProductCard";
import { Link } from "react-router-dom";

const SubCategoriesHome = ({ match }) => {
  const [subCategory, setSubCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSubCategory(slug).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setSubCategory(res.data.sub); // res.data.sub_category from controller
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <main>
      <div className="container-fluid p-0">
        <div className="row d-flex mb-3 p-2 justify-content-center">
          <div className="col-10">
            <Link className="btn btn-sm ant-btn-primary" to="/">
              Back to the homepage
            </Link>
            {loading ? (
              <div className="row">
                <div className="col text-center">
                  <div className="lds-dual-ring" />
                </div>
              </div>
            ) : (
              <div className="col text-center ">
                {products?.length === 0 ? (
                  <div className="">
                    <h4 className="text-black alert-dark p-2 my-3">
                      Oops! Nothing to see in this page....
                    </h4>
                  </div>
                ) : (
                  <h4 className="text-black alert-success p-2 my-3">
                    {products?.length > 1
                      ? `${products?.length} Similar Products to "${subCategory.name}"`
                      : `${products?.length} Similar Product to "${subCategory.name}"`}
                  </h4>
                )}
              </div>
            )}
            <div className="row">
              <div className="col d-flex flex-wrap p-2 justify-content-center">
                {products?.map((product) => (
                  <div key={product._id} className="m-3">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubCategoriesHome;
