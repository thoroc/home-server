import 'jsr:@std/dotenv/load';
import { exists } from 'jsr:@std/fs';
import chalk from 'npm:chalk';

interface MkdirOptions {
  allowed_dir: string[];
}

export const mkdir = async (
  path: string,
  options?: MkdirOptions
): Promise<void> => {
  try {
    if (await exists(path)) {
      console.log(`Directory "${chalk.yellow(path)}" already exists.`);
    } else {
      if (options?.allowed_dir) {
        const allowed = options.allowed_dir.some((dir) => path.startsWith(dir));
        if (!allowed) {
          console.error(
            chalk.redBright(`Creating directory "${path}" is not allowed.`)
          );
          return;
        }
      }
      console.log(`Creating volume directory "${chalk.green(path)}"...`);
      await Deno.mkdir(path, { recursive: true });
    }
  } catch (error) {
    if (error instanceof Deno.errors.AlreadyExists) {
      console.log(`Directory "${path}" already exists.`);
    } else {
      throw error;
    }
  }
};
