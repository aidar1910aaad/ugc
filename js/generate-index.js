const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'materials');
const outputPath = path.join(__dirname, '..', 'data', 'materials-index.json');

const files = fs.readdirSync(dir).filter((file) => file.endsWith('.json'));

fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
console.log('✅ materials-index.json обновлён');
