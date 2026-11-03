/**
 * optimize-images.js — Batch otimização de imagens (Sharp)
 * Bella Napoli — Gera WebP/AVIF + thumbnails + srcset-map.json
 *
 * DEPENDÊNCIAS (package.json mínimo):
 * {
 *   "name": "bella-napoli-img-opt",
 *   "version": "1.0.0",
 *   "type": "module",
 *   "scripts": { "opt": "node optimize-images.js", "opt:watch": "node optimize-images.js --watch" },
 *   "dependencies": { "sharp": "^0.33.0", "fs-extra": "^11.2.0", "chokidar": "^3.6.0" }
 * }
 *
 * USO:
 *   node optimize-images.js           # roda uma vez
 *   node optimize-images.js --watch   # observa pastas (requer chokidar)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import fg from 'fast-glob';
import { colors } from 'ansi-colors';

// ========================================
// CONFIGURAÇÃO
// ========================================
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

const SOURCE_DIRS = [
  { dir: 'assets/pizzas', thumbWidth: 400, thumbHeight: 300, category: 'pizzas' },
  { dir: 'assets/galeria', thumbWidth: 400, thumbHeight: 300, category: 'galeria' },
  { dir: 'assets/hero', thumbWidth: 800, thumbHeight: 450, category: 'hero' }
];

const OUTPUT_QUALITY = {
  webp: 80,
  avif: 50
};

const SUPPORTED_INPUT = ['.png', '.jpg', '.jpeg', '.webp', '.tiff', '.avif'];
const SKIP_OUTPUT = ['.webp', '.avif']; // não reprocessa saídas

const SRCSET_MAP_PATH = path.join(ROOT, 'srcset-map.json');

// ========================================
// UTILITÁRIOS
// ========================================
const log = {
  info: (msg) => console.log(colors.cyan(`[INFO] ${msg}`)),
  ok: (msg) => console.log(colors.green(`[OK]   ${msg}`)),
  warn: (msg) => console.log(colors.yellow(`[WARN] ${msg}`)),
  err: (msg) => console.error(colors.red(`[ERR]  ${msg}`))
};

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getRelPath(absPath) {
  return path.relative(ROOT, absPath).replace(/\\/g, '/');
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

// ========================================
// PROCESSAMENTO DE IMAGEM ÚNICA
// ========================================
async function processImage(inputPath, config) {
  const relInput = getRelPath(inputPath);
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const slug = slugify(baseName);
  const outDir = path.dirname(inputPath);

  const results = {
    original: relInput,
    webp: null,
    avif: null,
    thumb: null,
    widths: []
  };

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const { width: origW, height: origH, format: origFormat } = metadata;

    log.info(`Processando: ${relInput} (${origW}x${origH} ${origFormat})`);

    // 1. WebP 80%
    const webpPath = path.join(outDir, `${slug}.webp`);
    await image
      .clone()
      .webp({ quality: OUTPUT_QUALITY.webp, effort: 6, lossless: false })
      .withMetadata({ exif: false, icc: false, xmp: false })
      .toFile(webpPath);
    results.webp = getRelPath(webpPath);
    log.ok(`  WebP: ${results.webp}`);

    // 2. AVIF 50% (se suportado)
    try {
      const avifPath = path.join(outDir, `${slug}.avif`);
      await image
        .clone()
        .avif({ quality: OUTPUT_QUALITY.avif, effort: 6, lossless: false })
        .withMetadata({ exif: false, icc: false, xmp: false })
        .toFile(avifPath);
      results.avif = getRelPath(avifPath);
      log.ok(`  AVIF: ${results.avif}`);
    } catch (avifErr) {
      log.warn(`  AVIF não suportado/pulou: ${avifErr.message}`);
    }

    // 3. Thumbnail (preserva aspect-ratio, sem upscale)
    const thumbName = `${slug}-thumb.webp`;
    const thumbPath = path.join(outDir, thumbName);
    const { width: tW, height: tH } = await image
      .clone()
      .resize(config.thumbWidth, config.thumbHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 75 })
      .withMetadata({ exif: false, icc: false, xmp: false })
      .toFile(thumbPath);
    results.thumb = getRelPath(thumbPath);
    results.widths = [tW, origW];
    if (origW > config.thumbWidth * 2) results.widths.push(config.thumbWidth * 2);
    log.ok(`  Thumb: ${results.thumb} (${tW}x${tH})`);

    return { slug, ...results };

  } catch (err) {
    log.err(`Falha em ${relInput}: ${err.message}`);
    return null;
  }
}

// ========================================
// BUILD COMPLETO
// ========================================
async function buildAll() {
  const srcsetMap = {};

  for (const config of SOURCE_DIRS) {
    const fullDir = path.join(ROOT, config.dir);
    await ensureDir(fullDir);

    const files = await fg('**/*.{png,jpg,jpeg,webp,tiff,avif}', {
      cwd: fullDir,
      absolute: true,
      ignore: ['**/*-thumb.*', '**/*.webp', '**/*.avif'] // ignora saídas
    });

    if (files.length === 0) {
      log.warn(`Nenhuma imagem fonte em ${config.dir}`);
      continue;
    }

    log.info(`\n=== ${config.dir.toUpperCase()} (${files.length} arquivos) ===`);

    for (const file of files) {
      const result = await processImage(file, config);
      if (result) {
        srcsetMap[result.slug] = {
          category: config.category,
          original: result.original,
          webp: result.webp,
          avif: result.avif,
          thumb: result.thumb,
          widths: [...new Set(result.widths)].sort((a, b) => a - b)
        };
      }
    }
  }

  // Salva srcset-map.json
  await fs.promises.writeFile(SRCSET_MAP_PATH, JSON.stringify(srcsetMap, null, 2), 'utf8');
  log.ok(`\nsrcset-map.json salvo em ${getRelPath(SRCSET_MAP_PATH)} (${Object.keys(srcsetMap).length} entradas)`);
}

