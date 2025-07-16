import { fetchPropertyDataByPropertyID } from "components/Constructor/ProjectPage/api";
import React, { useContext, useState } from "react";

const PropertyDataContext = React.createContext();

export function usePropertyData() {
  return useContext(PropertyDataContext);
}

export function PropertyDataProvider({ children }) {
  const [propertyData, setPropertyData] = useState(null);
  const [propertyID, setPropertyID] = useState(null);

  const handlePropertyData = async ({ pID }) => {
    if (!pID) {
      console.error("Page parameter is missing.");
      return;
    }
    setPropertyID(pID);
    await fetchPropertyData(pID);
  };

  const fetchPropertyData = async (pID = null) => {
    const property_id = propertyID || pID;
    if (property_id) {
      const data = await fetchPropertyDataByPropertyID(property_id);
      setPropertyData(data);

      return data;
    }
    setPropertyData(null);
    return null;
  };

  const refresh = async () => {
    fetchPropertyData();
    return;
  };

  const contextProps = {
    propertyData,
    handlePropertyData,
    fetchPropertyData,
    refresh,
  };

  return (
    <PropertyDataContext.Provider value={contextProps}>
      {children}
    </PropertyDataContext.Provider>
  );
}
