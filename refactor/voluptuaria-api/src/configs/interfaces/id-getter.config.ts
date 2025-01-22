/**
 * id sources
 */
export enum IdSource{
    GOOGLE_MAPS
}

/**
 * Id getter element format
 */
export interface IdGetter{
    source: IdSource,
    idGetterConfig: Record<string, any>
}

/**
 * Id getter builder
 */
export interface IdGetterBuilder{
    setRequiredData(data:any)

    buildIdData():IdGetter
}
