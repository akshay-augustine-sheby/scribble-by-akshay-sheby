import React, { useEffect, useState } from "react";

import ArticleForm from "./ArticleForm";

import articlesApi from "../../apis/articles";
import Toastr from "../Common/Toastr";

const EditArticle = ({
  setArticlePage,
  loading,
  setLoading,
  fetchArticles,
  fetchArticleDetails,
  articleId,
  articleDetails,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (articleDetails !== undefined) {
      setTitle(articleDetails.title);
      setBody(articleDetails.body);
    }
  }, [articleDetails]);

  const handleSave = async event => {
    event.preventDefault();
    try {
      if (categoryId.value !== undefined) {
        setLoading(true);
        await articlesApi.update({
          articleId,
          payload: {
            article: {
              title: title,
              body: body,
              status: status,
              category_id: categoryId.value,
            },
          },
        });
        setLoading(false);
        setArticlePage(false);
        fetchArticles();
        fetchArticleDetails(articleId);
      } else Toastr.error("Category must exist");
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
export default EditArticle;
