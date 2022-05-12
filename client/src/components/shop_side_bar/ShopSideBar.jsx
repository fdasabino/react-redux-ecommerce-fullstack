import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { Button, Drawer, Space, Menu, Slider, Radio } from "antd";
import {
  AiOutlineDollar,
  AiOutlineStar,
  AiOutlineTrademarkCircle,
  AiOutlineBgColors,
  AiOutlineFilter,
} from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
const { SubMenu } = Menu;

const ShopSideBar = ({
  price,
  handleSlider,
  handleStarClick,
  subCategories,
  handleSubCategory,
  brands,
  brand,
  handleBrand,
  colors,
  color,
  handleColor,
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        className="btn btn-sm ant-btn-primary "
        onClick={showDrawer}
      >
        <AiOutlineFilter size={20} /> Search & Filter
      </Button>
      <Drawer
        title="Search & Filter"
        placement={"left"}
        width="fit-content"
        onClose={onClose}
        visible={visible}
      >
        <Space>
          <Menu
            style={{ width: 270 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["1", "2", "3"]}
            mode="inline"
          >
            {/* price */}
            <SubMenu
              key="1"
              icon={<AiOutlineDollar size={25} />}
              title="Sort by Price Range"
              className="my-3"
            >
              <Slider
                range
                tipFormatter={(v) => `$ ${v}`}
                value={price}
                onChange={handleSlider}
                max={999}
                className="my-3"
              />
            </SubMenu>

            {/* star rating*/}
            <SubMenu
              key="2"
              icon={<AiOutlineStar size={25} />}
              title="Sort by Rating"
              className="my-3"
            >
              <StarRatings
                className="my-3"
                starRatedColor="gold"
                starHoverColor="teal"
                starEmptyColor="gold"
                numberOfStars={5}
                changeRating={handleStarClick}
              />
            </SubMenu>

            {/* sub category */}
            <SubMenu
              key="3"
              icon={<BiCategoryAlt size={25} />}
              title="Sort by Type"
              className="my-3"
            >
              {subCategories?.map((subCategory) => (
                <Button
                  onClick={() => handleSubCategory(subCategory)}
                  key={subCategory._id}
                  type="dashed"
                  size={"small"}
                  className="m-1"
                >
                  {subCategory.name}
                </Button>
              ))}
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="4"
              icon={<AiOutlineTrademarkCircle size={25} />}
              title="Sort by Brand"
              className="my-3"
            >
              {brands?.map((b) => (
                <Radio
                  key={b}
                  name={b}
                  value={b}
                  checked={b === brand}
                  onChange={handleBrand}
                  className="d-flex"
                >
                  {b}
                </Radio>
              ))}
            </SubMenu>

            {/* color */}
            <SubMenu
              key="5"
              icon={<AiOutlineBgColors size={25} />}
              title="Sort by Color"
              className="my-3"
            >
              {colors?.map((c) => (
                <Radio
                  key={c}
                  name={c}
                  value={c}
                  checked={c === color}
                  onChange={handleColor}
                  className="d-flex"
                >
                  {c}
                </Radio>
              ))}
            </SubMenu>
          </Menu>
        </Space>
      </Drawer>
    </>
  );
};

export default ShopSideBar;
