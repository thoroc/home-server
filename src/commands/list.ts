import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import chalk from 'npm:chalk';
import { getRunningServices } from './helpers/docker-compose.ts';

const listAction = async () => {
  const runningServices = await getRunningServices();

  if (runningServices.length === 0) {
    console.log('No running services');
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
  .action(listAction);

export { listCommand };
