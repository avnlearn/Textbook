import { execSync } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Define paths
const CACHE_DIR = path.resolve('./.math-cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

/**
 * Renders LaTeX string using XeLaTeX and returns an optimized SVG.
 * Designed for VitePress SSR.
 */
export function renderXeLaTeX(tex: string): string {
  
  const hash = crypto.createHash('sha1').update(tex).digest('hex');
  const svgCachePath = path.join(CACHE_DIR, `${hash}.svg`);

  // 2. Return cached version if it exists
  if (fs.existsSync(svgCachePath)) {
    return fs.readFileSync(svgCachePath, 'utf-8');
  }

  // 3. Prepare temporary files
  const tmpTexFile = path.join(CACHE_DIR, `${hash}.tex`);
  const xdvFile = path.join(CACHE_DIR, `${hash}.xdv`);

  // Use the 'standalone' class for tight cropping around the math
  const fullTex = `
\\documentclass[border=1pt]{standalone}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\usepackage{unicode-math}
\\begin{document}
$ ${tex} $
\\end{document}
  `.trim();

  fs.writeFileSync(tmpTexFile, fullTex);

  try {
    // 4. Execute XeLaTeX
    // -no-pdf: Faster output to XDV format
    // -interaction=nonstopmode: Don't stop on LaTeX errors
    execSync(
      `xelatex -no-pdf -interaction=nonstopmode -output-directory="${CACHE_DIR}" "${tmpTexFile}"`,
      { stdio: 'ignore' }
    );

    // 5. Convert XDV to SVG using dvisvgm
    // --no-fonts: Converts glyphs to SVG paths (crucial for SSR so users don't need fonts)
    // --stdout: Pipes output directly to our variable
    const svgOutput = execSync(
      `dvisvgm "${xdvFile}" --no-fonts --stdout --verbosity=0`,
      { encoding: 'utf8' }
    );

    // 6. Cleanup auxiliary files (log, aux, tex, xdv)
    const extensions = ['.tex', '.log', '.aux', '.xdv'];
    extensions.forEach(ext => {
      const file = path.join(CACHE_DIR, `${hash}${ext}`);
      if (fs.existsSync(file)) fs.unlinkSync(file);
    });

    // 7. Save SVG to cache and return
    fs.writeFileSync(svgCachePath, svgOutput);
    return svgOutput;

  } catch (error) {
    console.error(`[XeLaTeX SSR Error] Failed to render: ${tex.substring(0, 50)}...`);
    // Return a visible error or the raw TeX as fallback
    return `<span style="color:red">Math Render Error: ${hash}</span>`;
  }
}
