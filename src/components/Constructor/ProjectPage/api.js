import { API, graphqlOperation } from "aws-amplify";
import { getProduct } from "../../../utilities/customQueries";
import { mapProjectData, mapPropertyData } from "./mappers";
import { getProperty } from "graphql/queries";

export const fetchProjectDataByProjectID = async (projectId) => {
  if (projectId) {
    try {
      const response = await API.graphql(
        graphqlOperation(getProduct, { id: projectId })
      );
      const mappedData = mapProjectData(response.data.getProduct);
      return mappedData;
    } catch (error) {
      console.error("Error fetching project data:", error);
      return null;
    }
  }

  return null;
};

export const fetchPropertyDataByPropertyID = async (propertyId) => {
  if (propertyId) {
    try {
      const response = await API.graphql(
        graphqlOperation(getProperty, { id: propertyId })
      );
      const mappedData = mapPropertyData(response.data.getProperty);
      return mappedData;
    } catch (error) {
      console.error("Error fetching project data:", error);
      return null;
    }
  }

  return null;
};