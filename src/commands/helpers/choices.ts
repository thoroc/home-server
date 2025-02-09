import { Checkbox } from "jsr:@cliffy/prompt@1.0.0-rc.7";
import { getRunningServices, getServices } from "./docker-compose.ts";

export const appsCheckbox = async (
  actionName: string,
  running?: boolean,
): Promise<string[]> => {
  const services = running
    ? (await getRunningServices()).map((service) => service.name)
    : getServices("docker-compose.yml");

  const options = services.map((service) => ({
    name: service,
    value: service,
  }));

  if (services.length === 0) {
    console.log("No running container to stop");
    Deno.exit(1);
  }

  return await Checkbox.prompt({
    message: `Pick the apps to ${actionName}`,
    options,
  });
};
