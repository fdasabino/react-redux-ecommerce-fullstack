import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Drawer, Button } from "antd";
import { AiOutlineHistory, AiOutlineStar } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { useSelector } from "react-redux";

const { Item } = Menu;
const Sidebar = () => {
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

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
          <Button type="primary" className="sidebar_open-icon" onClick={showDrawer}>
            User Options
          </Button>
        </div>
      </div>

      <Drawer
        title={user.email}
        placement={"left"}
        width="fit-content"
        onClose={onClose}
        visible={visible}
      >
        <Menu onClick={handleClick} selectedKeys={[current]} style={{ width: 256 }} mode="inline">
          <Item key="order_history" icon={<AiOutlineHistory size="20" />}>
            <Link to="/user/history">Order History</Link>
          </Item>

          <Item key="wishlist" icon={<AiOutlineStar size="20" />}>
            <Link to="/user/wishlist">Wishlist</Link>
          </Item>

          <Item key="change_password" icon={<MdPassword size="20" />}>
            <Link to="/user/password">Change Password</Link>
          </Item>
        </Menu>
      </Drawer>
    </div>
  );
};

export default Sidebar;
