import React, { useEffect, useState } from "react";

import { Input, Checkbox, Button } from "@bigbinary/neetoui/v2";

import settingsApi from "../../apis/settings";

const General = () => {
  const [siteName, setSiteName] = useState("");
  const [addPassword, setAddPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const regex = /(?=.*[a-zA-Z])(?=.*[0-9])/;

  const handleAddPassword = () => {
    addPassword ? setAddPassword(false) : setAddPassword(true);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await settingsApi.updateSiteData({
        setting: {
          site_name: siteName,
          password,
          protection_status: addPassword === false ? 0 : 1,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchSiteData = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.fetchSiteData();
      setSiteName(response.data.setting.site_name);
      setAddPassword(
        response.data.setting.protection_status === "password_absent"
          ? false
          : true
      );
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
    let message = "";
    if (password.length < 6) message += "Have at least 6 characters ";

    if (!regex.test(password)) {
      message += "Include at least 1 letter and 1 number";
    }
    setErrorMessage(message);
  }, [password]);

  useEffect(() => {
    if (errorMessage !== "" && addPassword) setDisabled(true);
    else setDisabled(false);
  }, [errorMessage, addPassword]);

  return (
    <div className="flex justify-center align-middle px-32">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-5 py-10 px-64 w-full align-middle"
      >
        <div>
          <div className="font-semibold text-xl">General Settings</div>
          <div className="text-custom-grey-bright">
            Configure general attributes of scribble.
          </div>
        </div>
        <div>
          <div>
            <Input
              label="Site Name"
              placeholder=""
              size="small"
              type="text"
              className=""
              value={siteName}
              onChange={e => setSiteName(e.target.value)}
            />
          </div>
          <div className="text-custom-grey text-xs">
            Customize the site name which is used to show the site name in
            <label className="font-semibold"> Open Graph Tags.</label>
          </div>
        </div>
        <div className="border-b border-gray-300"></div>
        <div>
          <Checkbox
            checked={addPassword}
            id=""
            label="Password Protect Knowledge Base"
            onChange={handleAddPassword}
          />
        </div>
        {addPassword && (
          <div>
            <Input
              label="Password"
              placeholder="***********"
              size="small"
              type="password"
              value={password}
              error={errorMessage}
              onChange={e => setPassword(e.target.value)}
              className="w-2/3"
              required
            />
          </div>
        )}
        <div className="flex flex-row space-x-2">
          <Button
            label="Save Changes"
            style="primary"
            type="submit"
            loading={loading}
            disabled={disabled}
          />
          <Button
            label="Cancel"
            onClick={() => {
              fetchSiteData();
            }}
            style="text"
          />
        </div>
      </form>
    </div>
  );
};
export default General;
