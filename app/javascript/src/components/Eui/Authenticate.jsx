import React, { useEffect, useState } from "react";

import { Input, Button } from "@bigbinary/neetoui/v2";
import img from "src/images/Authenticate.svg";

import EuiContainer from "./EuiContainer";

import { setAuthHeaders } from "../../apis/axios";
import settingsApi from "../../apis/settings";
import { setToLocalStorage } from "../../helpers/storage";
import PageLoader from "../PageLoader";

const Authenticate = () => {
  const [siteName, setSiteName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await settingsApi.authenticateUsingPassword({
        setting: { password },
      });
      setToLocalStorage({
        authToken: response.data.auth_token,
      });
      setAuthHeaders();
      window.location.href = "/welcome";
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (password === "") setDisabled(true);
    else setDisabled(false);
  }, [password]);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <EuiContainer>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col py-32 w-full align-middle place-items-center"
        >
          <div className="flex flex-col space-y-5">
            <div>
              <img
                className="object-none h-56 w-full"
                src={img}
                alt="No image"
              />
            </div>
            <div>
              <div className="font-semibold text-xl">
                {siteName} is password protected!
              </div>
              <div className="text-custom-grey-bright">
                Enter the password to gain access to spinkart.
              </div>
            </div>
            <div>
              <Input
                label="Password"
                placeholder="***********"
                size="small"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button
                label="Continue"
                style="primary"
                type="submit"
                loading={loading}
                disabled={disabled}
              />
            </div>
          </div>
        </form>
      </EuiContainer>
    </div>
  );
};
export default Authenticate;
