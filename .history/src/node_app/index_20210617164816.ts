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

// Represents a Node application, that uses the AppAuthJS library.

import { AuthorizationRequest } from '../authorization_request';
import { AuthorizationNotifier, AuthorizationRequestHandler } from '../authorization_request_handler';
import { AuthorizationResponse } from '../authorization_response';
import { AuthorizationServiceConfiguration } from '../authorization_service_configuration';
import { EndSessionRequest } from '../end_session_request';
import { EndSessionNotifier, EndSessionRequestHandler } from '../end_session_request_handler';
import { EndSessionServiceConfiguration } from '../end_session_service_configuration';
import { log } from '../logger';
import { NodeCrypto } from '../node_support';
import { NodeRequestor } from '../node_support/node_requestor';
import { NodeBasedHandlerAuthorization } from '../node_support/node_request_handler_authorization';
import { NodeBasedHandlerEndSession } from '../node_support/node_request_handler_end_session';
import { RevokeTokenRequest } from '../revoke_token_request';
import { GRANT_TYPE_AUTHORIZATION_CODE, GRANT_TYPE_REFRESH_TOKEN, TokenRequest } from '../token_request';
import { BaseTokenRequestHandler, TokenRequestHandler } from '../token_request_handler';
import { StringMap } from '../types';

const PORT = 8000;
const PORT2 = 8500;


/* the Node.js based HTTP client. */
const requestor = new NodeRequestor();

/* an example open id connect provider */
// const openIdConnectUrl = 'https://accounts.google.com';

// /* example client configuration */
// const clientId = '511828570984-7nmej36h9j2tebiqmpqh835naet4vci4.apps.googleusercontent.com';
// const redirectUri = `http://127.0.0.1:${PORT}`;
// const scope = 'openid';
const openIdConnectUrl = 'https://weave-admin.okta.com/oauth2/default';

/* example client configuration */
const clientId = '0oaaakd7tnWWb3cJD4h6';
const redirectUri = 'http://localhost:8000';
const scope = 'openid profile offline_access email';
export class App {
  private notifierAuthorization: AuthorizationNotifier;
  private authorizationHandler: AuthorizationRequestHandler;
  private notifierSession: EndSessionNotifier;
  private endSessionHandler: EndSessionRequestHandler;
  private tokenHandler: TokenRequestHandler;

  // state
  configuration: AuthorizationServiceConfiguration | EndSessionServiceConfiguration | undefined;

  constructor() {
    this.notifierAuthorization = new AuthorizationNotifier();
    this.authorizationHandler = new NodeBasedHandlerAuthorization(PORT);

    this.notifierSession = new EndSessionNotifier();
    this.endSessionHandler = new NodeBasedHandlerEndSession(PORT2);
    this.tokenHandler = new BaseTokenRequestHandler(requestor);
    // set notifier to deliver responses
    this.authorizationHandler.setAuthorizationNotifier(this.notifierAuthorization);
    this.endSessionHandler.setEndSessionNotifier(this.notifierSession);
    // set a listener to listen for authorization responses
    // make refresh and access token requests.
    this.notifierAuthorization.setAuthorizationListener((request, response, error) => {
      log('Authorization request complete ', request, response, error);
      if (response) {
        this.makeRefreshTokenRequest(this.configuration!, request, response)
          .then(result => this.makeAccessTokenRequest(this.configuration!, result.refreshToken!))
          .then((res) => {
            log('All done.', res)
            this.makeEndSessionRequest(res.configuration, res.response.idToken)


          });
      }
    });

    this.notifierSession.setEndSessionListener((request, response, error) => {
      log('EndSession request complete ', request, response, error);
      // if (response) {
      //   this.makeRefreshTokenRequest(this.configuration!, request, response)
      //     .then(result => this.makeAccessTokenRequest(this.configuration!, result.refreshToken!))
      //     .then(() => log('All done.'));
      // }
    });
  }

  fetchServiceConfiguration(): Promise<AuthorizationServiceConfiguration> {
    return AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl, requestor)
      .then(response => {
        log('Fetched service configuration', response);
        return response;
      });
  }

  makeAuthorizationRequest(configuration: AuthorizationServiceConfiguration) {
    // create a request
    let request = new AuthorizationRequest({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope,
      response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
      state: undefined,
      extras: { 'prompt': 'consent', 'access_type': 'offline' }
    }, new NodeCrypto());

    log('Making authorization request ', configuration, request);
    this.authorizationHandler.performAuthorizationRequest(configuration, request);
  }

  makeEndSessionRequest(configuration: EndSessionServiceConfiguration, idToken: string | undefined) {
    // create a request
    let request = new EndSessionRequest({
      client_id: clientId,
      id_token_hint: idToken,
      post_logout_redirect_uri: redirectUri,
    });

    log('Making endSession request ', configuration, request);
    this.endSessionHandler.performEndSessionRequest(configuration, request);
  }

  makeRefreshTokenRequest(
    configuration: AuthorizationServiceConfiguration,
    request: AuthorizationRequest,
    response: AuthorizationResponse) {

    let extras: StringMap | undefined = undefined;
    if (request && request.internal) {
      extras = {};
      extras['code_verifier'] = request.internal['code_verifier'];
    }

    let tokenRequest = new TokenRequest({
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
      code: response.code,
      refresh_token: undefined,
      extras: extras
    });

    return this.tokenHandler.performTokenRequest(configuration, tokenRequest).then(response => {
      log(`Refresh Token is ${response.refreshToken}`);
      return response;
    });
  }

  makeAccessTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string) {
    let request = new TokenRequest({
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: GRANT_TYPE_REFRESH_TOKEN,
      code: undefined,
      refresh_token: refreshToken,
      extras: undefined
    });

    return this.tokenHandler.performTokenRequest(configuration, request).then(response => {
      log(`Access Token is ${response.accessToken}, Id Token is ${response.idToken}`);
      return { response, configuration };
    });
  }

  makeRevokeTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string) {
    let request = new RevokeTokenRequest({ token: refreshToken });

    return this.tokenHandler.performRevokeTokenRequest(configuration, request).then(response => {
      log('revoked refreshToken');
      return response;
    });
  }
}

log('Application is ready.');
const app = new App();

app.fetchServiceConfiguration()
  .then(configuration => {
    app.configuration = configuration;
    app.makeAuthorizationRequest(configuration);
    // notifier makes token requests.
  })
  .catch(error => {
    log('Something bad happened ', error);
  });
