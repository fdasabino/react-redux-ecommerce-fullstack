import React from "react";
import { AiOutlineDatabase } from "react-icons/ai";
import { Button, Select } from "antd";

const { Option } = Select;

const ProductForm = ({
  handleSubmit,
  handleChange,
  handleCategoryChange,
  showSubCategory,
  subOptions,
  values,
  setValues,
}) => {
  // destructure ==> names must match the original database
  const {
    title,
    description,
    price,
    categories,
    subCategories,
    shipping,
    quantity,
    colors,
    brands,
  } = values;

  return (
    <form onSubmit={handleSubmit} className="row g-3 text-center">
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
        <select className="form-select" name="brand" onChange={handleChange}>
          <option>Please Select</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group col-md-6 my-1">
        <label>Color</label>
        <select className="form-select" name="color" onChange={handleChange}>
          <option>Please Select</option>
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
        <label>Product Category</label>
        <select
          className="form-select"
          name="category"
          aria-label="Select a Parent Category"
          onChange={handleCategoryChange}
        >
          <option defaultValue>Please select</option>
          {categories?.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group col-md-6 my-1">
        <label>Shipping</label>
        <select
          className="form-select"
          name="shipping"
          value={shipping}
          onChange={handleChange}
        >
          <option>Please Select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {showSubCategory && (
        <div className="form-group my-1">
          <label>Product Type</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select one or more options..."
            value={subCategories}
            onChange={(value) => setValues({ ...values, subCategories: value })}
          >
            {subOptions.length &&
              subOptions.map((subCategory) => (
                <Option value={subCategory._id} key={subCategory._id}>
                  {subCategory.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <Button
        block
        type="primary"
        icon={<AiOutlineDatabase size={20} />}
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
      >
        Save Product
      </Button>
    </form>
  );
};

export default ProductForm;
