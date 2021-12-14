import React, { useEffect, useState } from "react";

import { Right, Down } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router-dom";

import { getFromLocalStorage } from "../../helpers/storage";

const SideBar = ({ categories, articles }) => {
  const [activeCategories, setActiveCategories] = useState({});
  const [activeArticle, setActiveArticle] = useState("");
  const history = useHistory();

  useEffect(() => {
    const categoryId = getFromLocalStorage("activeCategoryId");
    setActiveCategories({ [categoryId]: true });
    setActiveArticle(getFromLocalStorage("activeArticleSlug"));
  }, []);

  const handleCategoryClick = id => {
    if (activeCategories[id] === undefined || activeCategories[id] === false) {
      setActiveCategories(prev => ({
        ...prev,
        [id]: true,
      }));
    } else {
      setActiveCategories(prev => ({
        ...prev,
        [id]: false,
      }));
    }
  };
  return (
    <div className="w-1/5 bg-white shadow h-screen overflow-y-auto overscroll-contain">
      <div className="p-5 space-y-2">
        {categories.map(category => {
          return (
            <div key={category.id}>
              <div>
                <Button
                  icon={activeCategories[category.id] === true ? Down : Right}
                  iconPosition="left"
                  label={category.name}
                  onClick={() => handleCategoryClick(category.id)}
                  style="text"
                  className="w-full place-content-start"
                />
              </div>
              <div className="flex flex-col space-y-2 text-xs ml-8 py-2">
                {activeCategories[category.id] === true &&
                  articles[category.id].map(article => (
                    <div key={article.slug}>
                      {activeArticle !== article.slug && (
                        <div>
                          <button
                            onClick={() => {
                              setActiveArticle(article.slug);
                              history.push(`/article/${article.slug}`);
                            }}
                            className="text-custom-grey font-semibold focus:outline-none"
                          >
                            {article.title}
                          </button>
                        </div>
                      )}
                      {activeArticle === article.slug && (
                        <div>
                          <button
                            onClick={() => {
                              setActiveArticle(article.slug);
                              history.push(`/article/${article.slug}`);
                            }}
                            className="text-custom-indigo font-semibold focus:outline-none"
                          >
                            {article.title}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;
