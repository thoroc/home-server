import { Input } from "jsr:@cliffy/prompt@1.0.0-rc.7";
import "jsr:@std/dotenv/load";
import { getDefaultEnvVars } from "../helpers/mod.ts";

interface EnvOptions {
  yes?: boolean;
}

export const envAction = async (options: EnvOptions) => {
  console.log("Setting up the environment variables");

  // find the .env.dist file and load all variables
  const defaultEnvVars = await getDefaultEnvVars();

  // check if the environment variables are set
  for (const [name, defaultValue] of Object.entries(defaultEnvVars)) {
    if (!Deno.env.get(name)) {
      console.error(`Environment variable ${name} is not set`);

      let response: string = "n";

      if (!options.yes) {
        response = await Input.prompt({
          message: "Do you want to set it? (Y/n)",
          default: "y",
          validate: (value) => {
            if (!["y", "Y", "n", "N"].includes(value)) {
              return "Please enter either y or n";
            }
            return true;
          },
        });
      }

      if (response.toLowerCase() === "y" || options.yes) {
        const value = await Input.prompt({
          message: `Enter the value for ${name}`,
          default: defaultValue,
        });

        Deno.env.set(name, value);
      }
    }

    console.log(`${name}=${Deno.env.get(name)}`);

    // write the environment variables to the .env file
    Deno.writeTextFile(".env", `${name}=${Deno.env.get(name)}\n`, {
      append: true,
    });
  }
};
