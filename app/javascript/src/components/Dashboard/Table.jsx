import React, { useMemo } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Button, Dropdown, Checkbox } from "@bigbinary/neetoui/v2";
import moment from "moment-timezone";
import { useTable } from "react-table";

const Table = ({ articles, deleteArticle, editArticle }) => {
  const columns = useMemo(
    () => [
      {
        Header: "TITLE",
        accessor: "title",
        Cell: props => <div>{props.cell.row.values.title}</div>,
      },
      {
        Header: "DATE",
        accessor: "updated_at",
        Cell: props => (
          <div>
            {moment(props.cell.row.values.updated_at).format("MMMM Do, YYYY")}
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
          <div className="flex flex-row align-middle justify-around px-1 py-2">
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

  const data = useMemo(() => [...articles], [articles]);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = tableInstance;
  return (
    <div className="">
      <div className="">
        <Dropdown buttonStyle="secondary" label="Columns" position="bottom-end">
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
      </div>
      <table
        {...getTableProps()}
        className="border border-collapse w-full border-black shadow-lg mb-10"
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
              className="border border-black"
            >
              {headerGroup.headers.map(column => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="border w-3/4 bg-gray-400 border-gray-400"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody key="" {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                {...row.getRowProps()}
                className="border border-gray-400"
              >
                {row.cells.map(cell => {
                  return (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className="border px-3 border-gray-400 font-medium cursor-pointer"
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
  );
};
export default Table;
