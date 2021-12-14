import React from "react";

import Table from "./Table";

const Redirections = () => {
  return (
    <div className="flex flex-col space-y-5 py-10 px-64 w-full align-middle">
      <div>
        <div className="font-semibold text-xl">Redirections</div>
        <div className="text-custom-grey-bright">
          Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly.
        </div>
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
};
export default Redirections;
