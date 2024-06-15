import "reflect-metadata"
import { join } from "path"

import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '/entity/*.{js,ts}')],
    migrations: [],
    subscribers: [],
})