// ========================================
// WATCH MODE
// ========================================
async function watchMode() {
  try {
    const chokidar = (await import('chokidar')).default;
    const watchDirs = SOURCE_DIRS.map(c => path.join(ROOT, c.dir));

    log.info(`Observando pastas: ${watchDirs.map(getRelPath).join(', ')}`);

    const watcher = chokidar.watch(watchDirs, {
      ignored: /[-thumb\.|\.webp$|\.avif$]/,
      persistent: true,
      ignoreInitial: true
    });

    watcher.on('add', async (filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      if (!SUPPORTED_INPUT.includes(ext)) return;

      // Identifica config da pasta
      const config = SOURCE_DIRS.find(c => filePath.startsWith(path.join(ROOT, c.dir)));
      if (!config) return;

      log.info(`\n[Novo arquivo detectado] ${getRelPath(filePath)}`);
      const result = await processImage(filePath, config);

      if (result) {
        // Atualiza srcset-map.json incrementalmente
        const currentMap = JSON.parse(await fs.promises.readFile(SRCSET_MAP_PATH, 'utf8').catch(() => '{}'));
        currentMap[result.slug] = {
          category: config.category,
          original: result.original,
          webp: result.webp,
          avif: result.avif,
          thumb: result.thumb,
          widths: [...new Set(result.widths)].sort((a, b) => a - b)
        };
        await fs.promises.writeFile(SRCSET_MAP_PATH, JSON.stringify(currentMap, null, 2), 'utf8');
        log.ok(`srcset-map.json atualizado`);
      }
    });

    watcher.on('error', (err) => log.err(`Watcher error: ${err.message}`));

    // Graceful shutdown
    process.on('SIGINT', async () => {
      log.info('\nEncerrando watcher...');
      await watcher.close();
      process.exit(0);
    });

  } catch (err) {
    log.err(`Watch mode requer 'chokidar': ${err.message}`);
    log.info('Instale: npm install chokidar');
    process.exit(1);
  }
}

// ========================================
// ENTRY POINT
// ========================================
async function main() {
  const isWatch = process.argv.includes('--watch');

  log.info('=== Bella Napoli Image Optimizer ===');
  log.info(`Root: ${ROOT}`);

  if (isWatch) {
    await watchMode();
  } else {
    await buildAll();
    log.info('\n=== Concluído ===');
  }
}

main().catch((err) => {
  log.err(`Erro fatal: ${err.message}`);
  process.exit(1);
});