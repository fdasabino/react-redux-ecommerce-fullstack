export const addressReducer = (state = false, action) => {
  switch (action.type) {
    case "SAVED_ADDRESS":
      return action.payload;
    default:
      return state;
  }
};
