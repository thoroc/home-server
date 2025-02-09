import * as dc from "npm:docker-compose";
import { appsCheckbox } from "../helpers/choices.ts";

interface StartOptions {
  all?: boolean;
  app?: string[];
  interactive?: boolean;
  restart?: boolean;
}

export const startAction = async (options: StartOptions) => {
  console.log("Starting application...", Deno.cwd());
  const interactive = options.interactive || false;
  const all = options.all || !options.app;
  const app = options.app || [];
  const restart = options.restart || false;

  const config = { log: true };
  let response: dc.IDockerComposeResult;

  try {
    if (interactive) {
      console.log("Starting interactive mode...");

      const apps = await appsCheckbox("start");

      if (restart) {
        console.log("Restarting multiple applications...", apps);

        response = await dc.restartMany(apps, config);
      } else {
        console.log("Starting multiple applications...", apps);

        response = await dc.upMany(apps, config);
      }

      console.log(response.out);
    } else if (all) {
      if (restart) {
        console.log("Restarting all applications...");

        response = await dc.restartAll(config);
      } else {
        console.log("Starting all applications...");

        response = await dc.upAll(config);
      }

      console.log(response.out);
    } else if (app) {
      if (restart) {
        if (app.length > 1) {
          console.log("Restarting multiple applications...", app);

          response = await dc.restartMany(app, config);
        } else {
          console.log("Restarting a single application...", app[0]);

          response = await dc.restartOne(app[0], config);
        }
      } else {
        if (app.length > 1) {
          console.log("Starting multiple applications...", app);

          response = await dc.upMany(app, config);
        } else {
          console.log("Starting a single application...", app[0]);

          response = await dc.upOne(app[0], config);
        }
      }

      console.log(response.out);
    }
  } catch (error) {
    console.error(error);
  }
};
