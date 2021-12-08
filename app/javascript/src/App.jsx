import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { initializeLogger } from "common/logger";

import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import CreateArticle from "./components/Articles/CreateArticle";
import Dashboard from "./components/Dashboard";
import PageLoader from "./components/PageLoader";
import Settings from "./components/Settings";

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
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/articles/create" component={CreateArticle} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </Router>
  );
};

export default App;
