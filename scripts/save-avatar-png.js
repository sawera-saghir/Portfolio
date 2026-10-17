const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'avatar-dataurl.json');
let content = fs.readFileSync(jsonPath, 'utf8');

// The file contains either raw dataURL or JSON string
let dataUrl = content;
try {
  const parsed = JSON.parse(content);
  if (typeof parsed === 'string') {
    dataUrl = parsed;
  }
} catch (e) {
  // raw string
}

const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
const buffer = Buffer.from(base64Data, 'base64');

const target1 = path.join(__dirname, '..', 'public', 'assets', 'images', 'sawera-fullbody-avatar.png');
const target2 = path.join(__dirname, '..', 'assets', 'images', 'sawera-fullbody-avatar.png');

fs.writeFileSync(target1, buffer);
console.log('Saved to', target1, buffer.length, 'bytes');

if (fs.existsSync(path.dirname(target2))) {
  fs.writeFileSync(target2, buffer);
  console.log('Saved to', target2, buffer.length, 'bytes');
}

// Clean up temp json file
if (fs.existsSync(jsonPath)) {
  fs.unlinkSync(jsonPath);
  console.log('Cleaned up avatar-dataurl.json');
}
