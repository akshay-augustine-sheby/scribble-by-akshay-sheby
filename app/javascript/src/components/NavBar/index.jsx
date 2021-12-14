import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import NavItem from "./NavItem";

const NavBar = () => {
  return (
    <nav className="bg-white shadow sticky">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <div
                className="px-1 pt-1 mr-3
      font-semibold text-sm leading-5 self-center"
              >
                Scribble
              </div>
              <NavItem name="Articles" path="/" />
              <NavItem name="Settings" path="/settings" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button
              icon={ExternalLink}
              iconPosition="right"
              label="Preview"
              onClick={() => window.open(`${window.location.origin}/welcome`)}
              style="secondary"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
