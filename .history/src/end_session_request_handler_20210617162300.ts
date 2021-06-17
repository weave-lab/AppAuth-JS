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

import { Crypto } from './crypto_utils';
import { EndSessionRequest } from './end_session_request';
import { EndSessionError, EndSessionResponse } from './end_session_response';
import { EndSessionServiceConfiguration } from './end_session_service_configuration';
import { log } from './logger';
import { QueryStringUtils } from './query_string_utils';
import { StringMap } from './types';


/**
 * This type represents a lambda that can take an EndSessionRequest,
 * and an EndSessionResponse as arguments.
 */
export type EndSessionListener =
  (request: EndSessionRequest, response: EndSessionResponse | null, error: EndSessionError | null) =>
    void;

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
export class EndSessionNotifier {
  private listener: EndSessionListener | null = null;

  setEndSessionListener(listener: EndSessionListener) {
    this.listener = listener;
  }

  /**
   * The EndSession complete callback.
   */
  onEndSessionComplete(
    request: EndSessionRequest,
    response: EndSessionResponse | null,
    error: EndSessionError | null): void {
    if (this.listener) {
      // complete EndSession request
      this.listener(request, response, error);
    }
  }
}

// TODO(rahulrav@): add more built in parameters.
/* built in parameters. */
export const BUILT_IN_PARAMETERS = ['redirect_uri', 'client_id', 'response_type', 'state', 'scope'];

/**
 * Defines the interface which is capable of handling an EndSession request
 * using various methods (iframe / popup / different process etc.).
 */
export abstract class EndSessionRequestHandler {
  constructor(public utils: QueryStringUtils, protected crypto: Crypto) { }

  // notifier send the response back to the client.
  protected notifier: EndSessionNotifier | null = null;

  /**
   * A utility method to be able to build the EndSession request URL.
   */
  protected buildRequestUrl(
    configuration: EndSessionServiceConfiguration,
    request: EndSessionRequest) {
    // build the query string
    // coerce to any type for convenience
    let requestMap: StringMap = {
      'redirect_uri': request.redirectUri,
      'client_id': request.clientId,
    };

    let query = this.utils.stringify(requestMap);
    let baseUrl = configuration.endSessionEndpoint;
    let url = `${baseUrl}?${query}`;
    return url;
  }

  /**
   * Completes the EndSession request if necessary & when possible.
   */
  completeEndSessionRequestIfPossible(): Promise<void> {
    // call complete EndSession if possible to see there might
    // be a response that needs to be delivered.
    log(`Checking to see if there is an EndSession response to be delivered.`);
    if (!this.notifier) {
      log(`Notifier is not present on EndSessionRequest handler.
          No delivery of result will be possible`)
    }
    return this.completeEndSessionRequest().then(result => {
      if (!result) {
        log(`No result is available yet.`);
      }
      if (result && this.notifier) {
        this.notifier.onEndSessionComplete(result.request, result.response, result.error);
      }
    });
  }

  /**
   * Sets the default EndSession Service notifier.
   */
  setEndSessionNotifier(notifier: EndSessionNotifier): EndSessionRequestHandler {
    this.notifier = notifier;
    return this;
  };

  /**
   * Makes an EndSession request.
   */
  abstract performEndSessionRequest(
    configuration: EndSessionServiceConfiguration,
    request: EndSessionRequest): void;

  /**
   * Checks if an EndSession flow can be completed, and completes it.
   * The handler returns a `Promise<EndSessionRequestResponse>` if ready, or a `Promise<null>`
   * if not ready.
   */
  protected abstract completeEndSessionRequest(): Promise<EndSessionRequestResponse | null>;
}
