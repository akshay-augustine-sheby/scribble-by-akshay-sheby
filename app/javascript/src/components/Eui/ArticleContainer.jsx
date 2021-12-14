import React, { memo, useEffect, useState } from "react";

import PropTypes from "prop-types";

import EuiContainer from "./EuiContainer";
import SideBar from "./SideBar";

import categoriesApi from "../../apis/categories";
import PageLoader from "../PageLoader";

const ArticleContainer = ({ children }) => {
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
        <SideBar
          categories={categories}
          articles={articles}
          className="w-1/5"
        />
        <div className="w-4/5 px-10 py-6">{children}</div>
      </div>
    </EuiContainer>
  );
};

ArticleContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ArticleContainer);
