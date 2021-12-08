import React, { useMemo } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Search, Plus } from "@bigbinary/neeto-icons";
import { Button, Dropdown, Checkbox, Input } from "@bigbinary/neetoui/v2";
import moment from "moment-timezone";
import { useFilters, useTable } from "react-table";

const Table = ({ articles, deleteArticle, editArticle, createArticle }) => {
  const columns = useMemo(
    () => [
      {
        Header: "TITLE",
        accessor: "title",
        Cell: props => (
          <div className="text-custom-indigo">
            {props.cell.row.values.title}
          </div>
        ),
      },
      {
        Header: "DATE",
        accessor: "published_at",
        Cell: props => (
          <div>
            {props.cell.row.values.published_at
              ? moment(props.cell.row.values.published_at).format(
                  "MMMM Do, YYYY"
                )
              : "-"}
          </div>
        ),
      },
      {
        Header: "AUTHOR",
        accessor: "author",
        Cell: props => <div>{props.cell.row.values.author}</div>,
      },
      {
        Header: "CATEGORY",
        accessor: "name",
        Cell: props => <div>{props.cell.row.values.name}</div>,
      },
      {
        Header: "STATUS",
        accessor: "status",
        Cell: props => <div>{props.cell.row.values.status}</div>,
      },
      {
        Header: "",
        accessor: "id",
        Cell: ({ value }) => (
          <div className="flex flex-row align-middle justify-center space-x-2 px-1 py-2">
            <Button
              onClick={() => deleteArticle(value)}
              style="secondary"
              iconPosition="left"
              icon={Delete}
            />
            <Button
              onClick={() => editArticle(value)}
              style="secondary"
              iconPosition="left"
              icon={Edit}
            />
          </div>
        ),
      },
    ],
    []
  );

  const customClass = id => {
    if (id % 2 !== 0) return "bg-custom-row-color";

    return "";
  };

  const data = useMemo(() => [...articles], [articles]);

  const tableInstance = useTable({ columns, data }, useFilters);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    setFilter,
  } = tableInstance;
  return (
    <div className="flex flex-col space-y-6 mt-2">
      <div className="flex flex-row space-x-3 place-items-center justify-end">
        {rows.length > 0 && (
          <div className="w-1/3">
            <Input
              label=""
              size="small"
              onChange={e => setFilter("title", e.target.value)}
              placeholder="Search article title"
              prefix={<Search size={16} />}
            />
          </div>
        )}
        {rows.length > 0 && (
          <Dropdown
            buttonStyle="secondary"
            label="Columns"
            position="bottom-end"
          >
            <div className="p-3">
              <div className="space-y-3">
                <div>Columns</div>
                {allColumns.map(column => {
                  if (column.Header !== "") {
                    return (
                      <Checkbox
                        checked
                        id={column.id}
                        label={column.Header}
                        {...column.getToggleHiddenProps()}
                      />
                    );
                  }

                  return false;
                })}
              </div>
            </div>
          </Dropdown>
        )}
        <Button
          href=""
          icon={Plus}
          iconPosition="right"
          label="Add New Article"
          onClick={createArticle}
          style="primary"
          to=""
        />
      </div>
      {rows.length === 0 && (
        <div className="w-full text-xl leading-5 text-center mt-10">
          No matching articles found in the given category 😔
        </div>
      )}
      {rows.length > 0 && (
        <div>
          <div className="text-lg font-bold mb-6">{rows.length} Articles</div>
          <table {...getTableProps()} className="w-full mb-10">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr
                  key={headerGroup.id}
                  {...headerGroup.getHeaderGroupProps()}
                  className=""
                >
                  {headerGroup.headers.map(column => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      className="text-left font-medium text-custom-grey h-10"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody key="" {...getTableBodyProps()}>
              {rows.map((row, id) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.id}
                    {...row.getRowProps()}
                    className={customClass(id)}
                  >
                    {row.cells.map(cell => {
                      return (
                        <td
                          key={cell.id}
                          {...cell.getCellProps()}
                          className="font-medium"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Table;
