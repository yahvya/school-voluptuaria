import { DataSource } from 'typeorm';
import {EnvConfigService} from "../../../core/configs/env-config";

var databaseConf = new EnvConfigService()
export const databaseService = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: databaseConf.databaseHost,
                port: parseInt(databaseConf.databasePort),
                username: databaseConf.databaseUser,
                password: databaseConf.databasePassword,
                database: databaseConf.databaseName,
                entities: [
                    __dirname + '**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];