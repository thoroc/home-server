import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { AppType } from "../helpers/option-type.ts";
import { stopAction } from "./action.ts";

const stopCommand = new Command()
  .name("stop")
  .description("Stops the application(s)")
  .type("app", new AppType())
  .option("-A, --all", "Stop all applications")
  .option("-a, --app <name...:app>", "Stop a specific application", {
    conflicts: ["all"],
  })
  .option("-I, --interactive", "Interactive mode", {
    conflicts: ["all", "app"],
  })
  .action(stopAction);

export { stopCommand };
