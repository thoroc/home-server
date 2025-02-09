import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import 'jsr:@std/dotenv/load';
import { envAction } from './action.ts';

const envCommand = new Command()
  .name('env')
  .description('setup the environment variables')
  .option('-y, --yes', 'auto set the environment variables')
  .action(envAction);

export { envCommand };
