import {Injectable} from "@nestjs/common";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @brief Service that provides the environment configuration.
 */
@Injectable()
export class EnvConfigService{

    /**
     * @returns {string|null} The database name or null if it is not defined.
     */
    public get databaseName(): string|null {
        return process.env.DATABASE_NAME || null;
    }

    /**
     * @returns {string|null} the secret key for the jwt token
     */
    public get jwtSecret(): string|null {
        return process.env.JWT_SECRET || null;
    }

    /**
     * @returns {string|null} the secret key for the jwt token
     */
    public get jwtExpired(): string|null {
        return process.env.JWT_EXPIRES_IN || null;
    }


    /**
     * @returns {string|null} The database host or null if it is not defined.
     */
    public get databaseHost(): string|null {
        return process.env.DATABASE_HOST || null;
    }

    /**
     * @returns {string|null} The database port or null if it is not defined.
     */
    public get databasePort(): string|null {
        return process.env.DATABASE_PORT || null;
    }

    /**
     * @returns {string|null} The database user or null if it is not defined.
     */
    public get databaseUser(): string|null {
        return process.env.DATABASE_USER || null;
    }

    /**
     * @returns {string|null} The database password or null if it is not defined.
     */
    public get databasePassword(): string|null {
        return process.env.DATABASE_PASSWORD || null;
    }

}