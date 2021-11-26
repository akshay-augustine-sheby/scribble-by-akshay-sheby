import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import NavItem from "./NavItem";

const NavBar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <NavItem name="Scribble" path="/" />
              <NavItem name="Articles" path="/" />
              <NavItem name="Settings" path="/" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button
              href=""
              icon={ExternalLink}
              iconPosition="right"
              label="Preview"
              onClick={function noRefCheck() {}}
              style="secondary"
              to=""
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
