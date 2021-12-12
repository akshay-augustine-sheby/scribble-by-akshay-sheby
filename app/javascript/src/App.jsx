import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";

import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import settingsApi from "./apis/settings";
import CreateArticle from "./components/Articles/CreateArticle";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Eui/ArticleContainer";
import Authenticate from "./components/Eui/Authenticate";
import ShowArticle from "./components/Eui/ShowArticle";
import PageLoader from "./components/PageLoader";
import Settings from "./components/Settings";
import { getFromLocalStorage, setToLocalStorage } from "./helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  const fetchAuthenticationStatus = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.fetchAuthenticationStatus();
      setToLocalStorage({ authToken: response.data.auth_token });
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    fetchAuthenticationStatus();
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
        <Route exact path="/articles/:slug" component={ShowArticle} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/authenticate" component={Authenticate} />
        <PrivateRoute
          path="/welcome"
          redirectRoute="/authenticate"
          condition={isLoggedIn}
          component={Welcome}
        />
      </Switch>
    </Router>
  );
};

export default App;
