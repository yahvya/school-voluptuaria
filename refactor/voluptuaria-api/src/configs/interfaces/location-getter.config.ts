import { IdSource } from "./id-getter.config"

/**
 * Location get config
 */
export interface LocationGetterConfig{
    source: IdSource,
    locationGetConfig: Record<string, any>
}

/**
 * Location getter builder
 */
export interface LocationGetterBuilder{
    setRequiredData(data:any)

    buildLocationData():LocationGetterConfig
}

/**
 * Loadable element
 */
export interface LoadableFromLocationGetter{
    loadFrom({locationGetter}:{locationGetter:LocationGetterConfig})
}
