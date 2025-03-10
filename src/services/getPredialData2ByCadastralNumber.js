export const getPredialData2ByCadastralNumber = async (cadastralNumbers) => {
  // URL de la consulta
  const url =
    `${process.env["REACT_APP_CADASTRAL_QUERY_URL"]}/18/query`;

  const whereClause = `NUMERO_DEL_PREDIO IN ('${cadastralNumbers.join(
    "','"
  )}')`;

  // Parámetros de la consulta
  const queryParams = {
    where: whereClause,
    outFields: "*",
    f: "pjson",
    token: "", // Asegúrate de reemplazar "tu_token_aqui" con el token real
  };

  // Construir la URL completa con los parámetros
  const fullUrl = `${url}?${new URLSearchParams(queryParams)}`;

  try {
    const response = await fetch(fullUrl);
    const data = await response.json();
    const mappedData = data.features.reduce((result, feature) => {
      const numeroDelPredio = feature.attributes.NUMERO_DEL_PREDIO;

      result[numeroDelPredio] = {
        ...feature.attributes,
      };
      return result;
    }, {});
    return mappedData;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
};
