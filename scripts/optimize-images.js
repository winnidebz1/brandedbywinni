/**
 * Automated Image Optimization Script
 * 
 * This script converts all images in the public folder to WebP and AVIF formats
 * while maintaining the original files as fallbacks.
 * 
 * Usage: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
    inputDir: path.join(__dirname, '..', 'public'),
    webpQuality: 80,
    avifQuality: 70,
    jpegQuality: 85,
    pngQuality: 85,
    extensions: ['.jpg', '.jpeg', '.png'],
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
};

async function getAllImages(dir) {
    const images = [];

    async function traverse(currentDir) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                await traverse(fullPath);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                if (CONFIG.extensions.includes(ext)) {
                    images.push(fullPath);
                }
            }
        }
    }

    await traverse(dir);
    return images;
}

async function getImageSize(filePath) {
    const stats = await fs.stat(filePath);
    return (stats.size / 1024).toFixed(2); // Size in KB
}

async function optimizeImage(imagePath) {
    const dir = path.dirname(imagePath);
    const ext = path.extname(imagePath);
    const basename = path.basename(imagePath, ext);

    // Skip if already optimized (has -optimized suffix)
    if (basename.endsWith('-optimized')) {
        return null;
    }

    const originalSize = await getImageSize(imagePath);

    console.log(`${colors.blue}Processing:${colors.reset} ${path.relative(CONFIG.inputDir, imagePath)}`);

    const results = {
        original: imagePath,
        originalSize: parseFloat(originalSize),
    };

    try {
        // Load image
        const image = sharp(imagePath);
        const metadata = await image.metadata();

        // Generate WebP
        const webpPath = path.join(dir, `${basename}.webp`);
        await image
            .clone()
            .webp({ quality: CONFIG.webpQuality })
            .toFile(webpPath);
        const webpSize = await getImageSize(webpPath);
        results.webp = { path: webpPath, size: parseFloat(webpSize) };
        console.log(`  ${colors.green}✓${colors.reset} WebP: ${webpSize} KB (${((1 - parseFloat(webpSize) / parseFloat(originalSize)) * 100).toFixed(1)}% smaller)`);

        // Generate AVIF
        const avifPath = path.join(dir, `${basename}.avif`);
        await image
            .clone()
            .avif({ quality: CONFIG.avifQuality })
            .toFile(avifPath);
        const avifSize = await getImageSize(avifPath);
        results.avif = { path: avifPath, size: parseFloat(avifSize) };
        console.log(`  ${colors.green}✓${colors.reset} AVIF: ${avifSize} KB (${((1 - parseFloat(avifSize) / parseFloat(originalSize)) * 100).toFixed(1)}% smaller)`);

        // Optimize original (create -optimized version)
        const optimizedPath = path.join(dir, `${basename}-optimized${ext}`);
        if (ext.toLowerCase() === '.png' || ext.toLowerCase() === '.PNG') {
            await image
                .clone()
                .png({ quality: CONFIG.pngQuality, compressionLevel: 9 })
                .toFile(optimizedPath);
        } else {
            await image
                .clone()
                .jpeg({ quality: CONFIG.jpegQuality, progressive: true })
                .toFile(optimizedPath);
        }
        const optimizedSize = await getImageSize(optimizedPath);
        results.optimized = { path: optimizedPath, size: parseFloat(optimizedSize) };
        console.log(`  ${colors.green}✓${colors.reset} Optimized ${ext.toUpperCase().slice(1)}: ${optimizedSize} KB (${((1 - parseFloat(optimizedSize) / parseFloat(originalSize)) * 100).toFixed(1)}% smaller)`);

        console.log('');

        return results;
    } catch (error) {
        console.error(`  ${colors.red}✗${colors.reset} Error processing ${imagePath}: ${error.message}`);
        return null;
    }
}

async function main() {
    console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}   Image Optimization Script${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}\n`);

    console.log(`Searching for images in: ${CONFIG.inputDir}\n`);

    const images = await getAllImages(CONFIG.inputDir);

    if (images.length === 0) {
        console.log(`${colors.yellow}No images found.${colors.reset}`);
        return;
    }

    console.log(`Found ${images.length} image${images.length !== 1 ? 's' : ''} to optimize.\n`);

    const results = [];
    for (const imagePath of images) {
        const result = await optimizeImage(imagePath);
        if (result) {
            results.push(result);
        }
    }

    // Summary
    console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}   Summary${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}\n`);

    const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalWebpSize = results.reduce((sum, r) => sum + (r.webp?.size || 0), 0);
    const totalAvifSize = results.reduce((sum, r) => sum + (r.avif?.size || 0), 0);
    const totalOptimizedSize = results.reduce((sum, r) => sum + (r.optimized?.size || 0), 0);

    console.log(`✅ Processed ${results.length} images successfully`);
    console.log(`\n📊 Total Original Size: ${totalOriginalSize.toFixed(2)} KB`);
    console.log(`📊 Total WebP Size: ${totalWebpSize.toFixed(2)} KB (${((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1)}% reduction)`);
    console.log(`📊 Total AVIF Size: ${totalAvifSize.toFixed(2)} KB (${((1 - totalAvifSize / totalOriginalSize) * 100).toFixed(1)}% reduction)`);
    console.log(`📊 Total Optimized Size: ${totalOptimizedSize.toFixed(2)} KB (${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}% reduction)`);

    console.log(`\n${colors.green}✓ Optimization complete!${colors.reset}`);
    console.log(`\n${colors.yellow}Next steps:${colors.reset}`);
    console.log(`1. Update image references to use the <picture> element with WebP/AVIF sources`);
    console.log(`2. Add loading="lazy" to all off-screen images`);
    console.log(`3. Test the site to ensure all images display correctly`);
}

main().catch(console.error);
