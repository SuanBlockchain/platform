  import React, { useState, useEffect } from "react";
  import PropertyChat from "components/Legal/PropertyChat";
  import { FaCheckCircle, FaRegCheckCircle, FaRegClock, FaFilePdf, FaEye, FaEdit } from "react-icons/fa";
  import { API, graphqlOperation } from "aws-amplify";
  import { createPropertyFeature, updatePropertyFeature } from "graphql/mutations";
  import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  import { useS3Client } from "context/s3ClientContext";
import { listPropertyFeatures } from "graphql/queries";
import { usePropertyData } from "context/PropertyDataContext";
import PropertyChatHistory from "./PropertyChatHistory";
import { useAuth } from "context/AuthContext";

  const STEPS = [
    "Visita técnica",
    "Memorando de Entendimiento",
    "Monitoreos permanentes",
    "Revisión al término del Memorando",
    "Subir toda la información como validación inicial",
  ];

  export default function ConstructorWorkflow({ propertyId }) {
    const [completed, setCompleted] = useState(Array(STEPS.length).fill(false));
    const [memoFile, setMemoFile] = useState(null);
    const { s3Client, bucketName } = useS3Client();
    const [featureValue, setFeatureValue] = useState({
      analisis: false,
      memorando: { uploadDate: null, url: "" },
      monitoreos: false,
      revision_memorando: false,
      validacion_inicial: false,
    });
    const [featureRecordId, setFeatureRecordId] = useState(null); // el ID real del propertyFeature creado  
    const completedCount = completed.filter(Boolean).length;
    const progress = Math.round((completedCount / STEPS.length) * 100);
    const { propertyData } = usePropertyData();
    const basePath = `public/property/${propertyData.propertyInfo?.id}/other/`
    const [showHistory, setShowHistory] = useState(false);
    const { user } = useAuth(); // O ajusta según tu estructura
    const isConstructor = user?.role === "validator";

  
    useEffect(() => {
      const fetchFeature = async () => {
        console.log("📦 Ejecutando fetchFeature para propertyId:", propertyId);
    
        try {
          const response = await API.graphql(
            graphqlOperation(listPropertyFeatures, {
              filter: {
                propertyID: { eq: propertyId },
                featureID: { eq: "GLOBAL_PROPERTY_STATUS" },
              },
            })
          );
    
          console.log("🔍 Respuesta de listPropertyFeatures:", response);
    
          const features = response.data.listPropertyFeatures.items;
          console.log("📄 Features encontrados:", features);
    
          if (features.length > 0) {
            const feature = features[0];
            console.log("✅ Usando feature:", feature);
    
            const parsedValue = JSON.parse(feature.value);
            console.log("🧩 Valor parseado:", parsedValue);
    
            setFeatureRecordId(feature.id);
            setFeatureValue(parsedValue);
    
            const newCompleted = [
              parsedValue.analisis || false,
              !!parsedValue.memorando?.uploadDate,
              parsedValue.monitoreos || false,
              parsedValue.revision_memorando || false,
              parsedValue.validacion_inicial || false,
            ];
            console.log("📊 Estados de pasos completados:", newCompleted);
    
            setCompleted(newCompleted);
    
            if (parsedValue.memorando?.url) {
              setMemoFile({ name: "Archivo existente (ver S3)", url: parsedValue.memorando.url });
              console.log("📎 MemoFile detectado y seteado.");
            }
          
// Si no hay expirationDateTime, usar fallback con expirationDays
else if (parsedValue.memorando?.uploadDate && parsedValue.memorando?.expirationDays) {
  const uploadDate = new Date(parsedValue.memorando.uploadDate);
  uploadDate.setDate(uploadDate.getDate() + parsedValue.memorando.expirationDays);
  console.log("📆 Fecha de expiración calculada desde días:", uploadDate);
}

          } else {
            console.log("ℹ️ No se encontraron features para este property.");
          }
        } catch (error) {
          console.error("❌ Error al obtener propertyFeature por list:", error);
        }
      };
    
      fetchFeature();
    }, [propertyId]);
    
    

    const getFeatureKeyByStep = (index) => {
      switch (index) {
        case 0: return 'analisis';
        case 1: return 'memorando';
        case 2: return 'monitoreos';
        case 3: return 'revision_memorando';
        case 4: return 'validacion_inicial';
        default: return null;
      }
    };
    

    const toggleStep = async (index) => {
      setCompleted(prev => {
        const next = [...prev];
        next[index] = !next[index];
    
        const stepKey = getFeatureKeyByStep(index);
        if (!stepKey) return next;
    
        const updatedValue = { ...featureValue };
    
        // Solo marcar/desmarcar booleanos (memorando se actualiza en otro paso)
        if (stepKey !== 'memorando') {
          updatedValue[stepKey] = next[index];
          setFeatureValue(updatedValue);
    
          if (index === 0 && next[0] && !featureRecordId) {
            createFeatureOnStep1(updatedValue);
          } else {
            updateFeature(updatedValue);
          }
        }
    
        return next;
      });
    };
    
    

    const isStepDisabled = (index) => {
      if (index === 0) return false;
      if (index === 1 && !completed[0]) return true;
      if (index >= 2 && (!completed[index - 1] || !memoFile)) return true;
      return false;
    };

    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      if (!file || !propertyData?.propertyInfo?.id) return;
    
      const fileKey = `${basePath}${file.name}`;
    
      try {
        // 1. Subir el archivo al bucket S3
        const uploadCommand = new PutObjectCommand({
          Bucket: bucketName,
          Key: fileKey,
          Body: file,
          ContentType: file.type,
        });
    
        await s3Client.send(uploadCommand);
    
        // 2. Obtener URL firmada para visualización
        const signedUrl = await getS3FileUrl(fileKey);
    
        // 3. Guardar en estado y backend
        const updated = {
          ...featureValue,
          memorando: {
            uploadDate: Date.now(),
            url: signedUrl,
          },
        };
    
        setMemoFile(file);
        setFeatureValue(updated);
        updateFeature(updated);
        toggleStep(1); // marca como completado
      } catch (error) {
        console.error("❌ Error al subir archivo o generar URL:", error);
      }
    };      

      const getS3FileUrl = async (fileKey) => {
        try {
          const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
          });
      
          const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600, // URL válida por 1 hora
          });
          return signedUrl;
        } catch (error) {
          console.error("❌ Error al generar Signed URL:", error);
          return null;
        }
      };

    const createFeatureOnStep1 = async (newValue) => {
      try {
        const input = {
          featureID: "GLOBAL_PROPERTY_STATUS",
          propertyID: propertyId,
          value: JSON.stringify(newValue),
        };
    
        const response = await API.graphql(
          graphqlOperation(createPropertyFeature, { input })
        );
    
        const createdId = response.data.createPropertyFeature.id;
        setFeatureRecordId(createdId);
        console.log("PropertyFeature creado:", createdId);
      } catch (error) {
        console.error("Error al crear PropertyFeature:", error);
      }
    };

    const updateFeature = async (newValue) => {
      if (!featureRecordId) return;
    
      try {
        const input = {
          id: featureRecordId,
          value: JSON.stringify(newValue),
        };
    
        await API.graphql(graphqlOperation(updatePropertyFeature, { input }));
        console.log("PropertyFeature actualizado:", input);
      } catch (error) {
        console.error("Error actualizando el feature:", error);
      }
    };
    

    return (
      <div className="flex h-full bg-gray-100">
        {/* Left Panel */}
        <div className="w-3/5 p-8 bg-white rounded-l-lg shadow-lg overflow-y-auto relative">
          <div className="absolute top-4 right-4">
            <svg className="w-16 h-16" viewBox="0 0 36 36">
              <path className="text-gray-200" strokeWidth="3" fill="none" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831" />
              <path className="text-green-500" strokeWidth="3" strokeLinecap="round" fill="none"
                strokeDasharray={`${progress},100`} d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831" />
              <text x="18" y="20" className="text-sm font-semibold fill-current text-green-600" textAnchor="middle">{progress}%</text>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-6">Pasos del Consultor</h3>
          <ul className="space-y-4">
            {STEPS.map((step, i) => (
              <li key={i} className={`flex items-center justify-between p-4 rounded-lg ${completed[i] ? 'bg-green-50' : 'bg-gray-50'} ${isStepDisabled(i) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}>              
                <div className="flex items-center space-x-4">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${completed[i] ? 'bg-green-500 text-white' : 'border-gray-300 text-gray-400'}`}>{completed[i] ? <FaCheckCircle /> : i + 1}</span>
                  <p className={`${completed[i] ? 'line-through text-gray-400' : 'text-gray-800'} font-medium`}>{step}</p>
                </div>
                <button
  disabled={isStepDisabled(i) || !isConstructor}
  onClick={() => isConstructor && toggleStep(i)}
  className={`focus:outline-none ${!isConstructor ? 'cursor-not-allowed opacity-60' : ''}`}
>

                  {completed[i] ? <FaCheckCircle className="text-green-600 text-xl" /> : <FaRegCheckCircle className="text-gray-300 hover:text-green-500 text-xl" />}
                </button>
                {i === 1 && (
  <div className="flex items-center space-x-4 ml-6">
    {memoFile && featureValue.memorando.url ? (
      <div className="flex items-center gap-3">
        <a
          href={featureValue.memorando.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-green-600 hover:text-green-800 text-sm"
          title="Ver documento"
        >
          <FaEye className="mr-1" size={20} />
        </a>

        {isConstructor && (
          <label className="flex items-center text-blue-600 hover:underline cursor-pointer text-sm" title="Reemplazar archivo">
            <FaEdit className="mr-1" size={20} />
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" disabled={!isConstructor} />
          </label>
        )}
      </div>
    ) : (
      isConstructor && (
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <FaFilePdf className="text-red-500" />
          <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" disabled={!isConstructor} />
          <span className="text-blue-600 hover:underline">Subir PDF</span>
        </label>
      )
    )}
  </div>
)}

          </li>
        ))}
      </ul>
    </div>

    {/* Divider */}
    <div className="w-px bg-gray-300" />

        {/* Right Panel */}
        <div className="w-2/5 p-8 bg-white rounded-r-lg shadow-inner flex flex-col">
         <div className="flex items-center justify-between mb-4">
  <h3 className="text-2xl font-bold">Mensajería del Predio</h3>
  <button
    onClick={() => setShowHistory(true)}
    className="text-sm text-blue-600 hover:underline"
  >
    Ver historial
  </button>
</div>

          <div className="flex-1 overflow-auto border rounded p-4 bg-gray-50">
            <PropertyChat propertyId={propertyId} featureChat="GLOBAL_PROPERTY_CHAT" />
          </div>
        </div>
      {showHistory && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white rounded-xl p-5 w-full max-w-lg shadow-2xl max-h-[85vh] overflow-y-auto relative">
      <button
        onClick={() => setShowHistory(false)}
        className="absolute top-3 right-3 w-8 h-8 bg-[#72722c] text-white rounded-full hover:bg-[#5c5c22] flex items-center justify-center"
        title="Cerrar"
      >
        ×
      </button>

      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        Historial de Mensajería
      </h2>

      <PropertyChatHistory
        propertyId={propertyId}
        featureChat="GLOBAL_PROPERTY_FILES"
      />
    </div>
  </div>
)}


      </div>
    );
  }
