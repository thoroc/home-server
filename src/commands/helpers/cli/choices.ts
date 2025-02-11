import { Checkbox } from 'jsr:@cliffy/prompt@1.0.0-rc.7';
import { DOCKER_COMPOSE_FILE } from '../constants.ts';
import { getIncludedServices, getRunningServices } from '../mod.ts';

export const appsCheckbox = async (
  actionName: string,
  running?: boolean
): Promise<string[]> => {
  const services = running
    ? (await getRunningServices()).map((service) => service.name)
    : Object.keys(getIncludedServices(DOCKER_COMPOSE_FILE));

  const options = services.map((service) => ({
    name: service,
    value: service,
  }));

  if (services.length === 0) {
    console.log('No running container to stop');
    Deno.exit(1);
  }

  return await Checkbox.prompt({
    message: `Pick the apps to ${actionName}`,
    options,
  });
};
