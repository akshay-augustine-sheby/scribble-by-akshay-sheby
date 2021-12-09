import React, { useEffect, useState } from "react";

import { Check, Close } from "@bigbinary/neeto-icons";
import { Input, Checkbox, Button } from "@bigbinary/neetoui/v2";

import PageLoader from "components/PageLoader";

import settingsApi from "../../apis/settings";

const General = () => {
  const [siteName, setSiteName] = useState("");
  const [addPassword, setAddPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
  const [isRegexMatched, setIsRegexMatched] = useState(false);
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
    if (password.length >= 6) setIsPasswordLengthValid(true);
    else setIsPasswordLengthValid(false);

    if (regex.test(password)) setIsRegexMatched(true);
    else setIsRegexMatched(false);
  }, [password]);

  useEffect(() => {
    if ((!isPasswordLengthValid || !isRegexMatched) && addPassword) {
      setDisabled(true);
    } else setDisabled(false);
  }, [isPasswordLengthValid, isRegexMatched, addPassword]);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

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
          <div className="flex flex-col space-y-2">
            <div>
              <Input
                label="Password"
                placeholder="***********"
                size="small"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-2/3"
                required
              />
            </div>
            <div className="flex flex-row items-center text-xs space-x-1">
              {isPasswordLengthValid && (
                <div>
                  <Check color="green" size={15} />
                </div>
              )}
              {!isPasswordLengthValid && (
                <div>
                  <Close color="red" size={15} />
                </div>
              )}
              <div>Have at least 6 characters</div>
            </div>
            <div className="flex flex-row items-center text-xs space-x-1">
              {isRegexMatched && (
                <div>
                  <Check color="green" size={15} />
                </div>
              )}
              {!isRegexMatched && (
                <div>
                  <Close color="red" size={15} />
                </div>
              )}
              <div>Include at least 1 letter and 1 number</div>
            </div>
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
              setPassword("");
            }}
            style="text"
          />
        </div>
      </form>
    </div>
  );
};
export default General;
