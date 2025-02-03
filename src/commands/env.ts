import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { Input } from "jsr:@cliffy/prompt@1.0.0-rc.7";
import "jsr:@std/dotenv/load";

const envAction = async () => {
  console.log("Setting up the environment variables");
  const HOME_DIR = Deno.env.get("HOME");

  const ENV_VARS = [
    { name: "APPS_DIR", default: `${HOME_DIR}/home-server/apps` },
    { name: "LOGS_DIR", default: `${HOME_DIR}/home-server/logs` },
    { name: "WATCH_DIR", default: `${HOME_DIR}/home-server/watch` },
    { name: "DOWNLOAD_DIR", default: `${HOME_DIR}/Downloads` },
    { name: "MEDIA_DIR", default: `${HOME_DIR}/media` },
    { name: "PLEX_CLAIM", default: "" },
    { name: "PLEX_PUBLIC_IP", default: "" },
  ];

  // check if the environment variables are set
  for (const envVar of ENV_VARS) {
    if (!Deno.env.get(envVar.name)) {
      console.error(`Environment variable ${envVar.name} is not set`);

      const response = await Input.prompt({
        message: "Do you want to set it? (Y/n)",
        default: "y",
        validate: (value) => {
          if (!["y", "Y", "n", "N"].includes(value)) {
            return "Please enter either y or n";
          }
          return true;
        },
      });

      if (response === "y") {
        const value = await Input.prompt({
          message: `Enter the value for ${envVar.name}`,
          default: envVar.default,
        });
        Deno.env.set(envVar.name, value);
      }
    }

    console.log(`${envVar.name}=${Deno.env.get(envVar.name)}`);

    // write the environment variables to the .env file
    Deno.writeTextFile(
      ".env",
      `${envVar.name}=${Deno.env.get(envVar.name)}\n`,
      {
        append: true,
      },
    );
  }

  for (const envVar of ["APPS_DIR", "LOGS_DIR", "WATCH_DIR"]) {
    try {
      await Deno.mkdir(Deno.env.get(envVar)!, { recursive: true });
    } catch (error) {
      console.error(error);
    }
  }
};

const envCommand = new Command()
  .name("env")
  .description("setup the environment variables")
  .action(envAction);

export { envCommand };
