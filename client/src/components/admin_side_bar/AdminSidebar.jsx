import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Drawer, Button } from "antd";
import { FiSidebar } from "react-icons/fi";
import { AiOutlinePlus, AiFillDashboard } from "react-icons/ai";
import { BiCategoryAlt, BiCategory, BiListUl } from "react-icons/bi";
import { MdOutlineConfirmationNumber, MdPassword } from "react-icons/md";
import "./AdminSidebar.css";

const { Item } = Menu;

const Sidebar = () => {
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClick = (event) => {
    setCurrent(event.key);
  };

  return (
    <div>
      <div className="row">
        <div className="col d-flex justify-content-center my-5 mx-5 ">
          <Button
            type="primary"
            className="sidebar_open-icon"
            onClick={showDrawer}
          >
            <FiSidebar className="mx-1" size={20} /> Admin Options
          </Button>
        </div>
      </div>

      <Drawer
        title="Admin Actions"
        placement={"left"}
        width="fit-content"
        onClose={onClose}
        visible={visible}
      >
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          style={{ width: 256 }}
          mode="inline"
        >
          <Item key="dashboard" icon={<AiFillDashboard size="20" />}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Item>
          <Item key="All Products" icon={<BiListUl size="20" />}>
            <Link to="/products/:count">Products</Link>
          </Item>
          <Item key="Add a Product" icon={<AiOutlinePlus size="20" />}>
            <Link to="/admin/product">Create a Product</Link>
          </Item>
          <Item key="Category" icon={<BiCategory size="20" />}>
            <Link to="/admin/category">Manage Categories</Link>
          </Item>
          <Item key="SubCategory" icon={<BiCategoryAlt size="20" />}>
            <Link to="/admin/sub-category">Product Types</Link>
          </Item>
          <Item key="Coupons" icon={<MdOutlineConfirmationNumber size="20" />}>
            <Link to="/admin/coupon">Coupons</Link>
          </Item>
          <Item key="Password" icon={<MdPassword size="20" />}>
            <Link to="/user/password">Update Password</Link>
          </Item>
        </Menu>
      </Drawer>
    </div>
  );
};

export default Sidebar;
