import * as dc from "npm:docker-compose";
import { appsCheckbox } from "../helpers/choices.ts";

interface StopOptions {
  all?: boolean;
  app?: string[];
  interactive?: boolean;
}

export const stopAction = async (options: StopOptions) => {
  const all = options.all || !options.app;
  const app = options.app || [];
  const interactive = options.interactive || false;

  const config = { log: true };
  let response: dc.IDockerComposeResult;

  try {
    if (interactive) {
      console.log("Starting interactive mode...");

      const apps = await appsCheckbox("start", true);
      response = await dc.downMany(apps, config);

      console.log(response.out);
    } else if (all) {
      console.log("Stopping all applications...");

      response = await dc.down(config);

      console.log(response.out);
    } else if (app) {
      if (app.length > 1) {
        console.log("Stopping multiple applications...", app);

        response = await dc.downMany(app, config);
      } else {
        console.log("Stopping a single application...", app[0]);

        response = await dc.downOne(app[0], config);
      }
      console.log(response.out);
    }
  } catch (error) {
    console.error(error);
  }
};
