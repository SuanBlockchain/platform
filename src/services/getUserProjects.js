import { API, graphqlOperation } from "aws-amplify";
import { getUserProjects } from "../utilities/customQueries";

export default function getProjectsByUserID({userID} = {}) {
  return API.graphql(graphqlOperation(getUserProjects, { id: userID }))
    .then((res) => {
      if (!res.data.getUser) throw new Error("Response is NOT ok");
      return res.data.getUser
    })
    .then((res) => {
      // Respuesta mapeada
      return res.userProducts.items
    });
}
