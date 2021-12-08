import React, { useState } from "react";

import {
  Settings as SettingsIcon,
  Repeat,
  Category,
} from "@bigbinary/neeto-icons";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import General from "./General";

import Container from "../Container";

const Settings = () => {
  const [generalActive, setGeneralActive] = useState(true);
  const [redirectionsActive, setRedirectionsActive] = useState(false);
  const [manageActive, setManageActive] = useState(false);

  return (
    <Container>
      <div className="flex flex-row">
        <div className="flex">
          <MenuBar showMenu={true} title="">
            <div className="flex flex-row items-center space-x-2">
              <SettingsIcon size={23} />
              <MenuBar.Item
                label="General"
                description="Page Title, Brand Name & Meta Description"
                onClick={() => {
                  setGeneralActive(true);
                  setRedirectionsActive(false);
                  setManageActive(false);
                }}
                active={generalActive}
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <Repeat size={23} />
              <MenuBar.Item
                label="Redirections"
                description="Create & configure redirection rules"
                onClick={() => {
                  setGeneralActive(false);
                  setRedirectionsActive(true);
                  setManageActive(false);
                }}
                active={redirectionsActive}
              />
            </div>
            <div className="flex flex-row items-center space-x-2">
              <Category size={23} />
              <MenuBar.Item
                label="Manage categories"
                description="Edit and Reorder KB Structure"
                onClick={() => {
                  setGeneralActive(false);
                  setRedirectionsActive(false);
                  setManageActive(true);
                }}
                active={manageActive}
              />
            </div>
          </MenuBar>
        </div>
        {generalActive && <General />}
      </div>
    </Container>
  );
};
export default Settings;
