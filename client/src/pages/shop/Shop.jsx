import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  getProductsByFilter,
} from "../../functions/product";
import { getSubCategories } from "../../functions/subCategory";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../components/cards/product_card/ProductCard";
import ShopSideBar from "../../components/shop_side_bar/ShopSideBar";

import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCat, setSubCat] = useState("");
  const [star, setStar] = useState("");
  const [price, setPrice] = useState([0, 0]);
  const [brands, setBrands] = useState([
    "A.S.98",
    "Aaron Wallace",
    "Abercrombie & Fitch",
    "Adidas Originals",
    "Nike",
    "Dior",
    "Hermès",
    "H&M",
    "Tiffany & Co.",
    "Moncler",
    "Ralph Lauren",
    "PUMA",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Beige",
    "Black",
    "Blue",
    "Brown",
    "Grey",
    "Green",
    "Pink",
    "Purple",
    "Red",
    "Silver",
    "Violet",
    "White",
    "Yellow",
  ]);
  const [color, setColor] = useState("");
  const [ok, setOk] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch subcategories
    getSubCategories().then((res) => setSubCategories(res.data));
  }, []);

  const fetchProducts = (arg) => {
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    // console.log("ok to request");
    fetchProducts({ price });
  }, [ok, price]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setPrice(value);
    setStar("");
    setColor("");
    setSubCat("");
    setBrand("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setStar(num);
    setSubCat("");
    setBrand("");
    setColor("");
    fetchProducts({ stars: num });
  };

  //5 sort products by sub category name
  useEffect(() => {
    getSubCategories().then((subCategory) => {
      setSubCategories(subCategory.data);
    });
  }, []);
  const handleSubCategory = (subCategory) => {
    // console.log("SUB", subCategory);
    setSubCat(subCategory);
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setColor(""); // reset colors
    setBrand(""); // reset brands
    setStar(""); // sets rating back to default
    setPrice([0, 0]); // sets price back to default
    fetchProducts({ subCategory });
  };

  // 6.  sort products by brand name
  const handleBrand = (e) => {
    // console.log("BRAND", brand);
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setColor(""); // reset colors
    setStar(""); // sets rating back to default
    setPrice([0, 0]); // sets price back to default
    setSubCat(""); // sets sub category back to default
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  // 7.  sort products by color name
  const handleColor = (e) => {
    // console.log("Color", color);
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setStar(""); // sets rating back to default
    setPrice([0, 0]); // sets price back to default
    setSubCat(""); // sets sub category back to default
    setBrand(""); // reset brands
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  return (
    <main>
      <div className="container-fluid p-0">
        <div className="row d-flex mb-3 p-2 justify-content-center">
          <div className="col-10">
            <div className="top d-flex justify-content-between">
              <Link className="btn btn-sm ant-btn-primary mx-2" to="/">
                Back to Homepage
              </Link>
              <ShopSideBar
                price={price}
                setPrice={setPrice}
                handleSlider={handleSlider}
                handleStarClick={handleStarClick}
                star={star}
                subCat={subCat}
                subCategories={subCategories}
                handleSubCategory={handleSubCategory}
                brands={brands}
                brand={brand}
                setBrands={setBrands}
                handleBrand={handleBrand}
                colors={colors}
                color={color}
                handleColor={handleColor}
                setColors={setColors}
              />
            </div>
            {loading ? (
              <div className="row">
                <div className="col text-center">
                  <div className="lds-dual-ring" />
                </div>
              </div>
            ) : (
              <div className="col text-center ">
                {products?.length === 0 ? (
                  <h4 className="text-black alert-dark p-3 my-3">
                    No Products to Show
                  </h4>
                ) : (
                  <h4 className="text-black alert-success p-3 my-3">
                    Showing {products?.length} Products
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

export default Shop;
