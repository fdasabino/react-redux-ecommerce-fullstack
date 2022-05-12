import React from "react";
import { Link } from "react-router-dom";
import CategoryList from "../category_list/CategoryList";
import Logo from "../../images/logo.png";
import {
  FaCcVisa,
  FaCcAmex,
  FaCcMastercard,
  FaApplePay,
  FaCcDinersClub,
  FaGooglePay,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container-fluid d-flex flex-wrap justify-content-center footer py-5">
      <footer>
        {/* logo */}
        <div className="row">
          <div className="col text-center d-flex justify-content-center flex-column text-decoration-none">
            {/* logo */}
            <Link to="/">
              <img src={Logo} alt="logo" className="logo" />
            </Link>
            <p className="py-2">All rights reserved. &copy; 2021</p>
            {/* cards accepted */}
            <div className="row">
              <div className="col">
                <FaCcVisa className="mx-1" size={25} />
                <FaCcMastercard className="mx-1" size={25} />
                <FaCcDinersClub className="mx-1" size={25} />
                <FaCcAmex className="mx-1" size={25} />
                <FaApplePay className="mx-1" size={25} />
                <FaGooglePay className="mx-1" size={25} />
              </div>
            </div>
            <div className="row justify-content-center pt-3 ">
              <h6 className="text-center text-uppercase">find storeado on:</h6>
              <div className="col-12">
                <Link to="https://www.instagram.com">
                  {" "}
                  <FaInstagram
                    className="mx-1 bg-dark p-1 text-white"
                    size={30}
                  />
                </Link>
                <Link to="https://www.facebook.com">
                  {" "}
                  <FaFacebook
                    className="mx-1 bg-dark p-1 text-white"
                    size={30}
                  />
                </Link>
                <Link to="https://twitter.com">
                  <FaTwitter
                    className="mx-1 bg-dark p-1 text-white"
                    size={30}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h6 className="text-center text-uppercase pb-1">Useful Links</h6>
        <div className="row">
          <div className="col-12">
            <div className="text-center pb-2">
              <Link className=" text-black" to="/shop">
                Products
              </Link>
            </div>
          </div>
        </div>
        <div className="row flex-wrap justify-content-center">
          <div className="col-8">
            <CategoryList />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
