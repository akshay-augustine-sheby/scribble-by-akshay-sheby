import React, { useState } from "react";

import { Right, Down } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { NavLink } from "react-router-dom";

const SideBar = ({ categories, articles }) => {
  const [activeCategories, setActiveCategories] = useState({});

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
              <div className="flex flex-col space-y-2 text-xs ml-8 py-2 text-custom-grey font-semibold">
                {activeCategories[category.id] === true &&
                  articles[category.id].map(article => (
                    <NavLink
                      to={`/articles/${article.slug}`}
                      key={article.slug}
                    >
                      {article.title}
                    </NavLink>
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
