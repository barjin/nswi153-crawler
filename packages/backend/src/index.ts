import getopts from "getopts";

import { getServer } from "./getServer";

const options = getopts(process.argv.slice(2), {
  alias: {
    port: "p",
  },
  unknown: (option) => {
    console.log(`Unknown option: ${option}`);
    return false;
  },
});

const port = options.port || 3000;

void getServer().then((app) => {
  const server = app.listen(port, () => {
    const address = server.address();
    if (typeof address === "string") {
      console.log(`Listening on ${address}`);
    } else if (address) {
      console.log(`Listening on ${address.port}`);
    }
  });
});
