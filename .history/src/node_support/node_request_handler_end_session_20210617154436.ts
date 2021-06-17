/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { EventEmitter } from 'events';
import * as Http from 'http';
import * as Url from 'url';
import { AuthorizationRequest } from '../authorization_request';
import { AuthorizationRequestHandler, AuthorizationRequestResponse } from '../authorization_request_handler';
import { AuthorizationError, AuthorizationResponse } from '../authorization_response';
import { AuthorizationServiceConfiguration } from '../authorization_service_configuration';
import { Crypto } from '../crypto_utils';
import { log } from '../logger';
import { BasicQueryStringUtils, QueryStringUtils } from '../query_string_utils';
import { NodeCrypto } from './crypto_utils';
import { EndSessionServiceConfiguration } from '../end_session_service_configuration';
import { EndSessionRequest } from '../end_session_request';
import { EndSessionError, EndSessionResponse } from '../end_session_response';
import { EndSessionRequestHandler, EndSessionRequestResponse } from '../end_session_request_handler';


// TypeScript typings for `opener` are not correct and do not export it as module
import opener = require('opener');

class ServerEventsEmitter extends EventEmitter {
    static ON_UNABLE_TO_START = 'unable_to_start';
    static ON_AUTHORIZATION_RESPONSE = 'authorization_response';
    static ON_END_SESSION_RESPONSE = 'end_session_response';
}

export class NodeBasedHandlerEnd extends EndSessionRequestHandler {
    // the handle to the current authorization request
    authorizationPromise: Promise<AuthorizationRequestResponse | null> | null = null;
    endSessionPromise: Promise<EndSessionRequestResponse | null> | null = null;

    constructor(
        // default to port 8000
        public httpServerPort = 8000,
        utils: QueryStringUtils = new BasicQueryStringUtils(),
        crypto: Crypto = new NodeCrypto()) {
        super(utils, crypto);
    }


    performEndSessionRequest(
        configuration: EndSessionServiceConfiguration,
        request: EndSessionRequest) {
        // use opener to launch a web browser and start the session end flow.
        // start a web server to handle the session end response.
        const emitter = new ServerEventsEmitter();

        const requestHandler = (httpRequest: Http.IncomingMessage, response: Http.ServerResponse) => {
            if (!httpRequest.url) {
                return;
            }

            const url = Url.parse(httpRequest.url);
            const searchParams = new Url.URLSearchParams(url.query || '');

            const state = searchParams.get('state') || undefined;
            const code = searchParams.get('code');
            const error = searchParams.get('error');

            if (!state && !code && !error) {
                // ignore irrelevant requests (e.g. favicon.ico)
                return;
            }

            log('Handling End Session Request ', searchParams, state, code, error);
            let endSessionResponse: EndSessionResponse | null = null;
            let endSessionError: EndSessionError | null = null;
            if (error) {
                log('error');
                // get additional optional info.
                const errorUri = searchParams.get('error_uri') || undefined;
                const errorDescription = searchParams.get('error_description') || undefined;
                endSessionError = new EndSessionError(
                    { error: error, error_description: errorDescription, error_uri: errorUri, state: state });
            } else {
                endSessionResponse = new EndSessionResponse({ code: code!, state: state! });
            }
            const completeResponse = {
                request,
                response: endSessionResponse,
                error: endSessionError
            } as EndSessionRequestResponse;

            emitter.emit(ServerEventsEmitter.ON_END_SESSION_RESPONSE, completeResponse);
            if (error) {
                response.end("error");
            } else {
                response.end("good session end");

            }
        };

        this.endSessionPromise = new Promise<EndSessionRequestResponse>((resolve, reject) => {
            emitter.once(ServerEventsEmitter.ON_UNABLE_TO_START, () => {
                reject(`Unable to create HTTP server at port ${this.httpServerPort}`);
            });
            emitter.once(ServerEventsEmitter.ON_END_SESSION_RESPONSE, (result: any) => {
                server.close();
                // resolve pending promise
                resolve(result as EndSessionRequestResponse);
                // complete end session flow
                this.completeEndSessionRequestIfPossible();
            });
        });

        let server: Http.Server;
        request.setupCodeVerifier()
            .then(() => {
                server = Http.createServer(requestHandler);
                server.listen(this.httpServerPort);
                console.log("What is happening", request, configuration);
                const url = this.buildRequestUrl(configuration, request);
                log('Making a request to ', request, url);
                opener(url);
            })
            .catch((error) => {
                log('Something bad happened ', error);
                emitter.emit(ServerEventsEmitter.ON_UNABLE_TO_START);
            });
    }

    protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null> {
        if (!this.authorizationPromise) {
            return Promise.reject(
                'No pending authorization request. Call performAuthorizationRequest() ?');
        }

        return this.authorizationPromise;
    }
}
