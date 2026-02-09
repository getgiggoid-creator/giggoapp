#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');

function run(nodePath, args) {
  console.log(`\n> ${nodePath} ${args.join(' ')}`);
  const res = spawnSync(nodePath, args, { stdio: 'inherit' });
  if (res.error) {
    console.error('Failed to run:', res.error);
    process.exit(1);
  }
  if (res.status !== 0) process.exit(res.status);
}

try {
  const node = process.execPath;

  // Run eslint (use local binary to avoid shell wrappers)
  const eslintBin = path.join(__dirname, '..', 'node_modules', 'eslint', 'bin', 'eslint.js');
  run(node, [eslintBin, '.', '--ext', '.ts,.tsx,.js,.jsx']);

  // Run vite build
  const viteBin = path.join(__dirname, '..', 'node_modules', 'vite', 'bin', 'vite.js');
  run(node, [viteBin, 'build']);

  console.log('\n✅ ci-checks finished successfully');
} catch (err) {
  console.error(err);
  process.exit(1);
}
