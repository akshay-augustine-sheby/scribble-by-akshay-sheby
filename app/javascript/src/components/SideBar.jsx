import React, { useState } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

const SideBar = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  return (
    <div>
      <MenuBar showMenu={true} title="Articles">
        <MenuBar.Block label="All" count={13} active />
        <MenuBar.Block label="Draft" count={2} />
        <MenuBar.Block label="Published" count={7} />

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
