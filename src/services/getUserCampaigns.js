import { API, graphqlOperation } from "aws-amplify";
import { listCampaigns } from "../utilities/customQueries";

export default function getCampaignsByUserID({userID} = {}) {
  return API.graphql(graphqlOperation(listCampaigns))
    .then((res) => {
      if (!res.data.listCampaigns) throw new Error("Response is NOT ok");
      return res.data.listCampaigns.items
    })
    .then((res) => {
      // Respuesta mapeada
      const filteredPropertiesByUser = res.filter((campaign) => campaign.userID === userID)
      return filteredPropertiesByUser
    });
}
