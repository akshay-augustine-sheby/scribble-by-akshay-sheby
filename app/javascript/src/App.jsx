import React, { useEffect, useState } from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { initializeLogger } from "common/logger";

import Dashboard from "./components/Dashboard";
import PageLoader from "./components/PageLoader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
