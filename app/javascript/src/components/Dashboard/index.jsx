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
  const [filteredArticles, setFilteredArticles] = useState([]);
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

  const handleAllArticles = () => {
    setFilteredArticles([...articles]);
  };

  const handleDraftArticles = () => {
    const articlesNew = articles.filter(article => {
      return article.status === "draft";
    });
    setFilteredArticles([...articlesNew]);
  };

  const handlePublishedArticles = () => {
    const articlesNew = articles.filter(article => {
      return article.status === "published";
    });
    setFilteredArticles([...articlesNew]);
  };

  const handleCategories = categoryId => {
    const articlesNew = articles.filter(article => {
      return article.category_id === categoryId;
    });
    setFilteredArticles([...articlesNew]);
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredArticles([...articles]);
  }, [articles]);

  useEffect(() => {});

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  } else if (either(isNil, isEmpty)(filteredArticles, categories)) {
    return (
      <Container>
        <div className="flex flex-row space-x-5">
          <SideBar
            categories={categories}
            handleAllArticles={handleAllArticles}
            handleDraftArticles={handleDraftArticles}
            handlePublishedArticles={handlePublishedArticles}
            handleCategories={handleCategories}
          />
          <div className="w-full text-xl leading-5 text-center mt-10">
            You have not created any articles 😔
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-row">
        <SideBar
          categories={categories}
          handleAllArticles={handleAllArticles}
          handleDraftArticles={handleDraftArticles}
          handlePublishedArticles={handlePublishedArticles}
          handleCategories={handleCategories}
        />
        {filteredArticles === [] && <div>None</div>}
        {filteredArticles !== [] && (
          <div className="w-full p-5">
            <Table
              articles={[...filteredArticles]}
              deleteArticle={deleteArticle}
              editArticle={editArticle}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
