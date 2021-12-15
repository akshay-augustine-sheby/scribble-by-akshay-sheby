import React from "react";

import { Warning, Home } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import EuiContainer from "./EuiContainer";

const ErrorBoundary = () => {
  return (
    <EuiContainer>
      <div className="flex flex-col justify-center items-center place-items-center align-middle space-y-5 mt-40">
        <div className="text-red-500">
          <Warning size={96} />
        </div>
        <div className="text-3xl font-bold text-center">Article not found!</div>
        <div>
          <Button
            href="/welcome"
            icon={Home}
            iconPosition="left"
            label="Back to home"
            style="secondary"
          />
        </div>
      </div>
    </EuiContainer>
  );
};
export default ErrorBoundary;
