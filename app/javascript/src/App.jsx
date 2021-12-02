import React, { useEffect, useState } from "react";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { initializeLogger } from "common/logger";

import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import CreateArticle from "./components/Articles/CreateArticle";
import Dashboard from "./components/Dashboard";
import PageLoader from "./components/PageLoader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
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
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/articles/create" element={<CreateArticle />} />
      </Routes>
    </Router>
  );
};

export default App;
