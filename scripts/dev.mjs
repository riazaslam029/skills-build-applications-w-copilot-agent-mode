import { spawn } from 'node:child_process';

const commands = [
  {
    name: 'backend',
    command: 'npm',
    args: ['--prefix', 'octofit-tracker/backend', 'run', 'dev'],
  },
  {
    name: 'frontend',
    command: 'npm',
    args: ['--prefix', 'octofit-tracker/frontend', 'run', 'dev'],
  },
];

const processes = commands.map(({ name, command, args }) => {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: false,
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      console.log(`${name} exited with signal ${signal}`);
    } else {
      console.log(`${name} exited with code ${code ?? 0}`);
    }

    if (code && code !== 0) {
      process.exitCode = code;
      for (const otherProcess of processes) {
        if (otherProcess !== child && !otherProcess.killed) {
          otherProcess.kill();
        }
      }
    }
  });

  return child;
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    for (const child of processes) {
      if (!child.killed) {
        child.kill(signal);
      }
    }
    process.exit(0);
  });
}