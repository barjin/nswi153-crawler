import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import type { Options} from "@mikro-orm/sqlite";
import { SqliteDriver } from "@mikro-orm/sqlite";

const config: Options = {
  entities: ["./entities/*.ts"],
  dbName: "my-db-name",
  driver: SqliteDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export default config;
