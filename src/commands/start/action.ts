import chalk from 'npm:chalk';
import * as dc from 'npm:docker-compose';
import { appsCheckbox, getRunningServices } from '../helpers/mod.ts';

interface StartOptions {
  all?: boolean;
  app?: string[];
  interactive?: boolean;
  restart?: boolean;
}

const startInteractive = async ({ restart }: { restart: boolean }) => {
  const config = { log: true };
  let response: dc.IDockerComposeResult;
  console.log('Starting interactive mode...');

  const apps = await appsCheckbox('start');

  if (restart) {
    console.log('Restarting multiple applications...', apps);

    response = await dc.restartMany(apps, config);
  } else {
    console.log('Starting multiple applications...', apps);

    response = await dc.upMany(apps, config);
  }

  console.log(response.out);
};

const startAll = async ({ restart }: { restart: boolean }) => {
  const config = { log: true };
  let response: dc.IDockerComposeResult;

  if (restart) {
    console.log('Restarting all applications...');

    response = await dc.restartAll(config);
  } else {
    console.log('Starting all applications...');

    response = await dc.upAll(config);
  }

  console.log(response.out);
};

const startApp = async ({
  apps,
  restart,
}: {
  apps: string[];
  restart: boolean;
}) => {
  const config = { log: true };
  let response: dc.IDockerComposeResult;
  if (restart) {
    if (apps.length > 1) {
      console.log('Restarting multiple applications...', apps);

      response = await dc.restartMany(apps, config);
    } else {
      console.log('Restarting a single application...', apps[0]);

      response = await dc.restartOne(apps[0], config);
    }
  } else {
    if (apps.length > 1) {
      console.log('Starting multiple applications...', apps);

      response = await dc.upMany(apps, config);
    } else {
      console.log('Starting a single application...', apps[0]);

      response = await dc.upOne(apps[0], config);
    }
  }

  console.log(response.out);
};

const checkRunningServices = async () => {
  const runningServices: dc.DockerComposePsResultService[] =
    await getRunningServices();

  for (const service of runningServices) {
    const servicesName = service.name;
    const state = service.state;
    const ports = new Set(
      service.ports
        .map((port) => (port.mapped ? port.mapped.port : []))
        .filter(Number)
    );
    // convert Set to array
    const portsArray = Array.from(ports).join(', ');

    console.log(
      `> ${chalk.yellow(
        servicesName
      )} (${state}) - http://localhost:${portsArray}`
    );
  }
};

export const startAction = async (options: StartOptions) => {
  console.log('Starting application...', Deno.cwd());
  const interactive = options.interactive || false;
  const all = options.all || !options.app;
  const app = options.app || [];
  const restart = options.restart || false;

  try {
    if (interactive) {
      await startInteractive({ restart });
    } else if (all) {
      await startAll({ restart });
    } else if (app) {
      await startApp({ apps: app, restart });
    }

    await checkRunningServices();
  } catch (error) {
    console.error(error);
  }
};
