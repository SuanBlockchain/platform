import React, { useEffect, useState } from "react";
import { TrashIcon } from "components/common/icons/TrashIcon";
import { EditIcon } from "components/common/icons/EditIcon";
import { PlusIcon } from "components/common/icons/PlusIcon";
import { SaveDiskIcon } from "components/common/icons/SaveDiskIcon";
import PropertyDistributionSubTable from './PropertyDistributionSubTable';

const TokenDistributionTable = ({
  canEdit,
  infoTable,
  handleChangeInputValue,
  columns,
  handleAddCashFlow,
  handleDeleteHistoricalData,
  conceptOptions = [],
  handleSaveAll,
  properties,
  handlePropertyDistributionChange,
}) => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (infoTable) {
      setData(infoTable);
    }
  }, [infoTable]);

  const handleAdd = () => {
    if (isEditing) handleAddCashFlow();
  };

  const handleSave = async () => {
    const success = await handleSaveAll();
    if (success) {
      setIsEditing(false);
    }
  };
  
  const hasDuplicateConcept = (() => {
    const concepts = data.map(row => row.STAKEHOLDER).filter(Boolean);
    return new Set(concepts).size !== concepts.length;
  })();

  const hasEmptyConcept = data.some(row => !row.STAKEHOLDER || row.STAKEHOLDER === "");

  return (
    <table className="w-full border border-gray-200 rounded-md">
      <thead className="text-center bg-gray-100">
        <tr>
          {columns.map((column) => (
            <th
              scope="col"
              className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-700 uppercase"
              key={column}
            >
              {column.replace("_", " ")}
            </th>
          ))}
          <th className="w-32"></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row, index) => (
            <React.Fragment key={index}>
              <tr
                className="bg-white border-t text-center align-middle"
                style={{ height: "3rem" }}
              >
                {columns.map((column) => (
                  <td className="px-6 py-4" key={column}>
                    {isEditing ? (
                      column === "STAKEHOLDER" ? (
                        <select
                          className="text-center border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={data[index][column] || ""}
                          name={`input-${column}-${index}`}
                          onChange={handleChangeInputValue}
                          aria-label="Seleccionar concepto"
                          tabIndex={0}
                        >
                          <option disabled value="">
                            Selecciona un stakeholder
                          </option>
                          {conceptOptions.map((op) => (
                            <option value={op.name} key={op.id}>
                              {op.name}
                            </option>
                          ))}
                        </select>
                      ) : column === "TOKENS" ? (
                        <input
                          className="text-center border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          type="number"
                          value={data[index][column]}
                          name={`input-${column}-${index}`}
                          onChange={handleChangeInputValue}
                          aria-label="Cantidad"
                          tabIndex={0}
                          min="0"
                        />
                      ) : (
                        <input
                          className="text-center border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                          type="text"
                          value={data[index][column]}
                          name={`input-${column}-${index}`}
                          onChange={handleChangeInputValue}
                          aria-label={column}
                          tabIndex={0}
                        />
                      )
                    ) : column === "TOKENS" ? (
                      parseFloat(row[column] || 0).toLocaleString("es-ES")
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
                <td className="flex justify-center items-center px-2 py-2">
                  {isEditing && (
                    <button
                      className="bg-red-600 hover:bg-red-700 p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                      disabled={canEdit}
                      onClick={() => handleDeleteHistoricalData(index)}
                      aria-label="Eliminar"
                      tabIndex={0}
                    >
                      <TrashIcon />
                    </button>
                  )}
                </td>
              </tr>
              {row.STAKEHOLDER === 'PROPIETARIO' && (
                <tr className="bg-white">
                    <td colSpan={columns.length + 1} className="p-0 border-none">
                        <PropertyDistributionSubTable
                            properties={properties}
                            ownerTotalTokens={parseFloat(row.TOKENS) || 0}
                            onDistributionChange={(dist) => handlePropertyDistributionChange(index, dist)}
                            propertyDistribution={row.propertyDistribution}
                            isEditing={isEditing}
                        />
                    </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        <tr>
          <td colSpan={columns.length + 1}>
            <div className="flex flex-col gap-2">
              <button
                className={`bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-md w-full flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-gray-300`}
                style={{ display: isEditing ? 'flex' : 'none' }}
                disabled={canEdit}
                onClick={handleAdd}
                aria-label="Agregar nueva fila"
                tabIndex={0}
              >
                <PlusIcon />
              </button>
              {isEditing ? (
                <button
                  className="bg-green-700 hover:bg-green-800 text-white p-2 rounded-md w-full flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-green-400"
                  disabled={canEdit || hasEmptyConcept || hasDuplicateConcept}
                  onClick={handleSave}
                  aria-label="Guardar cambios"
                  tabIndex={0}
                >
                  <SaveDiskIcon />
                </button>
              ) : (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md w-full flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  disabled={canEdit}
                  onClick={() => setIsEditing(true)}
                  aria-label="Editar"
                  tabIndex={0}
                >
                  <EditIcon />
                </button>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TokenDistributionTable; 