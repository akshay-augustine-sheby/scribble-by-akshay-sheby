import React, { useEffect, useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import articlesApi from "../../apis/articles";
import PageLoader from "../PageLoader";

const SideBar = ({
  categories,
  handleAllArticles,
  handleDraftArticles,
  handlePublishedArticles,
  handleCategories,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [categoryArticlesCount, setCategoryArticlesCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [allActive, setAllActive] = useState(false);
  const [draftActive, setDraftActive] = useState(false);
  const [publishedActive, setPublishedActive] = useState(false);

  const getArticlesCount = async () => {
    try {
      const response = await articlesApi.getCount();
      logger.info(response);
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

  useEffect(() => {
    getArticlesCount();
  }, []);

  if (loading) {
    <PageLoader />;
  }

  return (
    <div>
      <MenuBar showMenu={true} title="Articles">
        <MenuBar.Block
          label="All"
          count={totalCount}
          onClick={() => {
            handleAllArticles();
            setAllActive(true);
            setPublishedActive(false);
            setDraftActive(false);
            setActiveCategoryId("");
          }}
          active={allActive}
        />
        <MenuBar.Block
          label="Draft"
          count={draftCount}
          onClick={() => {
            handleDraftArticles();
            setAllActive(false);
            setPublishedActive(false);
            setDraftActive(true);
            setActiveCategoryId("");
          }}
          active={draftActive}
        />
        <MenuBar.Block
          label="Published"
          count={publishedCount}
          onClick={() => {
            handlePublishedArticles();
            setAllActive(false);
            setPublishedActive(true);
            setDraftActive(false);
            setActiveCategoryId("");
          }}
          active={publishedActive}
        />

        <MenuBar.SubTitle
          iconProps={[
            {
              icon: Search,
              onClick: () => setIsSearchCollapsed(!isSearchCollapsed),
            },
            {
              icon: Plus,
            },
          ]}
        >
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            Categories
          </Typography>
        </MenuBar.SubTitle>
        <MenuBar.Search
          collapse={isSearchCollapsed}
          onCollapse={() => setIsSearchCollapsed(true)}
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
        />
        {categories &&
          categories.map(category => {
            if (
              category.name.toLowerCase().includes(searchValue.toLowerCase())
            ) {
              return (
                <MenuBar.Block
                  key={category.id}
                  label={category.name}
                  count={categoryArticlesCount[category.id] || 0}
                  onClick={() => {
                    handleCategories(category.id);
                    setActiveCategoryId(category.id);
                    setAllActive(false);
                    setPublishedActive(false);
                    setDraftActive(false);
                  }}
                  active={category.id === activeCategoryId}
                />
              );
            }

            return false;
          })}
      </MenuBar>
    </div>
  );
};
export default SideBar;
