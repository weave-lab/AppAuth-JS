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

import { Crypto, DefaultCrypto } from './crypto_utils';

/**
 * Represents an EndSessionRequest as JSON.
 */
export interface EndSessionRequestJson {
  client_id: string;
  redirect_uri: string;
}

/**
 * Represents the AuthorizeRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
export class EndSessionRequest {
  // NOTE:
  // Both redirect_uri and state are actually optional.
  // However AppAuth is more opionionated, and requires you to use both.
  clientId: string;
  redirectUri: string;
  constructor(
    request: EndSessionRequestJson,
    private crypto: Crypto = new DefaultCrypto(),
    private usePkce: boolean = true) {
    this.clientId = request.client_id;
    this.redirectUri = request.redirect_uri;
  }

  setupCodeVerifier(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Serializes the EndSessionRequest to a JavaScript Object.
   */
  toJson(): Promise<EndSessionRequestJson> {
    // Always make sure that the code verifier is setup when toJson() is called.
    return this.setupCodeVerifier().then(() => {
      return {
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
      };
    });
  }
}
