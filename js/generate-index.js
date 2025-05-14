const fs = require('fs');
const path = require('path');

const materialsDir = path.join(__dirname, '..', 'materials');
const outputFile = path.join(__dirname, '..', 'data', 'materials-index.json');

const files = fs.readdirSync(materialsDir).filter((file) => file.endsWith('.json'));

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));

console.log('✅ materials-index.json сгенерирован');
