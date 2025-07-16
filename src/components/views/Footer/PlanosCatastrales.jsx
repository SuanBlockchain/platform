import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";

const faqs = [
  {
    question: "¿Qué significado tienen los Planos Catastrales?",
    answer:
      "Son representaciones gráficas detalladas de una propiedad inmobiliaria que incluyen sus características físicas y jurídicas. Son clave para el registro en el catastro.",
  },
  {
    question: "¿Qué significa el Número de Matrícula Inmobiliaria?",
    answer:
      "Número único en el registro público que identifica la propiedad. Funciona como la cédula del predio.",
  },
  {
    question: "¿Para qué se utiliza el Código/Número Catastral?",
    answer:
      "Sirve para identificar y gestionar la propiedad en el catastro.",
  },
  {
    question: "¿Cómo se define la Dirección del Inmueble?",
    answer:
      "Incluye la calle, número y otros datos clave para identificar su ubicación.",
  },
  {
    question: "¿Qué significan las Dimensiones del Terreno?",
    answer:
      "Largo, ancho y área total en m². Es fundamental para conocer el tamaño exacto del predio.",
  },
  {
    question: "¿Qué describe la forma del Terreno?",
    answer:
      "Si es rectangular, irregular, etc. Ayuda a visualizar la distribución del espacio.",
  },
  {
    question: "¿A qué corresponde los Linderos de un Terreno?",
    answer:
      "Define los límites del terreno y qué hay alrededor (calles, ríos, otras propiedades).",
  },
  {
    question: "¿A qué datos se refiere la elevación y pendiente de un Terreno?",
    answer:
      "Altura e inclinación del terreno. Importante para construcción y diseño.",
  },
  {
    question: "¿Qué describen las características del suelo?",
    answer:
      "Composición, humedad, cuerpos de agua. Afectan construcciones y vegetación.",
  },
  {
    question: "¿Qué describe la ubicación de las Construcciones en el terreno?",
    answer:
      "Indica dónde están ubicadas las edificaciones dentro del predio.",
  },
  {
    question: "¿A qué hacen referencia las dimensiones de las Construcciones?",
    answer:
      "Tamaño en metros cuadrados de las estructuras existentes.",
  },
  {
    question: "¿Qué se describe con los Tipos de construcciones?",
    answer:
      "Casas, edificios, bodegas, etc. Ayuda a definir el uso del espacio.",
  },
  {
    question: "¿Qué indica el Uso de las construcciones?",
    answer:
      "Finalidad: residencial, comercial, industrial, etc.",
  },
  {
    question: "¿Qué describe la Zonificación de un área?",
    answer:
      "Define las actividades permitidas en el terreno según planeación territorial.",
  },
  {
    question: "¿Qué descripción tienen las Restricciones de uso?",
    answer:
      "Limitaciones legales o normativas sobre cómo puede usarse la propiedad.",
  },
  {
    question: "¿A qué corresponden las Servidumbres sobre un inmueble?",
    answer:
      "Derechos de uso o acceso de terceros sobre el predio. Ej: servidumbre de paso.",
  },
  {
    question: "¿Qué significados tienen los Gravámenes?",
    answer:
      "Cargas legales como hipotecas o embargos que limitan la disposición del bien.",
  },
];

const PlanosCatastrales = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <NewHeaderNavbar />

      <div className="pt-10 pb-20 px-4 max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center text-[#4b4a2f] mb-4">
            Preguntas Frecuentes
          </h1>
          <h2 className="text-xl text-center text-[#6e6c35] font-semibold mb-8">
            Planos Catastrales
          </h2>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg transition-all duration-300 bg-[#fefefe] shadow-sm"
              >
                <button
                  className="w-full flex justify-between items-center text-left px-4 py-3 font-semibold text-[#4b4a2f] hover:bg-[#ecead8] rounded-lg focus:outline-none transition-all"
                  onClick={() => toggleIndex(index)}
                >
                  {item.question}
                  {openIndex === index ? (
                    <FiChevronUp className="text-[#6e6c35]" />
                  ) : (
                    <FiChevronDown className="text-[#6e6c35]" />
                  )}
                </button>
                <div
                  className={`px-4 pb-4 text-sm text-[#444] transition-all duration-300 ease-in-out ${
                    openIndex === index ? "block" : "hidden"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanosCatastrales;
