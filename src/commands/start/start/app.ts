import 'jsr:@std/dotenv/load';
import * as dc from 'npm:docker-compose';
import { setupDir } from './setup.ts';

interface StartAppOptions {
  restart?: boolean;
}

export const startApp = async (apps: string[], options?: StartAppOptions) => {
  const config = { log: true };
  let response: dc.IDockerComposeResult;
  if (options?.restart) {
    if (apps.length > 1) {
      console.log('Restarting multiple applications...', apps);

      response = await dc.restartMany(apps, config);
    } else {
      console.log('Restarting a single application...', apps[0]);

      response = await dc.restartOne(apps[0], config);
    }
  } else {
    await setupDir(apps);

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
