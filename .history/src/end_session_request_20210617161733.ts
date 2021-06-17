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
import { log } from './logger';
import { StringMap } from './types';

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
    if (!this.usePkce) {
      return Promise.resolve();
    } else {
      const codeVerifier = this.crypto.generateRandom(128);
      const challenge: Promise<string | undefined> =
        this.crypto.deriveChallenge(codeVerifier).catch(error => {
          log('Unable to generate PKCE challenge. Not using PKCE', error);
          return undefined;
        });
      return challenge.then(result => {
        if (result) {
          // keep track of the code used.
          this.internal = this.internal || {};
          this.internal['code_verifier'] = codeVerifier;
          this.extras = this.extras || {};
          this.extras['code_challenge'] = result;
          // We always use S256. Plain is not good enough.
          this.extras['code_challenge_method'] = 'S256';
        }
      });
    }
  }

  /**
   * Serializes the EndSessionRequest to a JavaScript Object.
   */
  toJson(): Promise<EndSessionRequestJson> {
    (() => {
      // Always make sure that the code verifier is setup when toJson() is called.

      return {
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
      }
    })
  }
}
