/**
 * Google Users data contract
 */
export class GoogleAuthResponse {
    public email: string

    public name: string

    public firstname: string

    constructor(datas: Record<string, string> = {}) {
        Object.assign(this, datas)
    }
}
