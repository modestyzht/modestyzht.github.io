const { spawn } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const hexoBin = path.join(root, 'node_modules', 'hexo', 'bin', 'hexo');
const child = spawn(process.execPath, [hexoBin, 'generate'], {
  cwd: root,
  env: process.env
});

let output = '';
const stripAnsi = (text) => text.replace(/\x1b\[[0-9;]*m/g, '');

child.stdout.on('data', (chunk) => {
  process.stdout.write(chunk);
  output += stripAnsi(chunk.toString());
});

child.stderr.on('data', (chunk) => {
  process.stderr.write(chunk);
  output += stripAnsi(chunk.toString());
});

child.on('close', (code) => {
  const hasHexoError = /(^|\n)\s*ERROR\s+/i.test(output) || /Process failed:/i.test(output);

  if (code !== 0 || hasHexoError) {
    if (hasHexoError && code === 0) {
      console.error('\nBuild failed: Hexo reported errors while generating pages.');
    }
    process.exit(code || 1);
  }
});
