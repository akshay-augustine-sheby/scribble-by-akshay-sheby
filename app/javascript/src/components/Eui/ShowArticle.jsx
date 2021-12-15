import React, { useEffect, useState } from "react";

import moment from "moment-timezone";
import { useParams } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary";
import EuiContainer from "./EuiContainer";
import SideBar from "./SideBar";

import articlesApi from "../../apis/articles";
import categoriesApi from "../../apis/categories";
import { setToLocalStorage } from "../../helpers/storage";
import PageLoader from "../PageLoader";

const ShowArticle = () => {
  const [articleDetails, setArticleDetails] = useState({});
  const [category, setCategory] = useState("");
  const { slug } = useParams();
  const [initialSlug, setInitialSlug] = useState("");
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);
  const [showErrorPage, setShowErrorPage] = useState(false);

  const fetchCategoriesAndArticles = async () => {
    try {
      setLoading(true);
      const response = await categoriesApi.getCategoriesAndArticles();
      setArticles(response.data.articles);
      setCategories(response.data.categories);
      setInitialSlug(response.data.initial_slug);
      setToLocalStorage({
        activeCategoryId: response.data.initial_category_id,
        activeArticleSlug: response.data.initial_slug,
      });
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticleDetails = async slug => {
    try {
      setLoading(true);
      const response = await articlesApi.show(slug);
      setArticleDetails(response.data.article);
      setToLocalStorage({
        activeCategoryId: response.data.article.category_id,
        activeArticleSlug: slug,
      });
      setCategory(response.data.category);
      setLoading(false);
    } catch (error) {
      setShowErrorPage(true);
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesAndArticles();
  }, []);

  useEffect(() => {
    if (slug === undefined && initialSlug !== "") {
      fetchArticleDetails(initialSlug);
    } else if (slug !== undefined) {
      fetchArticleDetails(slug);
    }
  }, [slug, initialSlug]);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  } else if (showErrorPage) {
    return <ErrorBoundary />;
  }

  return (
    <EuiContainer>
      <div className="flex flex-row">
        <SideBar
          className="w-1/5"
          categories={categories}
          articles={articles}
        />
        <div className="w-4/5 px-10 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <div className="font-bold text-3xl">{articleDetails.title}</div>
              <div className="flex flex-row space-x-2 items-center">
                <div className="bg-indigo-100 text-custom-indigo py-1 px-2 font-semibold">
                  {category}
                </div>
                <div className="text-custom-grey">
                  {moment(articleDetails.published_at).format("DD MMMM, YYYY")}
                </div>
              </div>
            </div>
            <div className="whitespace-pre-wrap">{articleDetails.body}</div>
          </div>
        </div>
      </div>
    </EuiContainer>
  );
};
export default ShowArticle;
