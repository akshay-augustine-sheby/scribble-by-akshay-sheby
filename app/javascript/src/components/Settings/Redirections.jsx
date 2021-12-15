import React, { useEffect, useState } from "react";

import Table from "./Table";

import redirectionsApi from "../../apis/redirections";
import PageLoader from "../PageLoader";

const Redirections = () => {
  const [redirections, setRedirections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFromPath, setNewFromPath] = useState("");
  const [newToPath, setNewToPath] = useState("");
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");

  const fetchRedirections = async () => {
    try {
      setLoading(true);
      const response = await redirectionsApi.list();
      setRedirections(response.data.redirections);
      setNewFromPath("");
      setNewToPath("");
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRedirection = async redirectionId => {
    try {
      setLoading(true);
      await redirectionsApi.update({
        redirectionId,
        payload: {
          redirection: {
            from_path: fromPath,
            to_path: toPath,
          },
        },
      });
      await fetchRedirections();
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleDeleteRedirection = async redirectionId => {
    try {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        setLoading(true);
        await redirectionsApi.destroy(redirectionId);
        await fetchRedirections();
        setLoading(false);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCreateRedirection = async () => {
    try {
      setLoading(true);
      await redirectionsApi.create({
        redirection: {
          from_path: newFromPath,
          to_path: newToPath,
        },
      });
      await fetchRedirections();
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 py-10 px-48 w-full align-middle">
      <div>
        <div className="font-semibold text-xl">Redirections</div>
        <div className="text-custom-grey-bright">
          Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly.
        </div>
      </div>
      <div className="p-6 bg-indigo-100">
        <Table
          redirections={redirections}
          newFromPath={newFromPath}
          setNewFromPath={setNewFromPath}
          newToPath={newToPath}
          setNewToPath={setNewToPath}
          fromPath={fromPath}
          setFromPath={setFromPath}
          toPath={toPath}
          setToPath={setToPath}
          handleEditRedirection={handleEditRedirection}
          handleDeleteRedirection={handleDeleteRedirection}
          handleCreateRedirection={handleCreateRedirection}
        />
      </div>
    </div>
  );
};
export default Redirections;
