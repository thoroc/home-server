import { Command } from "@cliffy/command";
import { envCommand } from "./src/commands/env.ts";
import { listCommand } from "./src/commands/list.ts";
import { startCommand } from "./src/commands/start.ts";
import { stopCommand } from "./src/commands/stop.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await new Command()
    .name("cliffy")
    .version("0.1.0")
    .description("Command line framework for Deno")
    .command("list", listCommand)
    .command("start", startCommand)
    .command("stop", stopCommand)
    .command("env", envCommand)
    .parse(Deno.args);
}
