//IMPORTS <--------------------------------------------->
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Link, useHistory } from "react-router-dom";
import { Badge, Drawer } from "antd";
import { toast } from "react-toastify";
import { getCategories } from "../../functions/category";
import SearchForm from "../forms/search_form/SearchForm";
import { getSubCategories } from "../../functions/subCategory";
import Logo from "../../images/logo.png";
import { FaUserCog, FaCogs, FaUserPlus } from "react-icons/fa";
import { VscSignOut, VscSignIn } from "react-icons/vsc";
import { BsCart } from "react-icons/bs";
import { AiOutlineMenu, AiOutlinePlus, AiOutlineUser, AiOutlineHistory } from "react-icons/ai";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    setLoading(true);
    getCategories().then((item) => {
      setCategories(item.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getSubCategories().then((res) => {
      setSubCategories(res.data);
      setLoading(false);
    });
  }, []);

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGGED_OUT_USER",
      payload: null,
    });
    setVisible(false);
    toast.success("You have been successfully logged out. We Look forward to seeing you again. 😍");
    history.push("/");
  };

  return (
    <header className="header bg-light p-3">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <AiOutlineMenu onClick={showDrawer} size={30} className="menu-icon" />
          <div className="mx-auto">
            <div className="d-flex align-items-center">
              {/* logo */}
              <Link to="/">
                <img src={Logo} alt="logo" className="logo" />
              </Link>
            </div>
          </div>
          {/* basket */}
          <Link to="/cart" onClick={onClose}>
            <Badge count={cart.length} color="teal" showZero>
              <BsCart size={25} />
            </Badge>
          </Link>
        </div>
      </nav>

      <Drawer
        title={user && user.email ? user.email : "Welcome to STOREADO"}
        placement="left"
        onClose={onClose}
        visible={visible}
        width="fit-content"
      >
        <hr />
        {/* User */}
        <div className="d-flex justify-content-around">
          {!user && (
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCog size={20} /> Login or Register
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <Link className="dropdown-item my-1" to="/login" onClick={onClose}>
                    <VscSignIn size={20} /> Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item my-1" to="/register" onClick={onClose}>
                    <FaUserPlus size={20} /> Register
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {user && user.role === "admin" ? (
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCog size={20} /> {user.email && user.role === "admin" ? "Admin" : user.email}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <Link className="dropdown-item my-1" to="/admin/dashboard" onClick={onClose}>
                    <FaUserCog size={20} /> Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item my-1" to="/admin/product" onClick={onClose}>
                    <AiOutlinePlus size={20} /> Create a Product
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item my-1" to="/products/:count" onClick={onClose}>
                    <FaCogs size={20} /> Manage Products
                  </Link>
                </li>
                <hr />
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    <VscSignOut size={20} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : null}

          {user && user.role === "subscriber" ? (
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <AiOutlineUser size={20} />
                {user.email}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <Link className="dropdown-item my-1" to="/user/history" onClick={onClose}>
                    <AiOutlineHistory size={20} /> Order History
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item my-1" to="/user/password" onClick={onClose}>
                    <FaCogs size={20} /> Change Password
                  </Link>
                </li>
                <hr />
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    <VscSignOut size={20} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : null}
          <div className="px-3">
            {/* basket */}
            <Link to="/cart" onClick={onClose}>
              <Badge count={cart.length} color="teal" showZero>
                <BsCart size={22} />
              </Badge>
            </Link>
          </div>
        </div>
        {/* User end */}
        <hr />
        {/* menu */}
        <div className="row">
          <div className="d-flex justify-content-start">
            <ul className="mb-2">
              <li className="nav-item">
                <Link to="/shop" className="text-black nav-link" onClick={onClose}>
                  Products
                </Link>
              </li>

              {loading ? (
                <div className="row">
                  <div className="col text-center">
                    <div className="lds-dual-ring" />
                  </div>
                </div>
              ) : (
                <li className="nav-item dropdown">
                  {subCategories?.length > 0 ? (
                    <button
                      className="nav-link dropdown-toggle text-black"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Products by Type
                    </button>
                  ) : (
                    <button>No Categories Found</button>
                  )}

                  <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                    {subCategories.map((subCategory) => (
                      <li key={subCategory._id} className="dropdown-item py-1">
                        <Link
                          to={`/sub-category/${subCategory.slug}`}
                          className="nav-link text-black"
                          onClick={onClose}
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}

              {loading ? (
                <div className="row">
                  <div className="col text-center">
                    <div className="lds-dual-ring" />
                  </div>
                </div>
              ) : (
                <li className="nav-item dropdown">
                  {categories?.length > 0 ? (
                    <button
                      className="nav-link dropdown-toggle text-black"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categories
                    </button>
                  ) : (
                    <button>No Categories Found</button>
                  )}

                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {categories.map((category) => (
                      <li key={category._id} className="dropdown-item py-1">
                        <Link
                          to={`/category/${category.slug}`}
                          className="nav-link text-black"
                          onClick={onClose}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
        <hr />
        {/* menu end */}
        {/* SearchForm */}
        <div className="my-3">
          <SearchForm setVisible={setVisible} />
        </div>
        {/* SearchForm end */}
      </Drawer>
    </header>
  );
};

export default Navbar;
