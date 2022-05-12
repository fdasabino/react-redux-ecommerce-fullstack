import React from "react";
import Slider from "../../components/slider/Slider";
import LatestProducts from "../../components/latest_products/LatestProducts";
import BestSellers from "../../components/best_sellers/BestSellers";

const Home = () => {
  return (
    <main>
      <div className="container-fluid p-0">
        <div className="row">
          <Slider />
        </div>

        {/* latest products */}
        <div className="px-5 bg-light rounded-3">
          <div className="container-fluid py-3">
            <LatestProducts />
          </div>
        </div>

        {/* best sellers */}
        <div className="px-5 bg-light rounded-3">
          <div className="container-fluid py-3">
            <BestSellers />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
