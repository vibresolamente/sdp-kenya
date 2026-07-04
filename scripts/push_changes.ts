import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function run() {
  try {
    console.log('Adding uploaded files to git...');
    await execAsync('git add public/uploads/*');
    console.log('Committing changes...');
    await execAsync('git commit -m "Add admin uploaded documents and logo"');
    console.log('Pushing to remote...');
    await execAsync('git push');
    console.log('Push completed successfully.');
  } catch (error) {
    console.error('Git operation failed:', (error as any).stderr || (error as any).message);
    process.exit(1);
  }
}

run();
