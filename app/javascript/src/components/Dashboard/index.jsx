import React, { useState, useEffect } from "react";
//import { isNil, isEmpty, either } from "ramda";

import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import PageLoader from "components/PageLoader";

import SideBar from "./SideBar";
import Table from "./Table";

import articlesApi from "../../apis/articles";
import categoriesApi from "../../apis/categories";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      logger.info(response);
      setArticles(response.data.articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesApi.list();
      logger.info(response);
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async id => {
    try {
      await articlesApi.destroy(id);
      await fetchArticles();
    } catch (error) {
      logger.error(error);
    }
  };

  const editArticle = id => {
    history.push(`/articles/${id}/edit`);
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  } else if (either(isNil, isEmpty)(articles, categories)) {
    return (
      <Container>
        <div className="flex flex-row mt-10">
          <SideBar />
          <div className="text-xl leading-5 text-center mt-10">
            You have not created any articles 😔
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-row space-x-5">
        <SideBar articles={articles} categories={categories} />
        <div className="flex flex-col space-y-5 mt-10">
          <div className="text-lg font-bold ">Articles</div>
          <div className="">
            <Table
              articles={articles}
              deleteArticle={deleteArticle}
              editArticle={editArticle}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
