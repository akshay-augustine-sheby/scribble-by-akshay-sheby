import React from "react";

import { Warning, Home } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

const ErrorBoundary = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center place-items-center align-middle space-y-5 mt-48">
        <div className="text-red-500">
          <Warning size={96} />
        </div>
        <div className="text-3xl font-bold text-center">
          Something went wrong!
        </div>
        <div>
          <Button
            href="/"
            icon={Home}
            iconPosition="left"
            label="Back to home"
            style="secondary"
          />
        </div>
      </div>
    </div>
  );
};
export default ErrorBoundary;
