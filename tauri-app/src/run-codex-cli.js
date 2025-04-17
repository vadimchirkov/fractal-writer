const { spawn } = require('child_process');
const path = require('path');

function runCodexCli(args) {
  return new Promise((resolve, reject) => {
    const cliPath = path.resolve(__dirname, '../../codex-cli/dist/cli.js');
    const child = spawn('node', [cliPath, ...args], { shell: false });

    let output = '';
    let error = '';

    child.stdout.on('data', data => output += data.toString());
    child.stderr.on('data', data => error += data.toString());

    child.on('close', code => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(error || output);
      }
    });
  });
}

if (require.main === module) {
  // Allow running directly from shell plugin
  const args = process.argv.slice(2);
  runCodexCli(args)
    .then(output => {
      process.stdout.write(output);
      process.exit(0);
    })
    .catch(err => {
      process.stderr.write(err);
      process.exit(1);
    });
}

module.exports = { runCodexCli };
