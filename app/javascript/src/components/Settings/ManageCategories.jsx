import React, { useEffect } from "react";

import { Edit, Delete, Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import DragMove2LineIcon from "remixicon-react/DragMove2LineIcon";
import Sortable from "sortablejs";

import categoriesApi from "../../apis/categories";

const ManageCategories = ({ categories }) => {
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
        <div>
          <Button
            label="Add new category"
            onClick={function noRefCheck() {}}
            style="link"
            iconPosition="left"
            icon={Plus}
          />
        </div>
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
                    <div>{category.name}</div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <Button
                      onClick={() => {}}
                      style="secondary"
                      iconPosition="left"
                      icon={Delete}
                    />
                    <Button
                      onClick={() => {}}
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
