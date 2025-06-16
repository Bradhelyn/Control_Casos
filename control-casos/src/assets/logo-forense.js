// Este script genera un logo SVG y lo guarda como archivo
const fs = require('fs');
const path = require('path');

// SVG para el logo de Control de Casos de Auditoría Forense
const svgContent = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Fondo circular -->
  <circle cx="100" cy="100" r="90" fill="#3F51B5" />
  <circle cx="100" cy="100" r="85" fill="#2C3E8C" />
  
  <!-- Lupa -->
  <circle cx="80" cy="80" r="30" stroke="white" stroke-width="8" fill="none" />
  <line x1="100" y1="100" x2="135" y2="135" stroke="white" stroke-width="8" stroke-linecap="round" />
  
  <!-- Texto circular -->
  <path id="circlePath" d="M100,170 a70,70 0 1,1 0.1,0" fill="none" />
  <text fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
    <textPath href="#circlePath" startOffset="20%">AUDITORÍA FORENSE</textPath>
  </text>
  
  <!-- Documento con marcas de verificación -->
  <rect x="60" y="65" width="40" height="50" fill="#E3F2FD" rx="4" />
  <line x1="70" y1="75" x2="90" y2="75" stroke="#1A237E" stroke-width="2" />
  <line x1="70" y1="85" x2="90" y2="85" stroke="#1A237E" stroke-width="2" />
  <line x1="70" y1="95" x2="90" y2="95" stroke="#1A237E" stroke-width="2" />
  <line x1="70" y1="105" x2="90" y2="105" stroke="#1A237E" stroke-width="2" />
</svg>
`;

// Guardar el SVG como archivo
const outputFile = path.join(__dirname, 'logo-forense.svg');
fs.writeFileSync(outputFile, svgContent);

console.log(`Logo SVG creado en: ${outputFile}`);

