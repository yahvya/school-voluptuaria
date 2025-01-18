/**
 * id sources
 */
export enum IdSource{

}

/**
 * Id getter element format
 */
export interface IdGetter{
    source: IdSource,
    idGetterConfig: Record<string, any>
}
