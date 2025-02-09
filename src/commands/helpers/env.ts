interface EnvOptions {
  envFile?: string;
}

export const getDefaultEnvVars = async (
  options?: EnvOptions
): Promise<Record<string, string>> => {
  const envFile = options?.envFile ?? '.env.dist';
  const envDist = await Deno.readTextFile(envFile);
  const ENV_VARS_DIST = envDist
    .split('\n') // split by lines
    .filter((line) => line.trim() !== '' && !line.startsWith('#')) // filter out empty lines and comments
    .map((line) => {
      const [name, defaultValue] = line.split('='); // split by the equal sign
      return { name, default: defaultValue };
    });

  // return an object with the environment variable names as keys and their default values as values
  return ENV_VARS_DIST.reduce((acc: Record<string, string>, envVar) => {
    acc[envVar.name] = envVar.default;
    return acc;
  }, {});
};
