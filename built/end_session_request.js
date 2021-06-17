"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndSessionRequest = void 0;
var crypto_utils_1 = require("./crypto_utils");
/**
 * Represents the AuthorizeRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
var EndSessionRequest = /** @class */ (function () {
    function EndSessionRequest(request, crypto, usePkce) {
        if (crypto === void 0) { crypto = new crypto_utils_1.DefaultCrypto(); }
        if (usePkce === void 0) { usePkce = true; }
        this.crypto = crypto;
        this.usePkce = usePkce;
        this.clientId = request.client_id;
        this.post_logout_redirect_uri = request.post_logout_redirect_uri;
        this.id_token_hint = request.id_token_hint;
    }
    EndSessionRequest.prototype.setupCodeVerifier = function () {
        return Promise.resolve();
    };
    /**
     * Serializes the EndSessionRequest to a JavaScript Object.
     */
    EndSessionRequest.prototype.toJson = function () {
        var _this = this;
        // Always make sure that the code verifier is setup when toJson() is called.
        return this.setupCodeVerifier().then(function () {
            return {
                client_id: _this.clientId,
                post_logout_redirect_uri: _this.post_logout_redirect_uri,
                id_token_hint: _this.id_token_hint
            };
        });
    };
    return EndSessionRequest;
}());
exports.EndSessionRequest = EndSessionRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7OztBQUVILCtDQUFxRDtBQVdyRDs7OztHQUlHO0FBQ0g7SUFPRSwyQkFDSSxPQUE4QixFQUN0QixNQUFvQyxFQUNwQyxPQUF1QjtRQUR2Qix1QkFBQSxFQUFBLGFBQXFCLDRCQUFhLEVBQUU7UUFDcEMsd0JBQUEsRUFBQSxjQUF1QjtRQUR2QixXQUFNLEdBQU4sTUFBTSxDQUE4QjtRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztRQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQUVELDZDQUFpQixHQUFqQjtRQUNFLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILGtDQUFNLEdBQU47UUFBQSxpQkFTQztRQVJDLDRFQUE0RTtRQUM1RSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNuQyxPQUFPO2dCQUNMLFNBQVMsRUFBRSxLQUFJLENBQUMsUUFBUTtnQkFDeEIsd0JBQXdCLEVBQUUsS0FBSSxDQUFDLHdCQUF3QjtnQkFDdkQsYUFBYSxFQUFFLEtBQUksQ0FBQyxhQUFhO2FBQ2xDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7QUFqQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Q3J5cHRvLCBEZWZhdWx0Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBFbmRTZXNzaW9uUmVxdWVzdCBhcyBKU09OLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZFNlc3Npb25SZXF1ZXN0SnNvbiB7XG4gIGNsaWVudF9pZDogc3RyaW5nO1xuICBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmk6IHN0cmluZztcbiAgaWRfdG9rZW5faGludDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6ZVJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4xXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmRTZXNzaW9uUmVxdWVzdCB7XG4gIC8vIE5PVEU6XG4gIC8vIEJvdGggcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZSBhcmUgYWN0dWFsbHkgb3B0aW9uYWwuXG4gIC8vIEhvd2V2ZXIgQXBwQXV0aCBpcyBtb3JlIG9waW9uaW9uYXRlZCwgYW5kIHJlcXVpcmVzIHlvdSB0byB1c2UgYm90aC5cbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpOiBzdHJpbmc7XG4gIGlkX3Rva2VuX2hpbnQ6IHN0cmluZztcbiAgY29uc3RydWN0b3IoXG4gICAgICByZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdEpzb24sXG4gICAgICBwcml2YXRlIGNyeXB0bzogQ3J5cHRvID0gbmV3IERlZmF1bHRDcnlwdG8oKSxcbiAgICAgIHByaXZhdGUgdXNlUGtjZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICB0aGlzLmNsaWVudElkID0gcmVxdWVzdC5jbGllbnRfaWQ7XG4gICAgdGhpcy5wb3N0X2xvZ291dF9yZWRpcmVjdF91cmkgPSByZXF1ZXN0LnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTtcbiAgICB0aGlzLmlkX3Rva2VuX2hpbnQgPSByZXF1ZXN0LmlkX3Rva2VuX2hpbnQ7XG4gIH1cblxuICBzZXR1cENvZGVWZXJpZmllcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyB0aGUgRW5kU2Vzc2lvblJlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IE9iamVjdC5cbiAgICovXG4gIHRvSnNvbigpOiBQcm9taXNlPEVuZFNlc3Npb25SZXF1ZXN0SnNvbj4ge1xuICAgIC8vIEFsd2F5cyBtYWtlIHN1cmUgdGhhdCB0aGUgY29kZSB2ZXJpZmllciBpcyBzZXR1cCB3aGVuIHRvSnNvbigpIGlzIGNhbGxlZC5cbiAgICByZXR1cm4gdGhpcy5zZXR1cENvZGVWZXJpZmllcigpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgICBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmk6IHRoaXMucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpLFxuICAgICAgICBpZF90b2tlbl9oaW50OiB0aGlzLmlkX3Rva2VuX2hpbnRcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==