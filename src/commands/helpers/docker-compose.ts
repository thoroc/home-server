import { type Compose } from '@json-types/compose';
import { parse } from 'jsr:@std/yaml';
import * as dc from 'npm:docker-compose';
import { DOCKER_COMPOSE_FILE } from './constants.ts';

export const allServices = async (filePath?: string): Promise<string[]> => {
  const services = getServices(filePath);
  const runningServices = await getRunningServices();
  const runningServiceNames = runningServices.map((service) => service.name);

  return services.filter((service) => runningServiceNames.includes(service));
};

export const getServices = (filePath?: string): string[] => {
  const dockerComposeFile = filePath || DOCKER_COMPOSE_FILE;
  const data = Deno.readTextFileSync(dockerComposeFile);
  const values: Compose = parse(data) as Compose;
  const services = values.services;

  if (!services) {
    throw new Error(`No services found in ${dockerComposeFile}`);
  }

  return Object.keys(services || {});
};

export const getRunningServices = async (): Promise<
  dc.DockerComposePsResultService[]
> => {
  try {
    const runningServices: dc.DockerComposePsResultService[] = [];
    const containers = await dc.ps();

    for (const service of containers.data.services) {
      if (service.state.startsWith('Up')) {
        runningServices.push(service);
      }
    }

    return runningServices;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
