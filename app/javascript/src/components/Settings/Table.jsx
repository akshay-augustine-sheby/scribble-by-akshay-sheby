import React, { useState } from "react";

import { Delete, Edit, Check } from "@bigbinary/neeto-icons";
import { Button, Input } from "@bigbinary/neetoui/v2";

const Table = ({
  redirections,
  newFromPath,
  setNewFromPath,
  newToPath,
  setNewToPath,
  fromPath,
  setFromPath,
  toPath,
  setToPath,
  handleEditRedirection,
  handleDeleteRedirection,
  handleCreateRedirection,
}) => {
  const [addNewActive, setAddNewActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [editRedirectionId, setEditRedirectionId] = useState("");
  return (
    <div>
      <table className="border-collapse w-full">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-500 uppercase">
            <th className="px-2 py-2">From path</th>
            <th className="px-2 py-2">To path</th>
            <th className="px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {redirections.map(redirection => {
            return editActive && editRedirectionId === redirection.id ? (
              <tr className="bg-white border-t-8 border-indigo-100">
                <td className="px-2 py-4">
                  <div className="flex flex-row place-items-center space-x-1">
                    <div className="text-gray-500">
                      {window.location.origin}
                    </div>
                    <div>
                      <Input
                        size="small"
                        value={fromPath}
                        onChange={e => setFromPath(e.target.value)}
                        placeholder={window.location.origin}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4">
                  <div className="flex flex-row place-items-center space-x-1">
                    <div className="text-gray-500">
                      {window.location.origin}
                    </div>
                    <div>
                      <Input
                        size="small"
                        value={toPath}
                        onChange={e => setToPath(e.target.value)}
                        placeholder={window.location.origin}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="px-8">
                    <Button
                      type="submit"
                      size="large"
                      style="text"
                      onClick={() => handleEditRedirection(redirection.id)}
                      icon={Check}
                    />
                  </div>
                </td>
              </tr>
            ) : (
              <tr className="bg-white border-t-8 border-indigo-100">
                <td className="px-2 py-4">
                  <div className="flex">
                    <div className="text-gray-500">
                      {window.location.origin}
                    </div>
                    <div>{redirection.from_path}</div>
                  </div>
                </td>
                <td className="px-2 py-4">
                  {window.location.origin}
                  {redirection.to_path}
                </td>
                <td className="px-2 py-4">
                  <div className="flex space-x-2 justify-around">
                    <Button
                      style="text"
                      size="large"
                      icon={Delete}
                      onClick={() => handleDeleteRedirection(redirection.id)}
                    />
                    <Button
                      style="text"
                      size="large"
                      icon={Edit}
                      onClick={() => {
                        setFromPath(redirection.from_path);
                        setToPath(redirection.to_path);
                        setEditRedirectionId(redirection.id);
                        setEditActive(true);
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="border-t-8 border-indigo-100">
        {!addNewActive ? (
          <div className="px-2 py-2">
            <Button
              label="+  Add New Redirection"
              onClick={() => setAddNewActive(true)}
              style="link"
            />
          </div>
        ) : (
          <form onSubmit={handleCreateRedirection}>
            <div className="flex flex-row mb-5 space-x-4 bg-white p-2">
              <div className="w-2/5">
                <Input
                  size="small"
                  value={newFromPath}
                  onChange={e => setNewFromPath(e.target.value)}
                  placeholder={window.location.origin}
                />
              </div>
              <div className="w-2/5">
                <Input
                  size="small"
                  value={newToPath}
                  onChange={e => setNewToPath(e.target.value)}
                  placeholder={window.location.origin}
                />
              </div>
              <Button type="submit" size="large" style="text" icon={Check} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default Table;
