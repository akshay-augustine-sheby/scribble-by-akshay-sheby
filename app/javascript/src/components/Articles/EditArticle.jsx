import React, { useEffect, useState } from "react";

import ArticleForm from "./ArticleForm";

import articlesApi from "../../apis/articles";
import Toastr from "../Common/Toastr";

const EditArticle = ({
  setEditArticlePage,
  editArticlePage,
  loading,
  setLoading,
  fetchArticles,
  fetchArticleDetails,
  slug,
  articleDetails,
  getArticlesCount,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (articleDetails !== undefined) {
      setTitle(articleDetails.title);
      setBody(articleDetails.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [articleDetails]);

  const handleSave = async event => {
    event.preventDefault();
    try {
      if (categoryId.value !== undefined) {
        setLoading(true);
        await articlesApi.update({
          slug,
          payload: {
            article: {
              title: title,
              body: body,
              status: status,
              category_id: categoryId.value,
            },
          },
        });
        setEditArticlePage(false);
        await fetchArticles();
        await fetchArticleDetails(slug);
        await getArticlesCount();
        setLoading(false);
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
        editArticlePage={editArticlePage}
        setEditArticlePage={setEditArticlePage}
        handleSave={handleSave}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};
export default EditArticle;
