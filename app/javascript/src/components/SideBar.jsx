import React, { useEffect, useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import PageLoader from "./PageLoader";

import articlesApi from "../apis/articles";

const SideBar = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [allCount, setAllCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getArticlesCount = async () => {
    try {
      const response = await articlesApi.getCount();
      //logger.info(response)
      setAllCount(response.data.total);
      setDraftCount(response.data.draft_count);
      setPublishedCount(response.data.published_count);
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
        <MenuBar.Block label="All" count={allCount} active />
        <MenuBar.Block label="Draft" count={draftCount} />
        <MenuBar.Block label="Published" count={publishedCount} />

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
        />
        <MenuBar.Block label="Europe" count={80} />
        <MenuBar.Block label="Middle-East" count={60} />
        <MenuBar.Block label="Asia" count={60} />
      </MenuBar>
    </div>
  );
};
export default SideBar;
