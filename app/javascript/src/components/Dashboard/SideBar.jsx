import React, { useState } from "react";

import { Search, Plus, Check } from "@bigbinary/neeto-icons";
import { Typography, Input, Button } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

const SideBar = ({
  categories,
  handleAllArticles,
  handleDraftArticles,
  handlePublishedArticles,
  handleCategories,
  totalCount,
  draftCount,
  publishedCount,
  categoryArticlesCount,
  handleCreateCategory,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddNewCollapsed, setIsAddNewCollapsed] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [addNewValue, setAddNewValue] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [allActive, setAllActive] = useState(false);
  const [draftActive, setDraftActive] = useState(false);
  const [publishedActive, setPublishedActive] = useState(false);

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
              onClick: () => {
                setIsSearchCollapsed(!isSearchCollapsed);
                setIsAddNewCollapsed(true);
              },
            },
            {
              icon: Plus,
              onClick: () => {
                setIsAddNewCollapsed(!isAddNewCollapsed);
                setIsSearchCollapsed(true);
              },
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
        {!isAddNewCollapsed && (
          <div className="flex flex-row mb-5 space-x-1">
            <Input
              label=""
              size="small"
              value={addNewValue}
              onChange={e => setAddNewValue(e.target.value)}
              placeholder="Add new category"
            />
            <Button
              onClick={() => handleCreateCategory(addNewValue)}
              size="large"
              style="text"
              icon={Check}
            />
          </div>
        )}
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
