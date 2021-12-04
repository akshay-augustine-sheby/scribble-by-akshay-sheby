import React, { useState, useEffect, createContext } from "react";

import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import PageLoader from "components/PageLoader";

import SideBar from "./SideBar";
import Table from "./Table";

import articlesApi from "../../apis/articles";
import categoriesApi from "../../apis/categories";
import CreateArticle from "../Articles/CreateArticle";
import EditArticle from "../Articles/EditArticle";

const CategoryContext = createContext();

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editArticlePage, setEditArticlePage] = useState(false);
  const [createArticlePage, setCreateArticlePage] = useState(false);
  const [articleId, setArticleId] = useState("");
  const [articleDetails, setArticleDetails] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [categoryArticlesCount, setCategoryArticlesCount] = useState(0);

  const fetchArticles = async () => {
    try {
      const response = await articlesApi.list();
      setArticles(response.data.articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getArticlesCount = async () => {
    try {
      const response = await articlesApi.getCount();
      setTotalCount(response.data.total_count);
      setDraftCount(response.data.draft_count);
      setPublishedCount(response.data.published_count);
      setCategoryArticlesCount(response.data.category_articles_count);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticleDetails = async articleId => {
    try {
      setLoading(true);
      const response = await articlesApi.show(articleId);
      setArticleDetails(response.data.article);
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
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async () => {
    setCreateArticlePage(true);
    await getArticlesCount();
  };

  const deleteArticle = async id => {
    try {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        setLoading(true);
        await articlesApi.destroy(id);
        await fetchArticles();
        await getArticlesCount();
        setLoading(false);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  const editArticle = async id => {
    setArticleId(id);
    setEditArticlePage(true);
    await getArticlesCount();
  };

  const handleCreateCategory = async categoryName => {
    try {
      setLoading(true);
      await categoriesApi.create({
        category: {
          name: categoryName,
        },
      });
      setLoading(false);
      fetchArticles();
      fetchCategories();
      getArticlesCount();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
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
    getArticlesCount();
  }, []);

  useEffect(() => {
    setFilteredArticles([...articles]);
  }, [articles]);

  useEffect(() => {
    fetchArticleDetails(articleId);
  }, [articleId]);

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
            totalCount={totalCount}
            draftCount={draftCount}
            publishedCount={publishedCount}
            categoryArticlesCount={categoryArticlesCount}
            handleCreateCategory={handleCreateCategory}
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
      <CategoryContext.Provider value={categories}>
        {editArticlePage && (
          <EditArticle
            setEditArticlePage={setEditArticlePage}
            editArticlePage={editArticlePage}
            loading={loading}
            setLoading={setLoading}
            fetchArticles={fetchArticles}
            fetchArticleDetails={fetchArticleDetails}
            articleId={articleId}
            articleDetails={articleDetails}
          />
        )}
        {createArticlePage && (
          <CreateArticle
            setCreateArticlePage={setCreateArticlePage}
            loading={loading}
            setLoading={setLoading}
            fetchArticles={fetchArticles}
            getArticlesCount={getArticlesCount}
          />
        )}
        {!createArticlePage && !editArticlePage && (
          <div className="flex flex-row">
            <SideBar
              categories={categories}
              handleAllArticles={handleAllArticles}
              handleDraftArticles={handleDraftArticles}
              handlePublishedArticles={handlePublishedArticles}
              handleCategories={handleCategories}
              totalCount={totalCount}
              draftCount={draftCount}
              publishedCount={publishedCount}
              categoryArticlesCount={categoryArticlesCount}
              handleCreateCategory={handleCreateCategory}
            />
            <div className="w-full p-5">
              <Table
                articles={[...filteredArticles]}
                deleteArticle={deleteArticle}
                editArticle={editArticle}
                createArticle={createArticle}
              />
            </div>
          </div>
        )}
      </CategoryContext.Provider>
    </Container>
  );
};

export default Dashboard;
export { CategoryContext };
