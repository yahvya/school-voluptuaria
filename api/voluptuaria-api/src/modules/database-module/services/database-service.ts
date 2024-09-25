import { DataSource } from 'typeorm';
import {EnvConfigService} from "../../../core/configs/env-config-service";

/**
 * @brief Type orm config
 */
export const databaseService = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (databaseConf:EnvConfigService) => {
            const dataSource = new DataSource({
                type: "mysql",
                host: databaseConf.databaseHost,
                port: parseInt(databaseConf.databasePort),
                username: databaseConf.databaseUser,
                password: databaseConf.databasePassword,
                database: databaseConf.databaseName,
                entities: [
                    __dirname + '**/*.entity{.ts,.js}',
                ]
            });

            return dataSource.initialize();
        }
    },
];