import axios from "axios";
import * as XLSX from "xlsx";

function convertToHierarchicalStructure(inputData) {
  const result = [];
  const stack = [];

  for (const item of inputData) {
    if (item.type === "begin_group" || item.type === "begin_repeat") {
      // Inicio de un grupo o repetición
      const groupItem = { ...item, items: [] };
      stack.push(groupItem);
    } else if (item.type === "end_group" || item.type === "end_repeat") {
      // Fin de un grupo o repetición
      const endItemType = item.type === "end_group" ? "begin_group" : "begin_repeat";
      if (stack.length > 0 && stack[stack.length - 1].type === endItemType) {
        const currentGroup = stack.pop();
        if (stack.length === 0) {
          // Estamos en el nivel superior
          result.push(currentGroup);
        } else {
          // Agregamos el grupo al grupo padre
          stack[stack.length - 1].items.push(currentGroup);
        }
      }
    } else {
      // Elemento individual
      if (stack.length > 0) {
        // Estamos dentro de un grupo o repetición, agregamos el elemento
        stack[stack.length - 1].items.push(item);
      } else {
        // Estamos en el nivel superior, agregamos el elemento directamente
        result.push(item);
      }
    }
  }

  return result;
}

// Funcion deprecada
function groupElements(formattedJsonData) {
  const result = [];
  let currentGroup = null;
  let currentRepeat = null;

  for (const item of formattedJsonData) {
    if (item.type === "begin_group") {
      currentGroup = { ...item, type: "begin_group", items: [] };
      continue;
    }
    if (item.type === "begin_repeat") {
      currentRepeat = { ...item, type: "repeat", items: [] };
      continue;
    }

    if (item.type === "end_group") {
      if (currentGroup) {
        result.push(currentGroup);
        currentGroup = null;
      }
      continue;
    }
    if (item.type === "end_repeat") {
      if (currentRepeat) {
        result.push(currentRepeat);
        currentRepeat = null;
      }
      continue;
    }

    if (currentGroup) {
      currentGroup.items.push(item);
      continue;
    }
    if (currentRepeat) {
      currentRepeat.items.push(item);
      continue;
    }

    result.push(item);

    // if (item.type === "begin_group") {
    //   // Modo recursivo (multiples niveles de agrupacion)
    //   // if (currentGroup) {
    //   //   result.push(currentGroup);
    //   // }
    //   currentGroup = { ...item, type: "group", items: [] };
    // } else if (item.type === "end_group") {
    //   if (currentGroup) {
    //     result.push(currentGroup);
    //     currentGroup = null;
    //   }
    // } else if (currentGroup) {
    //   currentGroup.items.push(item);
    // } else {
    //   // Si no estamos dentro de un grupo, agregar el elemento directamente
    //   result.push(item);
    // }
  }

  return result;
}

export const getXLSXForm = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const data = new Uint8Array(response.data);

    const workbook = XLSX.read(data, { type: "array" });

    // Supongamos que tienes una sola hoja en el archivo XLSX
    const inputs = workbook.SheetNames[0];
    const options = workbook.SheetNames[1];
    const inputsSheet = workbook.Sheets[inputs];
    const optionsSheet = workbook.Sheets[options];

    const inputsJsonData = XLSX.utils.sheet_to_json(inputsSheet, { header: 1 });
    const optionsJsonData = XLSX.utils.sheet_to_json(optionsSheet, {
      header: 1,
    });

    // Obtener indices de los headers para su identificacion
    const headers = inputsJsonData[0];

    const typeIndex = headers.indexOf("type");
    const nameIndex = headers.indexOf("name");
    const labelIndex = headers.indexOf("label");
    const hintIndex = headers.indexOf("hint");
    const requiredIndex = headers.indexOf("required");
    const readonlyIndex = headers.indexOf("readonly");
    const appearanceIndex = headers.indexOf("appearance");
    const relevantIndex = headers.indexOf("relevant");
    const constraintIndex = headers.indexOf("constraint");
    const requiredMessageIndex = headers.indexOf("required_message");

    // Convierte la hoja de inputs en un objeto JSON y mapea
    const formattedInputsJsonData = inputsJsonData.map((row, index) => ({
      type: row[typeIndex],
      name: row[nameIndex],
      label: row[labelIndex],
      hint: row[hintIndex],
      required: row[requiredIndex],
      readonly: row[readonlyIndex],
      appearance: row[appearanceIndex],
      relevant: row[relevantIndex],
      constraint: row[constraintIndex],
      required_message: row[requiredMessageIndex],
    }));
    formattedInputsJsonData.shift();

    // Convierte la hoja de options en un objeto JSON y mapea
    const formattedOptionsJsonData = optionsJsonData.map((row, index) => ({
      list_name: row[0],
      name: row[1],
      label: row[2],
    }));
    // Eliminar primer elemento de formattedJsonData
    formattedOptionsJsonData.shift();
    const groupedFormattedOptionsJsonData = {};

    // Iteramos sobre los elementos y los agrupamos por "list_name"
    formattedOptionsJsonData.forEach(({ list_name, name, label }) => {
      if (!groupedFormattedOptionsJsonData[list_name]) {
        groupedFormattedOptionsJsonData[list_name] = [];
      }

      groupedFormattedOptionsJsonData[list_name].push({ name, label });
    });


    return {
      //survey2: groupElements(formattedInputsJsonData),
      survey: convertToHierarchicalStructure(formattedInputsJsonData),
      options: groupedFormattedOptionsJsonData,
    };
  } catch (error) {
    throw new Error("Error al descargar el archivo XLSX: " + error.message);
  }
};
