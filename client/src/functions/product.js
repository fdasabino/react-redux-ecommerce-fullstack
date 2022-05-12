import axios from "axios";

// create -> admin only
export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/product/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );

export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/products/total`);

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelatedProducts = async (productId) =>
  await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/product/related/${productId}`
  );

export const getProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/search/filters`, arg);
