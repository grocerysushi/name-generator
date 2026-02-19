const fs = require('fs');
try {
    const data = fs.readFileSync('names.json', 'utf8');
    console.log('File length:', data.length);
    console.log('First 100 chars:', data.substring(0, 100));
} catch (err) {
    console.error(err);
}
