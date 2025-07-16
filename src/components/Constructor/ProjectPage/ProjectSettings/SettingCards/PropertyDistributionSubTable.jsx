import React from 'react';
import { getAreaFromPf } from '../../mappers';

const PropertyDistributionSubTable = ({
  properties,
  ownerTotalTokens,
  onDistributionChange,
  propertyDistribution,
  isEditing,
}) => {
  const handlePercentageChange = (propertyId, newPercentage) => {
    const newDistribution = propertyDistribution.map((dist) => {
      if (dist.propertyId === propertyId) {
        return {
          ...dist,
          percentage: newPercentage,
          tokens: (parseFloat(newPercentage || 0) / 100) * ownerTotalTokens,
        };
      }
      return dist;
    });
    onDistributionChange(newDistribution);
  };

  if (!propertyDistribution) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
        Inicializando...
      </div>
    );
  }

  const totalPercentage = propertyDistribution.reduce((sum, p) => sum + (parseFloat(p.percentage) || 0), 0);

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-semibold mb-2 text-gray-700">Distribución por Predio</h4>
      {isEditing && Math.round(totalPercentage) !== 100 && (
        <p className="text-red-500 text-xs mb-2">La suma de los porcentajes debe ser exactamente 100%.</p>
      )}
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="text-left py-2 font-medium text-gray-600">Predio</th>
            <th className="text-right py-2 font-medium text-gray-600">Área (ha)</th>
            <th className="text-right py-2 font-medium text-gray-600">Porcentaje (%)</th>
            <th className="text-right py-2 font-medium text-gray-600">Tokens Asignados</th>
          </tr>
        </thead>
        <tbody>
          {propertyDistribution.map((propDist) => {
            const originalProperty = properties.find(p => p.id === propDist.propertyId);
            if (!originalProperty) return null;

            return (
              <tr key={propDist.propertyId} className="border-b last:border-none">
                <td className="py-2 text-gray-800">{propDist.name}</td>
                <td className="text-right py-2 text-gray-800">{parseFloat(getAreaFromPf(originalProperty) || 0).toLocaleString('es-ES')}</td>
                <td className="text-right py-2">
                  {isEditing ? (
                    <input
                      type="number"
                      value={propDist.percentage || ''}
                      onChange={(e) => handlePercentageChange(propDist.propertyId, e.target.value)}
                      className="w-20 p-1 border rounded text-right"
                      min="0"
                      max="100"
                    />
                  ) : (
                    <>{propDist.percentage} %</>
                  )}
                </td>
                <td className="text-right py-2 text-gray-800">
                  {propDist.tokens.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyDistributionSubTable; 