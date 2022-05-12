import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/product_card/ProductCard";
import { Link } from "react-router-dom";

const CategoryPage = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
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
              Back to Homepage
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
                  <h4 className="text-black alert-dark p-2 my-3">
                    No Products in this category
                  </h4>
                ) : (
                  <h4 className="text-black alert-success p-2 my-3">
                    {products?.length > 1
                      ? `${products?.length} "Products in "${category.name}" category`
                      : `${products?.length} "Product in "${category.name}" category`}
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

export default CategoryPage;
