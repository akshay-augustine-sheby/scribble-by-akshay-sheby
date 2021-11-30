import React from "react";

import PropTypes from "prop-types";

import NavBar from "components/NavBar";

const Container = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="">
        <div className="">{children}</div>
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
