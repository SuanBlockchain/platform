import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";

const faqs = [
  {
    question: "¿Qué es el certificado de tradición y libertad?",
    answer:
      "Documento oficial emitido por la Superintendencia de Notariado y Registro en Colombia. Este certificado es fundamental para conocer la situación jurídica de un bien inmueble, ya que proporciona información detallada sobre la propiedad y su historial.",
  },
  {
    question: "¿A qué corresponde el Pin del certificado?",
    answer:
      "Corresponde al código único que identifica el certificado específico.",
  },
  {
    question: "¿Qué significa el número Matrícula Inmobiliaria?",
    answer:
      "Es un número único que identifica la propiedad en el registro público. Funciona como la cédula de identidad del predio y es esencial para cualquier trámite legal relacionado con la propiedad.",
  },
  {
    question: "¿A qué corresponde la fecha de expedición del certificado?",
    answer: "A la fecha en que se emitió el certificado.",
  },
  {
    question: "¿A qué corresponde el estado del folio?",
    answer: "Indica si el folio está activo, cancelado o en otro estado.",
  },
  {
    question: "¿Para qué se utiliza el código catastral?",
    answer:
      "Para identificar la propiedad en el catastro, que es un registro público de la propiedad inmobiliaria.",
  },
  {
    question: "¿A qué se refieren los datos de complementación?",
    answer:
      "Información adicional que resume aspectos importantes de la propiedad.",
  },
  {
    question: "¿Cómo se define la dirección del predio?",
    answer:
      "La ubicación física del predio, incluyendo la calle, número y cualquier otra información relevante.",
  },
  {
    question: "¿En qué consiste el tipo de predio?",
    answer:
      "Clasificación del predio según su ubicación y características: Urbano, suburbano, rústico, etc.",
  },
  {
    question: "¿A qué corresponde el Departamento?",
    answer: "Corresponde al departamento donde se encuentra la propiedad.",
  },
  {
    question: "¿A qué corresponde el Municipio?",
    answer: "Es el municipio específico donde está ubicada la propiedad.",
  },
  {
    question: "¿Qué significa Tipo de Inmueble?",
    answer:
      "Es la clasificación del tipo de propiedad, las cuales se clasifican en: Casa, apartamento, lote, finca, entre otros.",
  },
  {
    question: "¿Qué significa Área del Terreno?",
    answer: "Corresponde al tamaño del terreno en metros cuadrados.",
  },
  {
    question: "¿Qué significa Área Construida?",
    answer: "Corresponde al tamaño de la construcción en metros cuadrados.",
  },
  {
    question: "¿A qué se refiere el modo de adquisición del propietario actual?",
    answer:
      "Se refiere a la descripción de la forma en que el propietario actual adquirió la propiedad.",
  },
  {
    question: "¿Qué significa Nombre Completo o Razón Social?",
    answer:
      "Se refiere al nombre completo de la última persona que adquirió la propiedad, puede ser persona natural o persona jurídica.",
  },
  {
    question: "¿Cómo se define el Tipo de Documento?",
    answer:
      "Se define el tipo de documento como la identificación de la última persona que adquirió la propiedad, los tipos pueden ser Cédula de ciudadanía (CC), cédula de extranjería (CE), Pasaporte (P), o Número de identificación tributaria (NIT) en caso de ser persona jurídica.",
  },
  {
    question: "¿A qué corresponde el Número de Documento?",
    answer:
      "El número del documento de identificación corresponde al de la última persona que adquirió el bien.",
  },
  {
    question: "¿A qué corresponde la Fecha de Inscripción?",
    answer: "Corresponde a la fecha en que la propiedad fue inscrita en el registro.",
  },
  {
    question: "¿A qué hace referencia el resumen de historia de propiedad?",
    answer:
      "Hace referencia al resumen de los eventos significativos en la historia de la propiedad, incluyendo fechas y detalles de eventos.",
  },
  {
    question: "¿Qué significa Tipo de Gravamen?",
    answer:
      "El Gravamen es una carga o derecho real que se impone sobre un bien inmueble, limitando el uso o la disposición de la propiedad por parte del propietario. Generalmente de naturaleza financiera, los gravámenes pueden afectar la capacidad de vender o hipotecar la propiedad.",
  },
  {
    question: "¿A qué corresponde la Descripción del Gravamen?",
    answer:
      "Corresponde a la descripción detallada del gravamen, si está disponible.",
  },
  {
    question: "¿Qué significa Fecha de registro del gravamen?",
    answer: "Se refiere a la fecha en que se registró el gravamen.",
  },
  {
    question: "¿A qué corresponde la Fecha de cancelación del gravamen?",
    answer: "Corresponde a la fecha en que se canceló el gravamen, si aplica.",
  },
  {
    question: "¿A qué corresponde la entidad o persona del gravamen?",
    answer:
      "Corresponde al nombre de la persona natural o jurídica que cuenta con el gravamen.",
  },
];

const TradicionLibertad = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <NewHeaderNavbar />

      <div className="pt-10 pb-20 px-4 max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center text-[#4b4a2f] mb-4">
            Preguntas Frecuentes
          </h1>
          <h2 className="text-xl text-center text-[#6e6c35] font-semibold mb-8">
            Certificado de Tradición y Libertad
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

export default TradicionLibertad;
