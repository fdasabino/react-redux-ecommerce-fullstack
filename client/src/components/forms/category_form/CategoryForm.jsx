import React from "react";
import { Button } from "antd";
import { AiOutlineDatabase } from "react-icons/ai";

const CategoryForm = ({ handleSubmit, name, setName, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          onChange={(event) => setName(event.target.value)}
          value={name}
          placeholder="Name"
          autoFocus
          required
        />
        {loading ? (
          <div className="text-center">
            <div className="lds-dual-ring" />
          </div>
        ) : (
          <Button
            block
            type="primary"
            className="mt-3"
            onClick={handleSubmit}
            disabled={!name || name.length < 2}
          >
            <AiOutlineDatabase size={20} /> Submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
