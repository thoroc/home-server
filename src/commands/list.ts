import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import chalk from 'npm:chalk';
import { getRunningServices, getServices } from './helpers/docker-compose.ts';

interface ListOptions {
  all?: boolean;
}

const listAction = async (options: ListOptions) => {
  const runningServices = await getRunningServices();

  for (const service of runningServices) {
    console.log(
      `> ${chalk.yellow(service.name)} - ${chalk.green(service.state)}`
    );
  }

  if (options.all) {
    const availableServices = getServices();

    const runningServiceNames = runningServices.map((service) => service.name);
    const missingServices = availableServices.filter(
      (service) => !runningServiceNames.includes(service)
    );

    if (missingServices.length > 0) {
      console.log('available services:');
      for (const service of missingServices) {
        console.log(
          `> ${chalk.yellow(service)} - run this service with ${chalk.cyan(
            `deno task cli start -a ${service}`
          )}`
        );
      }
      return;
    }
  }
};

const listCommand = new Command()
  .name('list')
  .description('Lists the applications')
  .option('-A, --all', 'List all applications')
  .action(listAction);

export { listCommand };
