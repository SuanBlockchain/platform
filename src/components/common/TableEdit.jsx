import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { TrashIcon } from "components/common/icons/TrashIcon";
import { EditIcon } from "components/common/icons/EditIcon";
import { PlusIcon } from "components/common/icons/PlusIcon";
import { SaveDiskIcon } from "components/common/icons/SaveDiskIcon";
export default function TableEdit({
  canEdit,
  infoTable,
  handleEditValue,
  handleChangeInputValue,
  columns,
  handleAddCashFlow,
  handleSaveHistoricalData,
  handleDeleteHistoricalData,
  conceptOptions,
}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (infoTable) {
      setData(infoTable);
    }
  }, [infoTable]);

  return (
    <table className="w-full">
      <thead className="text-center">
        <tr>
          {columns.map((column) => {
            return (
              <th scope="col" className="px-6 py-3" key={column}>
                {column.replace("_", " ")}
              </th>
            );
          })}
          <th style={{ width: "120px" }}></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row, index) => {
            return (
              <tr
                className="bg-white border-t-[1px]"
                style={{ height: "3rem" }}
                key={index}
              >
                {columns.map((column) => (
                  <td className="px-6 py-4 text-center" key={column}>
                    {row.editing ? (
                      column === "CONCEPTO" ? (
                        <Form.Select
                          size="sm"
                          type="text"
                          value={data[index][column] || ""}
                          className="text-center"
                          name={`input-${column}-${index}`}
                          onChange={(e) => handleChangeInputValue(e)}
                        >
                          <option disabled value=""></option>
                          {conceptOptions.map((op) => (
                            <option value={op.name} key={op.id}>
                              {op.name}
                            </option>
                          ))}
                        </Form.Select>
                      ) : column === "CANTIDAD" ? (
                        <Form.Control
                          size="sm"
                          type="number"
                          value={data[index][column]}
                          className="text-center"
                          name={`input-${column}-${index}`}
                          onChange={(e) => handleChangeInputValue(e)}
                        />
                      ) : (
                        <Form.Control
                          size="sm"
                          type="text"
                          value={data[index][column]}
                          className="text-center"
                          name={`input-${column}-${index}`}
                          onChange={(e) => handleChangeInputValue(e)}
                        />
                      )
                    ) : column === "CANTIDAD" ? (
                      parseFloat(row[column]).toLocaleString("es-ES")
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
                <td className="text-end">
                  {row.editing ? (
                    <button
                      className={`p-2 text-white bg-[#6e6c35] border-1 border-dark rounded-md  hover:bg-green-800 `}
                      onClick={() => handleSaveHistoricalData(index)}
                    >
                      <SaveDiskIcon />
                    </button>
                  ) : (
                    <button
                      className={`${
                        canEdit
                          ? "bg-[#f8d771]"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      } p-2 text-white  rounded-md  `}
                      disabled={canEdit}
                      onClick={() => handleEditValue(index)}
                    >
                      <EditIcon />
                    </button>
                  )}
                  <button
                    className={`${
                      canEdit ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                    } p-2 text-white  rounded-md ml-2 `}
                    disabled={canEdit}
                    onClick={() => handleDeleteHistoricalData(index)}
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        <tr>
          <td colSpan={5}>
            <div className="d-flex">
              <button
                className={`${
                  canEdit ? "bg-gray-300" : "bg-gray-400 hover:bg-gray-500"
                } text-white p-2  rounded-md w-full flex justify-center `}
                disabled={canEdit}
                onClick={() => handleAddCashFlow()}
              >
                <PlusIcon></PlusIcon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
