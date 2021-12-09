import React, { useEffect, useState } from "react";

import {
  Settings as SettingsIcon,
  Repeat,
  Category,
} from "@bigbinary/neeto-icons";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import PageLoader from "components/PageLoader";

import General from "./General";
import ManageCategories from "./ManageCategories";

import categoriesApi from "../../apis/categories";
import Container from "../Container";

const Settings = () => {
  const [generalActive, setGeneralActive] = useState(true);
  const [redirectionsActive, setRedirectionsActive] = useState(false);
  const [manageCategoriesActive, setManageCategoriesActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesApi.list();
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async categoryName => {
    try {
      setLoading(true);
      await categoriesApi.create({
        category: {
          name: categoryName,
        },
      });
      await fetchCategories();
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

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
                  setManageCategoriesActive(false);
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
                  setManageCategoriesActive(false);
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
                  setManageCategoriesActive(true);
                }}
                active={manageCategoriesActive}
              />
            </div>
          </MenuBar>
        </div>
        {generalActive && <General />}
        {manageCategoriesActive && (
          <ManageCategories
            categories={categories}
            handleCreateCategory={handleCreateCategory}
          />
        )}
      </div>
    </Container>
  );
};
export default Settings;
