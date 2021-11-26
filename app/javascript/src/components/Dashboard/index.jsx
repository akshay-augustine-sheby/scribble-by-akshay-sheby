import React, { useState, useEffect } from "react";
//import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import PageLoader from "components/PageLoader";

import SideBar from "../SideBar";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-row">
        <SideBar />
        <h1 className="text-xl leading-5 text-center">
          You have no articles created 😔
        </h1>
      </div>
    </Container>
  );
};

export default Dashboard;
