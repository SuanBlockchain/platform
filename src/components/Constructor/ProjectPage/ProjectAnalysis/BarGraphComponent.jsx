import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "react-bootstrap-icons";
// Registrar componentes de ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Colores para los gráficos
const colors = ["#666de9", "#cc674e", "#6bd089", "#f39c12", "#e74c3c"];

export default function BarGraphComponent({ infoBarGraph,toggleShowResults , setSelectedData   }) {
  const navigate = useNavigate();
  if (!infoBarGraph || !infoBarGraph.resultados) {
    console.error("Error: infoBarGraph no está definido o tiene una estructura inesperada.");
    return null;
  }

 

  const resultadosParsed = JSON.parse(infoBarGraph.resultados);
  

  console.log("resultado", resultadosParsed)
  // Configuración común de opciones de gráfico
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false, // Esto permite que los gráficos sean más responsivos en cuanto a tamaño
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "", font: { size: 18 } }
    }
  };

  // Preparación de datos para el gráfico NDVI
  const prepareNDVIData = () => {
    const { Anterior, Posterior } = resultadosParsed['Clasificación NDVI'];
    const categories = Object.keys(Anterior);
    return {
      labels: categories,
      datasets: [
        {
          label: 'Antes',
          data: categories.map(cat => Anterior[cat]),
          backgroundColor: colors[0]
        },
        {
          label: 'Después',
          data: categories.map(cat => Posterior[cat]),
          backgroundColor: colors[1]
        }
      ]
    };
  };

  // Preparación de datos para el histograma NDVI
  const prepareHistogramData = () => {
    const { "NDVI Anterior (Promedio)": prevAvg, "NDVI Posterior (Promedio)": postAvg } = resultadosParsed['Histograma Comparativo del NDVI'];
    return {
      labels: ["NDVI Anterior", "NDVI Posterior"],
      datasets: [
        {
          label: 'NDVI Promedio',
          data: [prevAvg, postAvg],
          backgroundColor: [colors[2], colors[3]]
        }
      ]
    };
  };

  // Configuración del gráfico de líneas para el mapa de cambio en coberturas
  const prepareMapChangeData = () => {
    const data = resultadosParsed['Mapa de Cambio en Coberturas']['Cambio de vegetación'];
    const categories = Object.keys(data);
    return {
      labels: categories,
      datasets: [
        {
          label: 'Cambio de vegetación (ha)',
          data: categories.map(cat => data[cat]),
          borderColor: colors[4],
          backgroundColor: colors[4],
          fill: false,
          tension: 0.4
        }
      ]
    };
  };

  const prepareBiomasaCO2Data = () => {
    const { NDVI } = resultadosParsed;
    const categories = ["Biomasa por Ha", "Biomasa total", "CO2 Equivalente", "Carbono Aéreo"];
    return {
      labels: categories,
      datasets: [
        {
          label: 'Antes',
          data: [
            NDVI.Anterior["Biomasa por Ha (Ton/Ha)"],
            NDVI.Anterior["Biomasa total (Ton)"],
            NDVI.Anterior["CO2 Equivalente (Ton)"],
            NDVI.Anterior["Carbono Aéreo (Ton)"]
          ],
          backgroundColor: colors[0],
          borderColor: colors[0]
        },
        {
          label: 'Después',
          data: [
            NDVI.Posterior["Biomasa por Ha (Ton/Ha)"],
            NDVI.Posterior["Biomasa total (Ton)"],
            NDVI.Posterior["CO2 Equivalente (Ton)"],
            NDVI.Posterior["Carbono Aéreo (Ton)"]
          ],
          backgroundColor: colors[1],
          borderColor: colors[1]
        }
      ]
    };
  };

  const handleBack = () => {
    console.log("Botón 'Volver' presionado, ejecutando toggleShowResults");
    toggleShowResults();
    setSelectedData(null);
  };
  

  
  return (
    <div style={{ width: '100%', height: 'auto', padding: '20px' }}>
      <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center' }}>
        <ArrowLeft style={{ marginRight: '8px' }} /> Volver
      </button>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Análisis de Biomasa</h1>
      <div style={{
        backgroundColor: '#f7f7f7',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Datos de Entrada</h2>
        <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <p><strong>Nombre imagen anterior:</strong> {resultadosParsed.imgAnteriorNombreImg || "No disponible"}</p>
          <p><strong>Nombre imagen posterior:</strong> {resultadosParsed.imgPosteriorNombreImg || "No disponible"}</p>
          <p><strong>Correcciones:</strong> {resultadosParsed.correcciones?.join(', ') || "Ninguna"}</p>
          <p><strong>Banda NIR:</strong> {resultadosParsed.BandaNIR || "No especificado"}</p>
          <p><strong>Posición banda NIR:</strong> {resultadosParsed.PosiciónBandaNIR || "No especificado"}</p>
          <p><strong>Banda RED:</strong> {resultadosParsed.BandaRED || "No especificado"}</p>
          <p><strong>Posición banda RED:</strong> {resultadosParsed.PosiciónBandaRED || "No especificado"}</p>
          <p><strong>Resolución imagen anterior:</strong> {resultadosParsed.resoluciónImagenAnterior || "No especificado"}</p>
          <p><strong>Resolución imagen posterior:</strong> {resultadosParsed.resoluciónImagenPosterior || "No especificado"}</p>
        </div>
      </div>
      <div style={{ height: '300px' }}>
        <Bar options={{ ...commonOptions, title: { text: 'Clasificación NDVI' } }} data={prepareNDVIData()} />
      </div>
      <div style={{ height: '300px' }}>
        <Bar options={{ ...commonOptions, title: { text: 'Histograma Comparativo del NDVI' } }} data={prepareHistogramData()} />
      </div>
      <div style={{ height: '300px' }}>
        <Line options={{ ...commonOptions, title: { text: 'Mapa de Cambio en Coberturas' } }} data={prepareMapChangeData()} />
      </div>
      <div style={{ height: '300px' }}>
      <Bar options={{ ...commonOptions, title: { text: 'NDVI - Biomasa y CO2 (Antes vs Después)' } }} data={prepareBiomasaCO2Data()} />
    </div>
    </div>
  );
}