import React from "react";
import Card from "components/common/Card";
import useFetchPropertiesProject from "hooks/useFetchPropertiesProject";
import { formatArea, getAreaFromPf } from "../../mappers";
export default function PropertiesTable() {
  const { properties } = useFetchPropertiesProject();

  return (
    <Card>
      <Card.Header title="Tabla de predios asociados" sep={true} />
      <Card.Body>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left" style={{ width: "180px" }}>
                Nombre de predio
              </th>
              <th className="text-left" style={{ width: "180px" }}>
                Área (m^2)
              </th>
              <th style={{ width: "120px" }}></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr
                key={property.id}
                className="border-b-2"
                style={{ height: "3rem" }}
              >
                <td className="text-left">{property.name}</td>
                <td className="text-left">
                  {formatArea(getAreaFromPf(property))}
                </td>
                <td>
                  <a
                    href={`/property/${property.id}`}
                    className="border-2 border-yellow-500 bg-yellow-500 rounded-md px-2 py-1 active:bg-yellow-600 active:border-yellow-600"
                  >
                    Detalles
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}
