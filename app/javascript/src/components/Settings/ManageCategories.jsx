import React, { useEffect, useState } from "react";

import { Edit, Delete, Plus, Check } from "@bigbinary/neeto-icons";
import { Button, Input } from "@bigbinary/neetoui/v2";
import DragMove2LineIcon from "remixicon-react/DragMove2LineIcon";
import Sortable from "sortablejs";

import categoriesApi from "../../apis/categories";

const ManageCategories = ({
  categories,
  handleCreateCategory,
  handleEditCategory,
  handleDeleteCategory,
  categoryName,
  setCategoryName,
}) => {
  const [isAddNewActive, setIsAddNewActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState("");
  const [addNewValue, setAddNewValue] = useState("");

  useEffect(() => {
    const el = document.getElementById("categoryList");
    Sortable.create(el, {
      onEnd: event => {
        categoriesApi.updatePosition({
          position: event.oldIndex + 1,
          payload: {
            category: {
              position: event.newIndex + 1,
            },
          },
        });
      },
    });
  }, []);

  return (
    <div className="flex flex-col space-y-5 py-10 px-64 w-full align-middle">
      <div>
        <div className="font-semibold text-xl">Manage Categories</div>
        <div className="text-custom-grey-bright">
          Create and configure the categories inside your scribble.
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        {!isAddNewActive && (
          <div>
            <Button
              label="Add new category"
              onClick={() => {
                setIsAddNewActive(true);
              }}
              style="link"
              iconPosition="left"
              icon={Plus}
            />
          </div>
        )}
        {isAddNewActive && (
          <div className="flex flex-row space-x-1 w-1/2">
            <Input
              label=""
              size="small"
              value={addNewValue}
              onChange={e => setAddNewValue(e.target.value)}
              placeholder="Add new category"
            />
            <Button
              onClick={() => handleCreateCategory(addNewValue)}
              size="large"
              style="text"
              icon={Check}
            />
          </div>
        )}
        <div>
          <div
            id="categoryList"
            className="flex flex-col space-y-3 font-semibold"
          >
            {categories?.map(category => (
              <div key={category.id} className="cursor-move">
                <div className="border-b border-gray-300 mb-2"></div>
                <div className="flex flex-row justify-between place-items-center">
                  <div className="flex flex-row space-x-2 place-items-center">
                    <DragMove2LineIcon color="gray" size={16} />
                    {editCategoryId !== category.id && (
                      <div>{category.name}</div>
                    )}
                    {isEditActive && editCategoryId === category.id && (
                      <div className="flex flex-row space-x-1">
                        <Input
                          label=""
                          size="small"
                          value={categoryName}
                          onChange={e => setCategoryName(e.target.value)}
                        />
                        <Button
                          onClick={() => handleEditCategory(category.id)}
                          size="large"
                          style="text"
                          icon={Check}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row space-x-2">
                    <Button
                      onClick={() => {
                        handleDeleteCategory(category.id);
                      }}
                      style="secondary"
                      iconPosition="left"
                      icon={Delete}
                    />
                    <Button
                      onClick={() => {
                        setIsEditActive(true);
                        setEditCategoryId(category.id);
                        setCategoryName(category.name);
                      }}
                      style="secondary"
                      iconPosition="left"
                      icon={Edit}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageCategories;
