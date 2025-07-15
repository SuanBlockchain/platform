import React, { useState } from "react";
import useUserProjects from "hooks/useUserProjects";
import useUserProperties from "hooks/useUserProperties";
import useUserCampaigns from "hooks/useUserCampaigns";
import ModalNewProperty from "../Campaign/ModalNewProperty";
import {
  FaBullhorn,
  FaFilter,
  FaThumbsUp,
  FaHourglassHalf,
  FaThumbsDown,
  FaEye,
} from "react-icons/fa";

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-700",
  DOC_UPLOADED: "bg-blue-100 text-blue-700",
  SELECTABLE: "bg-green-100 text-green-700",
  NOT_SELECTABLE: "bg-red-100 text-red-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const statusLabels = {
  PENDING: "Pendiente",
  DOC_UPLOADED: "Documentos subidos",
  SELECTABLE: "Elegible",
  NOT_SELECTABLE: "No elegible",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
};

export default function ProductsList() {
  const { userProjects } = useUserProjects();
  const { userProperties } = useUserProperties();
  const { userCampaigns } = useUserCampaigns();
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const sortedProperties = [...userProperties].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredProperties = sortedProperties.filter((p) =>
    selectedStatus === "ALL" ? true : p.status === selectedStatus
  );

  const assignedProperties = filteredProperties.filter((p) => p.campaignID);
  const unassignedProperties = filteredProperties.filter((p) => !p.campaignID);

  const getButtonClass = (status) =>
    `flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full transition ${
      selectedStatus === status
        ? status === "ALL"
          ? "bg-indigo-500 text-white shadow-sm"
          : status === "APPROVED"
          ? "bg-green-600 text-white"
          : status === "PENDING"
          ? "bg-yellow-500 text-white"
          : status === "REJECTED"
          ? "bg-red-600 text-white"
          : "bg-gray-300 text-white"
        : status === "APPROVED"
        ? "text-green-600 hover:bg-green-50"
        : status === "PENDING"
        ? "text-yellow-600 hover:bg-yellow-50"
        : status === "REJECTED"
        ? "text-red-600 hover:bg-red-50"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="px-4 sm:px-6 py-10 max-w-screen-xl mx-auto w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Tus Predios Postulados
        </h2>

        <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border">
            <button onClick={() => handleStatusFilter("ALL")} className={getButtonClass("ALL")}>
              <FaFilter /> Todos
            </button>
            <button onClick={() => handleStatusFilter("APPROVED")} className={getButtonClass("APPROVED")}>
              <FaThumbsUp /> Aprobado
            </button>
            <button onClick={() => handleStatusFilter("PENDING")} className={getButtonClass("PENDING")}>
              <FaHourglassHalf /> Pendiente
            </button>
            <button onClick={() => handleStatusFilter("REJECTED")} className={getButtonClass("REJECTED")}>
              <FaThumbsDown /> Rechazado
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Crear Predio Sin Asignar
          </button>
        </div>
      </div>

      <section className="mb-12">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaBullhorn className="text-purple-500" />
          Predios Asignados a Campañas
        </h3>
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Predio</th>
                <th className="px-6 py-3">Campaña</th>
                <th className="px-6 py-3">Región</th>
                <th className="px-6 py-3">Postulación</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {assignedProperties.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4">{p.campaign?.name}</td>
                  <td className="px-6 py-4">
                    {p.department ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {p.department}
                      </span>
                    ) : (
                      <span className="italic text-gray-400">Sin región</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[p.status] || "bg-gray-100 text-gray-700"}`}>
                      {statusLabels[p.status] || p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`/property/${p.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800 transition"
                    >
                      <span className="hover:underline">Ver detalles</span>
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100">
                        <FaEye size={12} />
                      </span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaBullhorn className="text-gray-500" />
          Predios Sin Asignar
        </h3>
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Predio</th>
                <th className="px-6 py-3">Campaña</th>
                <th className="px-6 py-3">Región</th>
                <th className="px-6 py-3">Postulación</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {unassignedProperties.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-gray-400 italic">Sin campaña asignada</td>
                  <td className="px-6 py-4">
                    {p.department ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {p.department}
                      </span>
                    ) : (
                      <span className="italic text-gray-400">Sin región</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[p.status] || "bg-gray-100 text-gray-700"}`}>
                      {statusLabels[p.status] || p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`/property/${p.id}`}
                      className="text-blue-600 hover:underline flex items-center justify-end gap-1"
                    >
                      Ver Detalles <FaEye size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ModalNewProperty
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        campaignId={null}
        productId={null}
        fetchCampaign={() => {}}
      />
    </div>
  );
}
