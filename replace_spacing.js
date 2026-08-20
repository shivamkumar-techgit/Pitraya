const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /\bp-3\b/g, replace: 'p-4' },
  { regex: /\bp-5\b/g, replace: 'p-4' },
  { regex: /\bp-7\b/g, replace: 'p-6' },
  { regex: /\bp-9\b/g, replace: 'p-8' },
  { regex: /\bmt-5\b/g, replace: 'mt-6' },
  { regex: /\bgap-5\b/g, replace: 'gap-4' },
  { regex: /\bgap-7\b/g, replace: 'gap-6' },
  { regex: /\brounded-3xl\b/g, replace: 'rounded-2xl' },
  { regex: /\bshadow-2xl\b/g, replace: 'shadow-xl' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replace } of replacements) {
        content = content.replace(regex, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src', 'components'));
console.log('Done.');
