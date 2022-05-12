import React from "react";
import { AiOutlineDatabase } from "react-icons/ai";
import { Button, Select } from "antd";

const { Option } = Select;

const ProductForm = ({
  handleSubmit,
  handleChange,
  values,
  categories,
  selectedCategory,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  handleCategoryChange,
}) => {
  // destructure ==> names must match the original database
  const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit} className="row g-3  text-center">
      <div className="form-group col-md-6 my-1">
        <label>Product title</label>
        <input
          className="form-control"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Title"
          autoFocus
        />
      </div>

      <div className="form-group col-md-6 my-1">
        <label>Product description</label>
        <input
          className="form-control"
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>

      <div className="form-group col-md-6 my-1">
        <label>Product price</label>
        <input
          className="form-control"
          type="number"
          min="0"
          name="price"
          value={price}
          onChange={handleChange}
          placeholder="Price"
        />
      </div>

      <div className="form-group col-md-6 my-1">
        <label>Brand</label>
        <select
          className="form-select"
          name="brand"
          value={brand}
          onChange={handleChange}
        >
          <option disabled>Please Select</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group col-md-6 my-1">
        <label>Color</label>
        <select
          className="form-select"
          name="color"
          value={color}
          onChange={handleChange}
        >
          <option disabled>Please Select</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group col-md-6 my-1">
        <label>Quantity Available</label>
        <input
          className="form-control"
          type="number"
          min="0"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          placeholder="Quantity available"
        />
      </div>

      <div className="form-group col-md-6 my-1">
        <label>Shipping</label>
        <select
          className="form-select"
          name="shipping"
          value={shipping}
          onChange={handleChange}
        >
          <option disabled>Please Select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group col-md-6 my-1">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group my-1">
        <label>Sub Categories</label>
        <Select
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
          mode="multiple"
          placeholder="Please select one or more sub-categories"
          style={{ width: "100%" }}
        >
          {subOptions.length &&
            subOptions.map((subCategory) => (
              <Option value={subCategory._id} key={subCategory._id}>
                {subCategory.name}
              </Option>
            ))}
        </Select>
      </div>

      <Button
        block
        type="primary"
        icon={<AiOutlineDatabase size={20} />}
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
      >
        Update Product
      </Button>
    </form>
  );
};

export default ProductForm;
