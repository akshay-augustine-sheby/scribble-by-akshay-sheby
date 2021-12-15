import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";

import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import redirectionsApi from "./apis/redirections";
import settingsApi from "./apis/settings";
import CreateArticle from "./components/Articles/CreateArticle";
import Dashboard from "./components/Dashboard";
import Authenticate from "./components/Eui/Authenticate";
import ShowArticle from "./components/Eui/ShowArticle";
import PageLoader from "./components/PageLoader";
import Settings from "./components/Settings";
import { getFromLocalStorage, setToLocalStorage } from "./helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirections, setRedirections] = useState([]);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  const fetchAuthenticationStatus = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.fetchAuthenticationStatus();
      if (response.data.auth_token !== null) {
        setToLocalStorage({ authToken: response.data.auth_token });
      }
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRedirections = async () => {
    try {
      setLoading(true);
      const response = await redirectionsApi.list();
      setRedirections(response.data.redirections);
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
    fetchAuthenticationStatus();
    fetchRedirections();
    setAuthHeaders(setLoading);
  }, []);

  if (loading || redirections.length === 0) {
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
        {redirections.map((redirection, index) => {
          return (
            <Redirect
              key={index}
              exact
              from={redirection.from_path}
              to={redirection.to_path}
            />
          );
        })}
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/articles/create" component={CreateArticle} />
        <Route exact path="/article/:slug" component={ShowArticle} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/authenticate" component={Authenticate} />
        <PrivateRoute
          path="/welcome"
          redirectRoute="/authenticate"
          condition={isLoggedIn}
          component={ShowArticle}
        />
      </Switch>
    </Router>
  );
};

export default App;
