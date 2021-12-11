import React, { useEffect, useState } from "react";

import EuiContainer from "./EuiContainer";
import SideBar from "./SideBar";

import categoriesApi from "../../apis/categories";
import PageLoader from "../PageLoader";

const Welcome = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCategoriesAndArticles = async () => {
    try {
      setLoading(true);
      const response = await categoriesApi.getCategoriesAndArticles();
      setArticles(response.data.articles);
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesAndArticles();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <EuiContainer>
      <div className="flex flex-row">
        <SideBar categories={categories} articles={articles} />
        <div>Welcome</div>
      </div>
    </EuiContainer>
  );
};
export default Welcome;
