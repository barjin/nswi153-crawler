import { Options, SqliteDriver } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  entities: ['./entities/*.ts'],
  dbName: 'my-db-name',
  driver: SqliteDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export default config;