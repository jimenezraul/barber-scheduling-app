export const CATEGORY = "CATEGORY";

export const category = (cat) => {
  return {
    type: CATEGORY,
    payload: cat,
  };
};
