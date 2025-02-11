import 'jsr:@std/dotenv/load';
import * as dc from 'npm:docker-compose';
import { appsCheckbox } from '../../helpers/mod.ts';
import { setupDir } from './setup.ts';

interface StartInteractiveOptions {
  restart?: boolean;
}

export const startInteractive = async (options?: StartInteractiveOptions) => {
  const config = { log: true };
  let response: dc.IDockerComposeResult;
  console.log('Starting interactive mode...');

  const apps = await appsCheckbox('start');

  await setupDir(apps);

  if (options?.restart) {
    console.log('Restarting multiple applications...', apps);

    response = await dc.restartMany(apps, config);
  } else {
    console.log('Starting multiple applications...', apps);

    response = await dc.upMany(apps, config);
  }

  console.log(response.out);
};
