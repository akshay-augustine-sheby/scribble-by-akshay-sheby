import React, { useContext } from "react";

import {
  Input,
  Dropdown,
  Button,
  Textarea,
  Select,
} from "@bigbinary/neetoui/v2";

import { CategoryContext } from "../Dashboard";

const ArticleForm = ({
  title,
  setTitle,
  body,
  setBody,
  setArticlePage,
  handleSave,
  status,
  setStatus,
  categoryId,
  setCategoryId,
  loading,
}) => {
  const categories = useContext(CategoryContext);

  return (
    <div>
      <form
        onSubmit={handleSave}
        className="flex flex-col place-content-center px-64 space-y-5 py-10 w-full align-middle"
      >
        <div className="flex flex-row space-x-4">
          <Input
            label="Article Title"
            placeholder=""
            size="small"
            type="text"
            className="w-2/5"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <Select
            defaultValue={{
              label: categories[0].name,
              value: categories[0].id,
            }}
            isClearable
            isSearchable
            value={categoryId}
            label="Category"
            name="ValueList"
            options={categories.map(category => {
              return {
                label: category.name,
                value: category.id,
              };
            })}
            placeholder="Select a category"
            onChange={val => setCategoryId(val)}
            size="small"
            required
          />
        </div>
        <Textarea
          label="Article Body"
          placeholder="Enter text"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
        />
        <div className="flex flex-row space-x-2">
          <div className="flex flex-row">
            <Button
              label={status === 0 ? "Save Draft" : "Save Published"}
              style="primary"
              type="submit"
              loading={loading}
            />
            <Dropdown
              buttonProps={{
                onClick: function noRefCheck() {},
              }}
              buttonStyle="primary"
              label=""
              onClose={function noRefCheck() {}}
              position="bottom-end"
            >
              <li onClick={() => setStatus(0)}>Save Draft</li>
              <li onClick={() => setStatus(1)}>Save Published</li>
            </Dropdown>
          </div>
          <Button
            label="Cancel"
            onClick={() => setArticlePage(false)}
            style="text"
          />
        </div>
      </form>
    </div>
  );
};
export default ArticleForm;
