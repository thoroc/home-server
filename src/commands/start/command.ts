import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { AppType } from "../helpers/option-type.ts";
import { startAction } from "./action.ts";

const startCommand = new Command()
  .name("start")
  .description("Starts the application(s)")
  .type("app", new AppType())
  .option("-A, --all", "Start all applications")
  .option("-a, --app <name...:app>", "Start a specific application", {
    conflicts: ["all"],
  })
  .option("-I, --interactive", "Interactive mode", {
    conflicts: ["all", "app"],
  })
  .option("-r, --restart", "Restart the application")
  .action(startAction);

export { startCommand };
