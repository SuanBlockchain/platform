export const stateMapper = {
  PENDING: {
    label: "Pendiente",
    color: "bg-yellow-500", // Color de fondo para el estado pendiente
    description: "El documento está pendiente de revisión.",
  },
  DOC_UPLOADED: {
    label: "Documento Subido",
    color: "bg-blue-500", // Color de fondo para el estado de documento subido
    description: "El documento ha sido subido exitosamente.",
  },
  SELECTABLE: {
    label: "Elegible",
    color: "bg-green-500", // Color de fondo para el estado seleccionable
    description: "El documento es seleccionable para acciones.",
  },
  NOT_SELECTABLE: {
    label: "No Elegible",
    color: "bg-red-500", // Color de fondo para el estado no seleccionable
    description: "El documento no puede ser seleccionado.",
  },
  APPROVED: {
    label: "Aprobado",
    color: "bg-green-600", // Color de fondo para el estado aprobado
    description: "El documento ha sido aprobado.",
  },
  REJECTED: {
    label: "Rechazado",
    color: "bg-red-600", // Color de fondo para el estado rechazado
    description: "El documento ha sido rechazado.",
  },
};
