const setToLocalStorage = ({
  authToken,
  activeCategoryId,
  activeArticleSlug,
}) => {
  if (authToken !== undefined) {
    localStorage.setItem("authToken", JSON.stringify(authToken));
  }
  localStorage.setItem("activeCategoryId", JSON.stringify(activeCategoryId));
  localStorage.setItem("activeArticleSlug", JSON.stringify(activeArticleSlug));
};

const getFromLocalStorage = key => {
  let storedValue = null;
  try {
    storedValue = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(null));
    logger.error(error);
  }
  return storedValue;
};

export { setToLocalStorage, getFromLocalStorage };
