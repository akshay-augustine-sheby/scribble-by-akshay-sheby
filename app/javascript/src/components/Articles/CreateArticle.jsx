import React, { useState } from "react";

import ArticleForm from "./ArticleForm";

import articlesApi from "../../apis/articles";

const CreateArticle = ({
  setCreateArticlePage,
  loading,
  setLoading,
  fetchArticles,
  getArticlesCount,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  const handleSave = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await articlesApi.create({
        article: {
          title: title,
          body: body,
          status: status,
          category_id: categoryId.value,
        },
      });
      setCreateArticlePage(false);
      await fetchArticles();
      await getArticlesCount();
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <ArticleForm
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        status={status}
        setStatus={setStatus}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        setCreateArticlePage={setCreateArticlePage}
        handleSave={handleSave}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};
export default CreateArticle;
