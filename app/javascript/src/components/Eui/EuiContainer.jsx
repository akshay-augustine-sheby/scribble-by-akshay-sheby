import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import settingsApi from "../../apis/settings";
import PageLoader from "../PageLoader";

const EuiContainer = ({ children }) => {
  const [siteName, setSiteName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSiteData = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.fetchSiteData();
      setSiteName(response.data.site_name);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <nav className="bg-white shadow sticky top-0">
        <div className="py-6 font-semibold text-base leading-5 self-center h-16 text-center">
          {siteName}
        </div>
      </nav>
      <div className="">
        <div className="">{children}</div>
      </div>
    </>
  );
};

EuiContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EuiContainer;
