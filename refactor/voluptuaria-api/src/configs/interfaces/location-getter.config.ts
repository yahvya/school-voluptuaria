import { IdSource } from "./id-getter.config"

/**
 * Location get config
 */
export interface LocationGetterConfig{
    source: IdSource,
    locationGetConfig: Record<string, any>
}
