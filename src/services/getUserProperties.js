import { API, graphqlOperation } from "aws-amplify";
import { listProperties } from "../utilities/customQueries";

export default function getPropertiesByUserID({userID} = {}) {
  return API.graphql(graphqlOperation(listProperties))
    .then((res) => {
      if (!res.data.listProperties) throw new Error("Response is NOT ok");
      return res.data.listProperties.items
    })
    .then((res) => {
      // Respuesta mapeada
      const filteredPropertiesByUser = res.filter((property) => property.userID === userID)
      return filteredPropertiesByUser
    });
}
