import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const SearchForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search; //IMPORTANT: this is the text that is being searched for
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisible(false);
    history.push(`/shop?${text}`);
  };

  return (
    <form className="d-flex search-form" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        placeholder="Search in our store..."
        aria-label="Search"
        className="form-control search-input"
      />
      <button
        className="btn ant-btn-primary search-button"
        onClick={handleSubmit}
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
