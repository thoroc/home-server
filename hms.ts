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
    .name('home-server-cli')
    .version('0.1.0')
    .description('CLI for managing home server')
    .command('list', listCommand)
    .command('start', startCommand)
    .command('stop', stopCommand)
    .command('env', envCommand)
    .parse(Deno.args);
}
