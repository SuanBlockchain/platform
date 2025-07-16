import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Card from "../../../../common/Card";
import { useProjectData } from "context/ProjectDataContext";
import { getPolygonByCadastralNumber } from "services/getPolygonByCadastralNumber";
import { getPredialDataByCadastralNumber } from "services/getPredialDataByCadastralNumber";
import { getPredialData2ByCadastralNumber } from "services/getPredialData2ByCadastralNumber";
import { Spinner } from "react-bootstrap";
import useFetchPropertiesProject from "hooks/useFetchPropertiesProject";

export default function GeodataInfoCard(props) {
  const { autorizedUser, setProgressChange, tooltip, setLatLngCentroid } =
    props;
  const { projectData } = useProjectData();
  const { properties } = useFetchPropertiesProject();
  const [loading, setLoading] = useState(false);
  const [ubicacionPfId, setUbicacionPfId] = useState(null);
  const [polygonsFetchedData, setPolygonsFetchedData] = useState(null);
  const [mapKey, setMapKey] = useState(0); // Key to force map reload
  const [formData, setFormData] = useState({
    coords: {
      lat: 0,
      lng: 0,
    },
  });

  const [geoData, setGeoData] = useState({
    coords: {
      lat: 4.73,
      lng: -74.03,
    },
    zoom: 6,
    layers: [],
    loaded: false,
  });

  useEffect(() => {
    async function updatePredialData() {
      if (!properties) {
        return;
      }
      setLoading(true);
      
      const cadastralNumbers = properties.map((property) => {
        const cadastralData =
          property.propertyFeatures.items.find(
            (item) => item.featureID === "A_predio_ficha_catastral"
          )?.value || "[]";
        try {
          const parsed = JSON.parse(cadastralData);
          console.log("parsed", parsed);
          if (Array.isArray(parsed)) {
            return parsed.map((obj) => obj.cadastralNumber);
          }
          return [];
        } catch {
          return [];
        }
      }).flat();

      let polygonGeoJson = await getPolygonByCadastralNumber(cadastralNumbers);
      const predialData = await getPredialDataByCadastralNumber(
        cadastralNumbers
      );
      const predialData2 = await getPredialData2ByCadastralNumber(
        cadastralNumbers
      );

      if (polygonGeoJson) {
        polygonGeoJson.features = polygonGeoJson.features.map(
          (feature, index) => {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                ...predialData[feature.properties.CODIGO],
                ...predialData2[feature.properties.CODIGO],
              },
            };
          }
        );
      }
      setPolygonsFetchedData(polygonGeoJson);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    updatePredialData();
  }, [projectData.projectCadastralRecords.cadastralRecords, properties]);

  useEffect(() => {
    if (projectData && projectData.projectGeoData && projectData.projectInfo) {
      const pfID =
        projectData.projectFeatures.filter((item) => {
          return item.featureID === "C_ubicacion";
        })[0]?.id || null;
      setUbicacionPfId(pfID);

      if (projectData?.projectInfo?.location.coords.lat !== "") {
        setGeoData((prevState) => ({
          ...prevState,
          coords: {
            lat: projectData?.projectInfo?.location.coords.lat,
            lng: projectData?.projectInfo?.location.coords.lng,
          },
          layers: projectData.projectGeoData,
          zoom: 12,
          loaded: true,
        }));
        setFormData((prevState) => ({
          ...prevState,
          coords: {
            lat: projectData?.projectInfo?.location.coords.lat,
            lng: projectData?.projectInfo?.location.coords.lng,
          },
        }));
      } else {
        setGeoData((prevState) => ({
          ...prevState,
          loaded: true,
        }));
      }
    }
  }, [projectData]);

  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1);
  }, [polygonsFetchedData]);

  const LoadingOverlay = () => (
    <div className="absolute h-full w-full flex items-center justify-center bg-black bg-opacity-50 z-10">
      <Spinner variant="light" />
    </div>
  );

  return (
    <Card>
      <Card.Header title="Ubicación Geográfica" sep={true} tooltip={tooltip} />
      <div style={{ height: "570px", width: "100%", position: "relative" }}>
        {loading && <LoadingOverlay />}
        <div style={{ height: "570px", width: "100%" }}>
          {polygonsFetchedData && (
            <>
              <GoogleMapReact
                key={mapKey} // Key to force reload
                bootstrapURLKeys={{
                  key: process.env["REACT_APP_GMAPS_API_KEY"] || "",
                }}
                defaultCenter={geoData.coords}
                defaultZoom={6}
                onGoogleApiLoaded={({ map, maps }) => {
                  map.setZoom(geoData.zoom);

                  if (polygonsFetchedData.features.length > 0) {
                    map.data.addGeoJson(polygonsFetchedData);

                    let bounds = new maps.LatLngBounds();

                    map.data.addListener("click", (event) => {
                      const titulo = event.feature.getProperty("DIRECCION");
                      const codigo = event.feature.getProperty("CODIGO");
                      const departamento = event.feature.getProperty(
                        "NOMBRE_DEPARTAMENTO"
                      );
                      const municipio =
                        event.feature.getProperty("NOMBRE_MUNICIPIO");
                      const destinoEconomico = event.feature.getProperty(
                        "NOMBRE_DESTINOECONOMICO"
                      );
                      const descripcionDestinoEconomico =
                        event.feature.getProperty(
                          "DESCRIPCION_DESTINOECONOMICO"
                        );
                      const areaTerreno =
                        event.feature.getProperty("AREA_TERRENO");
                      const areaConstruida =
                        event.feature.getProperty("AREA_CONSTRUIDA");
                      const contentString = `
                          <div class='infoWindowContainer'>
                            <p>${titulo}</p>
                            <p class='mb-0'>Identificador catastral: ${codigo}</p>
                            <p class='mb-0'>Departamento: ${departamento}</p>
                            <p class='mb-0'>Municipio: ${municipio}</p>
                            <p class='mb-0'>Destino económico: ${destinoEconomico} (${descripcionDestinoEconomico})</p>
                            <p class='mb-0'>Área de terreno: ${parseFloat(
                              areaTerreno
                            ).toLocaleString("es-ES")} m2</p>
                            <p class='mb-0'>Área construida: ${parseFloat(
                              areaConstruida
                            ).toLocaleString("es-ES")} m2</p>
                          </div>
                        `;

                      let infoWindow = new maps.InfoWindow({
                        content: contentString,
                        ariaLabel: codigo,
                      });
                      infoWindow.setPosition(event.latLng);
                      infoWindow.open(map, event.latLng);
                    });

                    map.data.forEach(function (feature) {
                      var geo = feature.getGeometry();
                      geo.forEachLatLng(function (LatLng) {
                        bounds.extend(LatLng);
                      });
                    });

                    map.fitBounds(bounds);
                    var center = bounds.getCenter();
                    setLatLngCentroid(
                      `${center.lat() + " " + center.lng()} 0 0`
                    );
                  }
                }}
                yesIWantToUseGoogleMapApiInternals
              ></GoogleMapReact>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
