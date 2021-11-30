import React from "react";

import { PageLoader as CustomPageLoader } from "@bigbinary/neetoui/v2";

const PageLoader = () => {
  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen">
      <CustomPageLoader color="#9041c7" />
    </div>
  );
};

export default PageLoader;
