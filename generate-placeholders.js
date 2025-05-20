const fs = require('fs');
const path = require('path');

// Load the image sets data
const imageSetsData = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'keyboard-explorer/assets/image-sets.json'),
  'utf8'
));

// Function to create an SVG placeholder for a specific item
function createSvgPlaceholder(letter, name, category) {
  const colors = {
    animals: '#4dabf7',
    vehicles: '#51cf66',
    instruments: '#cc5de8'
  };
  
  const backgroundColor = colors[category] || '#f8f9fa';
  
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${backgroundColor}" rx="20" ry="20"/>
  <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">
    ${letter}
  </text>
  <text x="50%" y="70%" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" dominant-baseline="middle" fill="white">
    ${name}
  </text>
</svg>`;
}

// Generate placeholders for each category and letter
Object.keys(imageSetsData).forEach(category => {
  const items = imageSetsData[category].items;
  
  Object.keys(items).forEach(letter => {
    const item = items[letter];
    const name = item.name;
    const imagePath = item.image;
    
    // Extract directory and filename
    const dir = path.join(__dirname, 'keyboard-explorer/assets/images', path.dirname(imagePath));
    const filename = path.basename(imagePath);
    const svgFilename = filename.replace(/\.[^/.]+$/, '.svg');
    
    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Create SVG content
    const svgContent = createSvgPlaceholder(letter, name, category);
    
    // Write SVG file
    fs.writeFileSync(path.join(dir, svgFilename), svgContent);
    console.log(`Created placeholder for ${category} - ${letter}: ${name}`);
  });
});

console.log('All placeholders generated successfully!');