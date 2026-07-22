import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const projectsFilePath = path.join(rootDir, 'public', 'data', 'projects.json');
const imgsDir = path.join(rootDir, 'public', 'imgs');

if (!fs.existsSync(imgsDir)) {
  fs.mkdirSync(imgsDir, { recursive: true });
}

function generateSvgBanner(projectName, category, keywords) {
  const bgColors = {
    Windows: ['#1e293b', '#0f172a'],
    Web: ['#18181b', '#09090b'],
    Android: ['#14532d', '#052e16'],
    Others: ['#3b0764', '#1e1b4b']
  };

  const colors = bgColors[category] || ['#18181b', '#09090b'];
  const tagsStr = (keywords || []).slice(0, 4).map(k => `#${k}`).join('   ');

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors[0]}" />
      <stop offset="100%" stop-color="${colors[1]}" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#818cf8" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="blur" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Subtle Ambient Glow -->
  <circle cx="200" cy="150" r="250" fill="#38bdf8" opacity="0.1" filter="url(#glow)" />
  <circle cx="1000" cy="500" r="300" fill="#818cf8" opacity="0.1" filter="url(#glow)" />

  <!-- Card Border Container -->
  <rect x="60" y="60" width="1080" height="510" rx="24" fill="#ffffff" fill-opacity="0.03" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2" />

  <!-- Category Badge -->
  <rect x="110" y="110" width="${category.length * 14 + 40}" height="40" rx="20" fill="url(#accentGrad)" />
  <text x="${130}" y="136" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#ffffff" letter-spacing="1.5">${category.toUpperCase()}</text>

  <!-- Project Title -->
  <text x="110" y="270" font-family="system-ui, sans-serif" font-size="52" font-weight="800" fill="#ffffff">${escapeXml(projectName)}</text>

  <!-- Divider Line -->
  <line x1="110" y1="330" x2="300" y2="330" stroke="url(#accentGrad)" stroke-width="4" stroke-linecap="round" />

  <!-- Keywords / Tags -->
  <text x="110" y="420" font-family="system-ui, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">${escapeXml(tagsStr)}</text>

  <!-- Footer Watermark -->
  <text x="1050" y="520" text-anchor="end" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#64748b">sayed.app</text>
</svg>`;
}

function escapeXml(unsafe) {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function main() {
  console.log('Generating custom project images...');
  const data = fs.readFileSync(projectsFilePath, 'utf8');
  const projects = JSON.parse(data);

  let updatedCount = 0;

  for (const project of projects) {
    const slug = project.slug;
    const svgFileName = `${slug}.svg`;
    const svgFilePath = path.join(imgsDir, svgFileName);
    const pngFileName = `${slug}.png`;
    const pngFilePath = path.join(imgsDir, pngFileName);

    const hasPng = fs.existsSync(pngFilePath);
    const hasSvg = fs.existsSync(svgFilePath);

    // If image field is missing or points to a non-existent local image
    let currentImageExists = project.image && fs.existsSync(path.join(rootDir, 'public', project.image.replace(/^\//, '')));

    if (!currentImageExists) {
      // Generate SVG banner
      const svgContent = generateSvgBanner(project.name, project.category, project.keywords);
      fs.writeFileSync(svgFilePath, svgContent, 'utf8');

      // Update project record to point to generated image
      project.image = `/imgs/${svgFileName}`;
      if (!project.gallery || project.gallery.length === 0) {
        project.gallery = [`/imgs/${svgFileName}`];
      }
      updatedCount++;
      console.log(`[Generated] Image for "${project.name}" -> /imgs/${svgFileName}`);
    }
  }

  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf8');
  console.log(`Complete! Processed ${projects.length} projects (${updatedCount} generated).`);
}

main().catch(err => {
  console.error('Error generating images:', err);
  process.exit(1);
});
