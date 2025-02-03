import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7';
import * as dc from 'npm:docker-compose';
import { appsCheckbox } from './helpers/choices.ts';
import { AppType } from './helpers/option-type.ts';

interface StopOptions {
  all?: boolean;
  app?: string[];
  interactive?: boolean;
}

const stopAction = async (options: StopOptions) => {
  const all = options.all || !options.app;
  const app = options.app || [];
  const interactive = options.interactive || false;

  const config = { log: true };
  let response: dc.IDockerComposeResult;

  try {
    if (interactive) {
      console.log('Starting interactive mode...');

      const apps = await appsCheckbox('start', true);
      response = await dc.downMany(apps, config);

      console.log(response.out);
    } else if (all) {
      console.log('Stopping all applications...');

      response = await dc.down(config);

      console.log(response.out);
    } else if (app) {
      if (app.length > 1) {
        console.log('Stopping multiple applications...', app);

        response = await dc.downMany(app, config);
      } else {
        console.log('Stopping a single application...', app[0]);

        response = await dc.downOne(app[0], config);
      }
      console.log(response.out);
    }
  } catch (error) {
    console.error(error);
  }
};

const stopCommand = new Command()
  .name('stop')
  .description('Stops the application')
  .type('app', new AppType())
  .option('-A, --all', 'Stop all applications')
  .option('-a, --app <name...:app>', 'Stop a specific application', {
    conflicts: ['all'],
  })
  .option('-I, --interactive', 'Interactive mode', {
    conflicts: ['all', 'app'],
  })
  .action(stopAction);

export { stopCommand };
