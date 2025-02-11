import chalk from 'npm:chalk';
import {
  getIncludedServices,
  getRunningServices,
  getServices,
} from '../helpers/mod.ts';

interface ListOptions {
  all?: boolean;
  recursive?: boolean;
}

export const listAction = async (options: ListOptions) => {
  const recursive = options.recursive || false;
  const runningServices = await getRunningServices();

  for (const service of runningServices) {
    console.log(
      `> ${chalk.yellow(service.name)} - ${chalk.green(service.state)}`
    );
  }

  if (options.all) {
    const runningServiceNames = runningServices.map((service) => service.name);
    const availableServices = recursive ? getIncludedServices() : getServices();
    const missingServices = Object.keys(availableServices).filter(
      (service) => !runningServiceNames.includes(service)
    );

    if (missingServices.length > 0) {
      console.log('available services:');
      // console.table(missingServices);
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
