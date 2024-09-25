/**
 * @brief http response data contract model
 */
export abstract class ResponseDataContract{
    /**
     *
     * @param attributes object attributes
     */
    constructor(attributes:Record<string, any> = {}) {
        Object.assign(this,attributes)
    }
}