#!/usr/bin/env -S deno run -A
import { Command } from '@cliffy/command';
import {
  envCommand,
  listCommand,
  startCommand,
  stopCommand,
} from './src/commands/mod.ts';

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await new Command()
    .name('hms-victor')
    .version('0.1.5')
    .description('CLI to manage Home Media Server (HMS) services.')
    .command('list', listCommand)
    .command('start', startCommand)
    .command('stop', stopCommand)
    .command('env', envCommand)
    .parse(Deno.args);
}
