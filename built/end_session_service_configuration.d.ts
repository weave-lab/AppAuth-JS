import { Requestor } from './xhr';
/**
 * Represents EndSessionServiceConfiguration as a JSON object.
 */
export interface EndSessionServiceConfigurationJson {
    authorization_endpoint: string;
    token_endpoint: string;
    revocation_endpoint: string;
    end_session_endpoint?: string;
    userinfo_endpoint?: string;
}
/**
 * Configuration details required to interact with an authorization service.
 *
 * More information at https://openid.net/specs/openid-connect-discovery-1_0-17.html
 */
export declare class EndSessionServiceConfiguration {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    revocationEndpoint: string;
    userInfoEndpoint?: string;
    endSessionEndpoint?: string;
    constructor(request: EndSessionServiceConfigurationJson);
    toJson(): {
        authorization_endpoint: string;
        token_endpoint: string;
        revocation_endpoint: string;
        end_session_endpoint: string | undefined;
        userinfo_endpoint: string | undefined;
    };
    static fetchFromIssuer(openIdIssuerUrl: string, requestor?: Requestor): Promise<EndSessionServiceConfiguration>;
}
