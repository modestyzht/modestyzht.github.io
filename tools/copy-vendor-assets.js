const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

const copyDir = (from, to) => {
  fs.rmSync(to, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
};

const copyFile = (from, to) => {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};

copyDir(
  path.join(root, 'node_modules', '@fortawesome', 'fontawesome-free', 'css'),
  path.join(root, 'source', 'vendor', 'fontawesome', 'css')
);

copyDir(
  path.join(root, 'node_modules', '@fortawesome', 'fontawesome-free', 'webfonts'),
  path.join(root, 'source', 'vendor', 'fontawesome', 'webfonts')
);

copyFile(
  path.join(root, 'node_modules', 'pangu', 'dist', 'browser', 'pangu.umd.js'),
  path.join(root, 'source', 'vendor', 'pangu', 'pangu.umd.js')
);

copyDir(
  path.join(root, 'node_modules', 'butterfly-extsrc', 'sharejs', 'dist'),
  path.join(root, 'source', 'vendor', 'sharejs')
);

copyFile(
  path.join(root, 'node_modules', '@egjs', 'infinitegrid', 'dist', 'infinitegrid.min.js'),
  path.join(root, 'source', 'vendor', 'infinitegrid', 'infinitegrid.min.js')
);
