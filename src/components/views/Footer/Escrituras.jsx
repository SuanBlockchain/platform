import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";

const faqs = [
  {
    question: "¿Qué es la Escritura Pública de un Predio?",
    answer:
      "Corresponde a un documento legal que se utiliza para formalizar una variedad de transacciones inmobiliarias...",
  },
  {
    question: "¿A qué corresponde el número de Escritura?",
    answer:
      "Es el número único asignado a la escritura, que sirve para identificarla en el registro público.",
  },
  {
    question: "¿Qué significa fecha de Otorgamiento en una Escritura?",
    answer:
      "Corresponde a la fecha en que se firmó y otorgó la escritura pública ante el notario.",
  },
  {
    question: "¿A qué corresponde la información de Notaria (Número y Ciudad)?",
    answer:
      "Es la información sobre la notaría donde se firmó la escritura, incluyendo el número y la ciudad.",
  },
  {
    question: "¿A qué corresponde un Tipo de un acto jurídico?",
    answer:
      "Puede ser: Compraventa, Hipoteca, Donación, herencia, entre otros.",
  },
  {
    question: "¿Qué se detalla en la Descripción de un acto jurídico?",
    answer:
      "Cada uno de los aspectos relevantes del acto jurídico, como partes involucradas, valores, condiciones, etc.",
  },
  {
    question: "¿A qué se refiere la descripción de un inmueble?",
    answer:
      "A la ubicación física detallada del predio, que permite identificarlo con precisión.",
  },
  {
    question: "¿A qué corresponde el número de Matrícula Inmobiliaria?",
    answer:
      "Número único en el registro público que identifica el predio como su cédula.",
  },
  {
    question: "¿Para qué se utiliza el Código Catastral?",
    answer:
      "Para ubicar la propiedad en el catastro, registro público inmobiliario.",
  },
  {
    question: "¿Cómo se define el Área del terreno de un predio?",
    answer: "Es el tamaño del terreno expresado en metros cuadrados (m²).",
  },
  {
    question: "¿Cómo se define el área construida?",
    answer: "Es la superficie construida expresada también en metros cuadrados.",
  },
  {
    question: "¿A qué corresponde los Linderos y Medidas de un terreno?",
    answer:
      "Al detalle de los límites y medidas del terreno por cada punto cardinal.",
  },
  {
    question: "¿A qué corresponde el Tipo de Inmueble?",
    answer:
      "Casa, Apartamento, Lote o terreno, Finca, Local Comercial, etc.",
  },
  {
    question: "¿A qué se define Uso del Suelo?",
    answer:
      "Residencial, Comercial, Industrial, Rural, Mixto según normas urbanísticas.",
  },
  {
    question: "¿A qué hace referencia el Nombre Completo del Propietario(s)?",
    answer:
      "Último titular de la propiedad, puede ser persona natural o jurídica.",
  },
  {
    question: "¿A qué hace referencia el Tipo de Documento de Identidad?",
    answer:
      "CC, CE, Pasaporte o NIT según el tipo de propietario.",
  },
  {
    question: "¿A qué referencia el número de documento de Identidad?",
    answer:
      "Número del documento del último adquirente de la propiedad.",
  },
  {
    question: "¿A qué hace referencia el Porcentaje de Participación?",
    answer:
      "Si hay varios propietarios, representa la proporción de cada uno sobre el bien.",
  },
  {
    question: "¿A qué corresponde el Modo de Adquisición?",
    answer:
      "Compra, Sucesión, Donación, Permuta, etc.",
  },
  {
    question: "¿A qué corresponde la Dirección de Notificación?",
    answer:
      "Dirección del propietario para recibir comunicaciones oficiales.",
  },
  {
    question: "¿A qué hace referencia el Nombre Completo del Anterior Propietario?",
    answer:
      "Es el nombre del dueño anterior del predio.",
  },
  {
    question: "¿A qué corresponde el Tipo de Documento de Identidad?",
    answer:
      "Del propietario anterior, puede ser CC, CE, Pasaporte o NIT.",
  },
  {
    question: "¿A qué corresponde el Número de Documento de Identidad?",
    answer:
      "Número de identificación del propietario anterior.",
  },
  {
    question: "¿A qué corresponde la Forma de Transmisión de la Propiedad?",
    answer:
      "Venta, herencia, donación, etc.",
  },
  {
    question: "¿A qué corresponde la Fecha de Traspaso?",
    answer:
      "Fecha en que se formalizó el traspaso del bien.",
  },
  {
    question: "¿Cómo se definen los Gravámenes existentes de un predio?",
    answer:
      "Son limitaciones legales como hipotecas, embargos, servidumbres, etc.",
  },
  {
    question: "¿Cómo se define el concepto de Servidumbre?",
    answer:
      "Derecho real que otorga acceso o uso parcial a un tercero sobre el inmueble.",
  },
  {
    question: "¿A qué corresponde la fecha del registro del gravamen o la servidumbre?",
    answer:
      "Es la fecha en que se inscribió formalmente ese derecho en el registro.",
  },
  {
    question: "¿A qué corresponde la fecha en la que se canceló el gravamen o la servidumbre?",
    answer:
      "Es la fecha en que quedó sin efecto esa limitación, si aplica.",
  },
  {
    question: "¿Qué significado tiene la cláusula de Condiciones resolutivas?",
    answer:
      "Cláusula que anula la transacción si no se cumple una condición (ej: no pago).",
  },
  {
    question: "¿Cómo se definen las Restricciones de uso de un Propiedad?",
    answer:
      "Limitaciones por normativas locales o acuerdos sobre cómo puede usarse un inmueble.",
  },
  {
    question: "¿Cómo se definen las Regulaciones Especiales aplicable de una Propiedad?",
    answer:
      "Normas especiales aplicables por su ubicación, conservación histórica, etc.",
  },
];

const Escrituras = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      <NewHeaderNavbar />

      <div className="pt-10 pb-20 px-4 max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center text-[#4b4a2f] mb-4">
            Preguntas Frecuentes
          </h1>
          <h2 className="text-xl text-center text-[#6e6c35] font-semibold mb-8">
            Escrituras
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

export default Escrituras;
