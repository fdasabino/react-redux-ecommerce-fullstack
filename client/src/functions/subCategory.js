import axios from "axios";
// get all sub categories
export const getSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/sub-categories`);

// get a single sub category
export const getSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/sub-category/${slug}`);

//remove -> admin only
export const removeSubCategory = async (slug, authtoken) =>
  await axios.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/sub-category/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );

// update -> admin only
export const updateSubCategory = async (slug, sub_category, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/sub-category/${slug}`,
    sub_category,
    {
      headers: {
        authtoken,
      },
    }
  );

// create -> admin only
export const createSubCategory = async (sub_category, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/sub-category`,
    sub_category,
    {
      headers: {
        authtoken,
      },
    }
  );
