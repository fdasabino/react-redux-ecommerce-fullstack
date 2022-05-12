import React, { useState, useEffect } from "react";

import LoadingCard from "../cards/loading_card/LoadingCard";
import ProductCard from "../cards/product_card/ProductCard";

import { getProducts, getProductsCount } from "../../functions/product";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts("sold", "desc", page)
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div>
      <h4 className="text-black alert-warning p-3 my-3">Our best sellers</h4>
      {loading ? (
        <div className="col text-center">
          <div className="lds-dual-ring" />
          <LoadingCard />
        </div>
      ) : (
        <div className="row my-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="col d-flex mb-3 p-2 justify-content-center"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
      <div className="text-center">
        <Pagination
          responsive={true}
          current={page}
          total={(productsCount / 5) * 10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default BestSellers;
