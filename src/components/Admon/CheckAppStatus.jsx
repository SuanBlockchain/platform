import React, { useEffect, useState } from "react";
import axios from "axios";
import { API, Auth, graphqlOperation } from "aws-amplify";
const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        role
        email
        marketplaceID
        marketplace {
          name
        }
      }
      nextToken
      __typename
    }
  }
`;
const AppTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listUsersAdmin, setListUserItems] = useState([]);

  useEffect(() => {
    const loadAdmins = async () => {
      const result = await API.graphql(
        graphqlOperation(listUsers, { filter: { role: { eq: "admon" } } })
      );
      return result.data.listUsers
        .items; /* .filter(item => item.marketplaceID); */
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://52w4ayglef.execute-api.us-east-1.amazonaws.com/dev/get-apps-brief"
        );
        return response.data;
      } catch (err) {
        throw new Error(err.message);
      }
    };

    const loadAllData = async () => {
      try {
        setLoading(true);
        const [admins, apps] = await Promise.all([loadAdmins(), fetchData()]);
        console.log('apps', apps)
        const linkedData = await linkAdminsToApps(apps, admins);
        setData(linkedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  const linkAdminsToApps = async (apps, admins) => {
    const platformAdmin = await Auth.currentAuthenticatedUser();
    return apps.map((app) => {
      const marketplaceName = app.appName.split("-")[0]; // Asumimos que el nombre del app se estructura como 'marketplace-...'
      const admin = admins.find(
        (ad) => ad.marketplaceID.toLowerCase() === marketplaceName
      );
      return {
        ...app,
        adminName: admin ? admin.name.toLowerCase() : platformAdmin.username,
        adminEmail: admin ? admin.email : platformAdmin.attributes.email,
      };
    });
  };
  const formatDeployTime = (deployTime) => {
    const date = new Date(deployTime);
    return date
      .toLocaleString("en-GB", {
        timeZone: "UTC",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(",", "");
  };

  const pastelColors = [
    "#F0F4C3",
    "#BBDEFB",
    "#FFE0B2",
    "#D1C4E9",
    "#B2EBF2",
    "#DCEDC8",
  ];

  const getColorForAppId = (appId) => {
    const appIndex = data.findIndex((app) => app.appId === appId);
    return pastelColors[appIndex % pastelColors.length];
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  let lastAppId = null;
  let lastAppName = null;

  return (
    <div className="w-full flex justify-center">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Branch Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Deploy Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Domain Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((app) =>
              app.domainInfo.map((domain, index) => (
                <tr
                  key={`${app.appId}-${domain.branchName}-${index}`}
                  style={{ backgroundColor: getColorForAppId(app.appId) }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {lastAppId !== app.appId
                      ? (lastAppId = app.appId) && (
                          <a
                            href={`https://us-east-1.console.aws.amazon.com/amplify/apps/${app.appId}/overview`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600"
                          >
                            {app.appId}
                          </a>
                        )
                      : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lastAppName !== app.appName
                      ? (lastAppName = app.appName) && app.appName
                      : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-sm text-gray-500">
                    <a
                      href={`https://us-east-1.console.aws.amazon.com/amplify/apps/${app.appId}/branches/${domain.branchName}/deployments`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500"
                    >
                      {domain.branchName}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.branches.find(
                      (branch) => branch.branchName === domain.branchName
                    )?.lastDeployTime
                      ? formatDeployTime(
                          app.branches.find(
                            (branch) => branch.branchName === domain.branchName
                          )?.lastDeployTime
                        )
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {domain.prefix && domain.prefix !== "N/A" ? (
                      <a
                        href={`https://${domain.prefix}.${domain.domainName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {`${domain.prefix}.${domain.domainName}`}
                      </a>
                    ) : domain.prefix === "N/A" && domain.domainName ? (
                      <a
                        href={`https://${domain.domainName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {domain.domainName}
                      </a>
                    ) : domain.domainName ? (
                      <a
                        href={`https://${domain.branchName}.${domain.domainName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {`${domain.branchName}.${domain.domainName}`}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.adminName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.adminEmail}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppTable;
