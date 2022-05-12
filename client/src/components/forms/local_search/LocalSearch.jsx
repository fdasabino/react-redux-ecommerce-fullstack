import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (event) => {
    event.preventDefault();
    setKeyword(event.target.value.toLowerCase());
  };

  return (
    <div className="accordion accordion-flush my-2" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header text-center" id="flush-headingOne">
          <button
            className="accordion-button collapsed ant-btn-primary text-black py-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            <b>
              <AiOutlineSearch /> Search & Filter{" "}
            </b>
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <input
              type="search"
              placeholder="Search & Filter..."
              value={keyword}
              onChange={handleSearchChange}
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalSearch;
