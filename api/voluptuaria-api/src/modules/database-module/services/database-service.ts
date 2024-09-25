import { DataSource } from 'typeorm';
import {ConfigService} from "@nestjs/config";

/**
 * @brief Type orm config
 */
export const databaseService = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (envConfig: ConfigService) => {
            const dataSource = new DataSource({
                type: "mysql",
                host: envConfig.getOrThrow("DATABASE_HOST"),
                port: parseInt(envConfig.getOrThrow("DATABASE_PORT")),
                username: envConfig.getOrThrow("DATABASE_USER"),
                password: envConfig.getOrThrow("DATABASE_PASSWORD"),
                database: envConfig.getOrThrow("DATABASE_NAME"),
                entities: [
                    __dirname + '**/*.entity{.ts,.js}',
                ]
            });

            return dataSource.initialize();
        }
    },
];