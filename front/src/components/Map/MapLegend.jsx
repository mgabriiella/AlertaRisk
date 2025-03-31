// src/components/Map/MapLegend.jsx
import React from 'react';

const MapLegend = () => {
  return (
    <div className="legend">
      <h4>LEGENDA</h4>
      <ul>
        <li>
          <span className="legend-dot severe"></span> Chuva Forte (&gt; 7.6 mm/h)
        </li>
        <li>
          <span className="legend-dot moderate"></span> Chuva Moderada (2.5 - 7.6 mm/h)
        </li>
        <li>
          <span className="legend-dot light"></span> Chuva Fraca (&lt; 2.5 mm/h)
        </li>
      </ul>
    </div>
  );
};

export default MapLegend;