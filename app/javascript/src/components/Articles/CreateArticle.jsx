import React, { useState } from "react";

import ArticleForm from "./ArticleForm";

import articlesApi from "../../apis/articles";

const CreateArticle = ({
  setArticlePage,
  loading,
  setLoading,
  fetchArticles,
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
      setLoading(false);
      setArticlePage(false);
      fetchArticles();
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
        setArticlePage={setArticlePage}
        handleSave={handleSave}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};
export default CreateArticle;