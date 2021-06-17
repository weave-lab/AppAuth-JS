import { Crypto } from './crypto_utils';
import { EndSessionRequest } from './end_session_request';
import { EndSessionError, EndSessionResponse } from './end_session_response';
import { EndSessionServiceConfiguration } from './end_session_service_configuration';
import { QueryStringUtils } from './query_string_utils';
/**
 * This type represents a lambda that can take an EndSessionRequest,
 * and an EndSessionResponse as arguments.
 */
export declare type EndSessionListener = (request: EndSessionRequest, response: EndSessionResponse | null, error: EndSessionError | null) => void;
/**
 * Represents a structural type holding both EndSession request and response.
 */
export interface EndSessionRequestResponse {
    request: EndSessionRequest;
    response: EndSessionResponse | null;
    error: EndSessionError | null;
}
/**
 * EndSession Service notifier.
 * This manages the communication of the EndSessionResponse to the 3p client.
 */
export declare class EndSessionNotifier {
    private listener;
    setEndSessionListener(listener: EndSessionListener): void;
    /**
     * The EndSession complete callback.
     */
    onEndSessionComplete(request: EndSessionRequest, response: EndSessionResponse | null, error: EndSessionError | null): void;
}
export declare const BUILT_IN_PARAMETERS: string[];
/**
 * Defines the interface which is capable of handling an EndSession request
 * using various methods (iframe / popup / different process etc.).
 */
export declare abstract class EndSessionRequestHandler {
    utils: QueryStringUtils;
    protected crypto: Crypto;
    constructor(utils: QueryStringUtils, crypto: Crypto);
    protected notifier: EndSessionNotifier | null;
    /**
     * A utility method to be able to build the EndSession request URL.
     */
    protected buildRequestUrl(configuration: EndSessionServiceConfiguration, request: EndSessionRequest): string;
    /**
     * Completes the EndSession request if necessary & when possible.
     */
    completeEndSessionRequestIfPossible(): Promise<void>;
    /**
     * Sets the default EndSession Service notifier.
     */
    setEndSessionNotifier(notifier: EndSessionNotifier): EndSessionRequestHandler;
    /**
     * Makes an EndSession request.
     */
    abstract performEndSessionRequest(configuration: EndSessionServiceConfiguration, request: EndSessionRequest): void;
    /**
     * Checks if an EndSession flow can be completed, and completes it.
     * The handler returns a `Promise<EndSessionRequestResponse>` if ready, or a `Promise<null>`
     * if not ready.
     */
    protected abstract completeEndSessionRequest(): Promise<EndSessionRequestResponse | null>;
}
