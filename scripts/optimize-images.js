const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targets = {
  png: [
    'public/logo/logo.png',
    'public/logo/prambanan_logo3.png',
    'public/client/ivolks.png',
    'public/client/resizepertamina.png',
    'public/client/bplj.png',
    'public/client/uin.png',
    'public/client/ptipd.png',
    'public/client/hamim.png',
    'public/client/resizemaqdis.png'
  ],
  webp: [
    'public/about/about.webp',
    'public/form/background.webp',
    'public/hero/background.webp'
  ]
};

async function optimize() {
  let totalOriginal = 0;
  let totalOptimized = 0;

  console.log('Starting asset optimization...\n');

  // Process PNGs
  for (const file of targets.png) {
    const fullPath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${file}`);
      continue;
    }

    const origStats = fs.statSync(fullPath);
    totalOriginal += origStats.size;

    const tempPath = `${fullPath}.temp`;
    try {
      await sharp(fullPath)
        .png({ quality: 80, palette: true, compressionLevel: 9 })
        .toFile(tempPath);

      const optStats = fs.statSync(tempPath);

      if (optStats.size < origStats.size) {
        // Replace original
        fs.renameSync(tempPath, fullPath);
        totalOptimized += optStats.size;
        const diff = origStats.size - optStats.size;
        const pct = ((diff / origStats.size) * 100).toFixed(1);
        console.log(`Optimized PNG: ${file} | ${(origStats.size / 1024).toFixed(1)}KB -> ${(optStats.size / 1024).toFixed(1)}KB (-${pct}%)`);
      } else {
        // Discard optimized version
        fs.unlinkSync(tempPath);
        totalOptimized += origStats.size;
        console.log(`Kept original PNG: ${file} (optimized version was larger or equal: ${(optStats.size / 1024).toFixed(1)}KB vs ${(origStats.size / 1024).toFixed(1)}KB)`);
      }
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      totalOptimized += origStats.size;
    }
  }

  // Process WebPs
  for (const file of targets.webp) {
    const fullPath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${file}`);
      continue;
    }

    const origStats = fs.statSync(fullPath);
    totalOriginal += origStats.size;

    const tempPath = `${fullPath}.temp`;
    try {
      await sharp(fullPath)
        .webp({ quality: 75, effort: 6 })
        .toFile(tempPath);

      const optStats = fs.statSync(tempPath);

      if (optStats.size < origStats.size) {
        // Replace original
        fs.renameSync(tempPath, fullPath);
        totalOptimized += optStats.size;
        const diff = origStats.size - optStats.size;
        const pct = ((diff / origStats.size) * 100).toFixed(1);
        console.log(`Optimized WebP: ${file} | ${(origStats.size / 1024).toFixed(1)}KB -> ${(optStats.size / 1024).toFixed(1)}KB (-${pct}%)`);
      } else {
        // Discard optimized version
        fs.unlinkSync(tempPath);
        totalOptimized += origStats.size;
        console.log(`Kept original WebP: ${file} (optimized version was larger or equal: ${(optStats.size / 1024).toFixed(1)}KB vs ${(origStats.size / 1024).toFixed(1)}KB)`);
      }
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      totalOptimized += origStats.size;
    }
  }

  const saved = totalOriginal - totalOptimized;
  const totalPct = ((saved / totalOriginal) * 100).toFixed(1);
  console.log(`\nOptimization Complete!`);
  console.log(`Total Original Size: ${(totalOriginal / 1024).toFixed(1)}KB`);
  console.log(`Total Optimized Size: ${(totalOptimized / 1024).toFixed(1)}KB`);
  console.log(`Saved: ${(saved / 1024).toFixed(1)}KB (-${totalPct}%)`);
}

optimize();
