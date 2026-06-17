const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'nosotros.html',
  'contacto.html',
  'productos.html',
  'producto-detalle.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace header logo
  const headerRegex = /<img src="assets\/logo-nuevo\.png" alt="Logo" class="logo-img" style="border-radius:50%; object-fit:cover; width:50px; height:50px;" \/>\s*<div class="logo-text-wrap"><span class="logo-top">Momentos<\/span><span class="logo-bottom">con encanto<\/span><\/div>/g;
  content = content.replace(headerRegex, '<img src="assets/logo-nuevo.png" alt="Momentos con encanto" class="logo-img" />');
  
  // Replace footer logo
  const footerRegex = /<div class="logo-text-wrap" style="flex-direction: row; align-items: center; gap: 10px; margin-bottom: var\(--space-4\);">\s*<img src="assets\/logo-nuevo\.png" alt="Logo" class="logo-img" style="border-radius:50%; object-fit:cover; width:40px; height:40px;" \/>\s*<div style="display: flex; flex-direction: column; line-height: 1;">\s*<span class="logo-top" style="font-size: 1\.5rem;">Momentos<\/span>\s*<span class="logo-bottom" style="font-size: 0\.55rem;">con encanto<\/span>\s*<\/div>\s*<\/div>/g;
  content = content.replace(footerRegex, '<img src="assets/logo-nuevo.png" alt="Momentos con encanto" class="logo-img footer-logo" style="margin-bottom: var(--space-4);" />');
  
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Done');
