import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import 'jsr:@std/dotenv/load';
import { envAction } from './action.ts';

const envCommand = new Command()
  .name('env')
  .description('setup the environment variables')
  .option('-y, --yes', 'auto set the environment variables')
  .option('-O, --overwrite', 'overwrite the existing environment variables')
  .option(
    '-o, --output-file <outputFile:string>',
    'output the environment variables to a file',
    { default: '.env' }
  )
  .action(envAction);

export { envCommand };
