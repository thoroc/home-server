import {
  type Compose,
  DefinitionsInclude,
  PropertiesServices,
} from "@json-types/compose";
import { parse } from "jsr:@std/yaml";
import * as dc from "npm:docker-compose";
import { DOCKER_COMPOSE_FILE } from "../constants.ts";

/**
 * Retrieves and parses a Docker Compose configuration file.
 *
 * @param {string} [filePath] - Optional path to the Docker Compose file. If not provided, defaults to `DOCKER_COMPOSE_FILE`.
 * @returns {Compose} The parsed Docker Compose configuration.
 * @throws Will throw an error if the file cannot be read or parsed.
 */
const getCompose = (filePath?: string): Compose => {
  try {
    const dockerComposeFile = filePath || DOCKER_COMPOSE_FILE;
    // console.debug(
    //   'Get docker compose config from',
    //   chalk.yellow(dockerComposeFile)
    // );
    const data = Deno.readTextFileSync(dockerComposeFile);
    return parse(data) as Compose;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Retrieves the services defined in a Docker Compose file.
 *
 * @param {string} [filePath] - The optional path to the Docker Compose file. If not provided, a default path will be used.
 * @returns {string[]} An array of service names defined in the Docker Compose file.
 *
 * @remarks
 * This function reads the Docker Compose file specified by `filePath`, extracts the services section,
 * and returns the names of the services as an array of strings. If no services are found, an error message
 * is logged to the console.
 */
export const getServices = (filePath?: string): string[] => {
  const compose = getCompose(filePath);
  const services = compose.services as PropertiesServices;

  // if (!services) {
  //   console.warn(chalk.bgRedBright(`No services found in ${filePath}`));
  // }

  return Object.keys(services || {});
};

/**
 * Retrieves the included services from a Docker Compose file.
 *
 * This function reads a Docker Compose file, extracts the `include` section,
 * and processes each included file to gather the services defined within them.
 *
 * @param {string} [filePath] - The optional path to the Docker Compose file. If not provided, a default path will be used.
 * @returns {string[]} An array of service names included in the Docker Compose file.
 */
export const getIncludedServices = (filePath?: string): string[] => {
  const services = getServices(filePath);

  const compose = getCompose(filePath);

  const include = compose.include as DefinitionsInclude;

  if (include) {
    const includedServices = include
      .toString()
      .split(",")
      .map((includeFilePath) => getServices(includeFilePath))
      .flat();

    return [...services, ...includedServices];
  }

  return services;
};

/**
 * Retrieves the list of running Docker services.
 *
 * This function uses the `docker-compose ps` command to get the status of all services
 * and filters out the ones that are currently running (i.e., their state starts with 'Up').
 *
 * @returns {Promise<dc.DockerComposePsResultService[]>} A promise that resolves to an array of running Docker services.
 * @throws Will throw an error if the `docker-compose ps` command fails.
 */
export const getRunningServices = async (): Promise<
  dc.DockerComposePsResultService[]
> => {
  try {
    const runningServices: dc.DockerComposePsResultService[] = [];
    const containers = await dc.ps();

    for (const service of containers.data.services) {
      if (service.state.startsWith("Up")) {
        runningServices.push(service);
      }
    }

    return runningServices;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
