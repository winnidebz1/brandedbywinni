const fs = require('fs');
const path = require('path');

const files = [
    'pages/admin/Dashboard.tsx',
    'pages/admin/Leads.tsx',
    'pages/admin/Testimonials.tsx',
    'pages/admin/Projects.tsx',
    'components/admin/ProtectedRoute.tsx'
];

const colorMap = {
    '#644B52': '#4A3B40',
    '#CFA1BC': '#E89BA7',
    '#F7D9C9': '#FAF9F6',
    '#EEE0E8': '#FAF9F6'
};

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        Object.entries(colorMap).forEach(([oldColor, newColor]) => {
            content = content.replace(new RegExp(oldColor, 'g'), newColor);
        });

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
    } catch (err) {
        console.log(`⚠️  Skipped: ${file} - ${err.message}`);
    }
});

console.log('\n🎨 Color update complete!');
