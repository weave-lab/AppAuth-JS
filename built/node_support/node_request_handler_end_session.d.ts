import { Crypto } from '../crypto_utils';
import { QueryStringUtils } from '../query_string_utils';
import { EndSessionServiceConfiguration } from '../end_session_service_configuration';
import { EndSessionRequest } from '../end_session_request';
import { EndSessionRequestHandler, EndSessionRequestResponse } from '../end_session_request_handler';
export declare class NodeBasedHandlerEndSession extends EndSessionRequestHandler {
    httpServerPort: number;
    endSessionPromise: Promise<EndSessionRequestResponse | null> | null;
    constructor(httpServerPort?: number, utils?: QueryStringUtils, crypto?: Crypto);
    performEndSessionRequest(configuration: EndSessionServiceConfiguration, request: EndSessionRequest): void;
    protected completeEndSessionRequest(): Promise<EndSessionRequestResponse | null>;
}
