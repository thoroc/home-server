import 'jsr:@std/dotenv/load';
import { checkRunningServices } from '../helpers/mod.ts';
import { startAll, startApp, startInteractive } from './start/mod.ts';

interface StartOptions {
  all?: boolean;
  app?: string[];
  interactive?: boolean;
  restart?: boolean;
}

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
      await startApp(app, { restart });
    }

    await checkRunningServices();
  } catch (error) {
    console.error(error);
  }
};
