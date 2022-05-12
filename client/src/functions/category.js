import axios from "axios";
// get all categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/categories`);

// get a single category
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/category/${slug}`);

//remove -> admin only
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

// update -> admin only
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );

// create -> admin only
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/category`, category, {
    headers: {
      authtoken,
    },
  });

// get a single category based on a parent category
export const getCategorySubs = async (_id) =>
  await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/category/sub-category/${_id}`
  );
