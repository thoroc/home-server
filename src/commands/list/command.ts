import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import { listAction } from './action.ts';

const listCommand = new Command()
  .name('list')
  .description('Lists the applications')
  .option('-A, --all', 'List all applications')
  .option('-R, --recursive', 'List all applications recursively')
  .action(listAction);

export { listCommand };
