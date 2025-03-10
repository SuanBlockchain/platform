import { API, graphqlOperation } from "aws-amplify";
import { listProductItems } from "../utilities/customQueries";
import { groupBy } from 'lodash';

export const getProjectItems = async () => {
  try {
    const response = await API.graphql(graphqlOperation(listProductItems));
    const groupedData = groupBy(response.data.listProductItems.items, 'type');
    return groupedData;
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
};
