import 'jsr:@std/dotenv/load';
import chalk from 'npm:chalk';
import { getCompose, mkdir } from '../../helpers/mod.ts';

export const setupDir = async (apps: string[]) => {
  for (const app of apps) {
    const compose = getCompose(`services/${app}.yml`);

    if (!compose) {
      console.error(chalk.redBright(`Compose file not found for app "${app}"`));
      Deno.exit(1);
    }

    const volumes =
      (compose.services &&
        compose.services[app] &&
        compose.services[app].volumes) ||
      [];

    const ALLOWED_VOLUME_PATHS = [
      '/Users',
      Deno.env.get('HMS_DIR') || '',
    ].filter(Boolean);

    for (const volume of volumes) {
      if (typeof volume === 'string') {
        const volumePath = volume.split(':')[0];

        const cleanPath = volumePath.replace(
          '${HMS_DIR}',
          Deno.env.get('HMS_DIR') || ''
        );

        await mkdir(cleanPath, { allowed_dir: ALLOWED_VOLUME_PATHS });
      }
    }
  }
};
