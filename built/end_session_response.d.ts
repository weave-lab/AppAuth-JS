/**
 * Represents the EndSessionResponse as a JSON object.
 */
export interface EndSessionResponseJson {
    code: string;
    state: string;
}
/**
 * Represents the EndSessionError as a JSON object.
 */
export interface EndSessionErrorJson {
    error: string;
    error_description?: string;
    error_uri?: string;
    state?: string;
}
/**
 * Represents the Authorize Response type.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.2
 */
export declare class EndSessionResponse {
    code: string;
    state: string;
    constructor(response: EndSessionResponseJson);
    toJson(): EndSessionResponseJson;
}
/**
 * Represents the Authorize error response.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.2.1
 */
export declare class EndSessionError {
    error: string;
    errorDescription?: string;
    errorUri?: string;
    state?: string;
    constructor(error: EndSessionErrorJson);
    toJson(): EndSessionErrorJson;
}
