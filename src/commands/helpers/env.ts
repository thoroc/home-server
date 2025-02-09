interface EnvOptions {
  envFile?: string;
}

/**
 * Reads environment variables from a specified file and returns them as an object.
 *
 * @param {Object} options - Optional parameter to specify the environment file to read from.
 * @param {string} options.envFile - The path to the environment file. Defaults to ".env.dist".
 *
 * @returns {Promise<Record<string, string>>} A promise that resolves to an object where the keys are the environment variable names
 * and the values are their default values as specified in the file.
 *
 * The environment file should have each variable on a new line in the format `NAME=VALUE`.
 * Lines that are empty or start with `#` are ignored.
 *
 * @example
 * ```typescript
 * const envVars = await getDefaultEnvVars({ envFile: ".env.custom" });
 * console.log(envVars);
 * // Output: { VAR1: "value1", VAR2: "value2", ... }
 * ```
 */
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
