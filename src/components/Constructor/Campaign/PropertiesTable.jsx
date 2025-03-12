import useFetchPropertiesCampaign from "hooks/useFetchPropertiesCampaign";
import ModalAcceptProperty from "./ModalAcceptProperty";
import { useState, useEffect } from "react";
import { Spinner, DropdownButton, Dropdown } from "react-bootstrap";
import { updateProperty } from "graphql/customMutations";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { mapPropertyData } from "../ProjectPage/mappers";
import { useNavigate } from "react-router";

const status = {
  REJECTED: "REJECTED",
  ACCEPTED: "APPROVED",
  PENDING: "PENDING",
};

const getUserById = async (userId) => {
  try {
    const user = await API.graphql(
      graphqlOperation(
        `query GetUser($id: ID!) {
          getUser(id: $id) {
            email
          }
        }`,
        { id: userId }
      )
    );
    return user.data.getUser.email || "N/A";
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return "N/A";
  }
};

const canViewCadastralNumbers = (property, userId, userRole) => {
  return (
    userRole === "admin" ||
    userRole === "validator" ||
    property.projectPostulant.id === userId ||
    property.propertyCampaign.userId === userId
  );
};

export default function PropertiesTable({ editable }) {
  const [showModalAcceptProperty, setShowModalAcceptProperty] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mappedProperties, setMappedProperties] = useState([]);
  const [cadastralDuplicates, setCadastralDuplicates] = useState({});
  const [userEmails, setUserEmails] = useState({});
  const { loading, properties } = useFetchPropertiesCampaign();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const data = await Auth.currentAuthenticatedUser();
        setUserId(data.attributes.sub);
        setUserRole(data.attributes["custom:role"]);
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
      }
    };

    fetchAuthenticatedUser();
  }, []);

  useEffect(() => {
    const mapData = async () => {
      if (!properties || properties.length === 0) return;

      // Map property data
      const mappedProp = await Promise.all(
        properties.map((prop) => mapPropertyData(prop))
      );
      setMappedProperties(mappedProp);

      // Detect duplicates across all properties, across all campaigns
      const duplicates = {};

      mappedProp.forEach((property) => {
        const cadastralNumbers = property.projectCadastralRecords.cadastralNumbers
          ? property.projectCadastralRecords.cadastralNumbers.split(",").map((num) => num.trim())
          : [];

        cadastralNumbers.forEach((num) => {
          if (duplicates[num]) {
            duplicates[num].push(property.propertyInfo.id);
          } else {
            duplicates[num] = [property.propertyInfo.id];
          }
        });
      });

      setCadastralDuplicates(duplicates);

      // Fetch associated user emails
      const userIds = [...new Set(mappedProp.map((prop) => prop.projectPostulant.id))];
      const emails = {};
      for (const id of userIds) {
        emails[id] = await getUserById(id);
      }
      setUserEmails(emails);
    };

    mapData();
  }, [properties]);

  const hideData = (data) => "*".repeat(data.length);

  const handleCloseModalAcceptProperty = () => {
    setShowModalAcceptProperty(false);
    setSelectedProperty(null);
  };

  const handleShowModalAcceptProperty = (property) => {
    setSelectedProperty(property);
    setShowModalAcceptProperty(true);
  };

  const handleRevokeValidation = async (propertyID) => {
    try {
      await API.graphql(
        graphqlOperation(updateProperty, {
          input: {
            id: propertyID,
            status: status.PENDING,
            reason: "",
          },
        })
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-20">
        <Spinner variant="success" />
      </div>
    );
  }

  return (
    <div className="row">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left px-4 py-2 w-44">Nombre del conjunto</th>
            <th className="text-left px-4 py-2 w-60">Identificador catastral</th>
            <th className="text-left px-4 py-2 w-44">Área Total</th>
            <th className="text-left px-4 py-2 w-44">Correo</th>
            <th className="text-left px-4 py-2 w-32">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mappedProperties.map((property, index) => {
            const cadastralNumbers = property.projectCadastralRecords.cadastralNumbers
              ? property.projectCadastralRecords.cadastralNumbers.split(",").map((num) => num.trim())
              : [];

            const isDuplicate = cadastralNumbers.some(
              (num) => cadastralDuplicates[num]?.length > 1
            );

            return (
              <tr
                key={property.propertyInfo.id}
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
              >
                <td className="px-4 py-2">{property.propertyInfo.name}</td>
                <td
                  className={`px-4 py-2 ${isDuplicate ? "bg-yellow-100 text-red-600" : "bg-white text-black"}`}
                >
                  {canViewCadastralNumbers(property, userId, userRole)
                    ? cadastralNumbers.join(", ")
                    : hideData(cadastralNumbers.join(", "))}

                  {isDuplicate && (
                    <span className="text-sm text-red-500 ml-2">(Duplicado)</span>
                  )}
                </td>
                <td className="px-4 py-2">{property.projectCadastralRecords.totalAreaFormatted}</td>
                <td className="px-4 py-2">
                  {canViewCadastralNumbers(property, userId, userRole)
                    ? userEmails[property.projectPostulant.id] || "N/A"
                    : "********"}
                </td>
                  <td className="px-4 py-2">
                  {property.projectPostulant.id === userId ||
                  property.propertyCampaign.userId === userId ||
                  editable ? (
                    <button
                      onClick={() =>
                        navigate(`/property/${property.propertyInfo.id}`)
                      }
                      className="border border-yellow-500 bg-yellow-500 text-white rounded-md px-4 py-2 hover:bg-yellow-600 active:bg-yellow-700"
                    >
                      Detalles
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ModalAcceptProperty
        handleCloseModalAcceptProperty={handleCloseModalAcceptProperty}
        showModalAcceptProperty={showModalAcceptProperty}
        selectedProperty={selectedProperty}
      />
    </div>
  );
}
