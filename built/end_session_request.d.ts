import { Crypto } from './crypto_utils';
/**
 * Represents an EndSessionRequest as JSON.
 */
export interface EndSessionRequestJson {
    client_id: string;
    post_logout_redirect_uri: string;
    id_token_hint: string;
}
/**
 * Represents the AuthorizeRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
export declare class EndSessionRequest {
    private crypto;
    private usePkce;
    clientId: string;
    post_logout_redirect_uri: string;
    id_token_hint: string;
    constructor(request: EndSessionRequestJson, crypto?: Crypto, usePkce?: boolean);
    setupCodeVerifier(): Promise<void>;
    /**
     * Serializes the EndSessionRequest to a JavaScript Object.
     */
    toJson(): Promise<EndSessionRequestJson>;
}
