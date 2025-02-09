import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import chalk from 'npm:chalk';
import { getRunningServices, getServices } from './helpers/docker-compose.ts';

const listAction = async () => {
  const runningServices = await getRunningServices();

  if (runningServices.length === 0) {
    console.log('No running services');
    console.log('available services:');
    for (const service of getServices()) {
      console.log(`> ${chalk.yellow(service)}`);
    }
    return;
  }

  for (const service of runningServices) {
    console.log(
      `> ${chalk.yellow(service.name)} - ${chalk.green(service.state)}`
    );
  }
};

const listCommand = new Command()
  .name('list')
  .description('Lists the applications')
  .option('-A, --all', 'List all applications')
  .action(listAction);

export { listCommand };
