import { API, graphqlOperation } from "aws-amplify";
import { mapProjectData } from "../components/Constructor/ProjectPage/mappers";
import { getProduct } from "../utilities/customQueries";

export const getProject = async (projectID) => {
  try {
    const response = await API.graphql(graphqlOperation(getProduct, { id: projectID }));
    const mappedData = mapProjectData(response.data.getProduct);
    return mappedData;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
};