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
exports.EndSessionRequestHandler = exports.BUILT_IN_PARAMETERS = exports.EndSessionNotifier = void 0;
var logger_1 = require("./logger");
/**
 * EndSession Service notifier.
 * This manages the communication of the EndSessionResponse to the 3p client.
 */
var EndSessionNotifier = /** @class */ (function () {
    function EndSessionNotifier() {
        this.listener = null;
    }
    EndSessionNotifier.prototype.setEndSessionListener = function (listener) {
        this.listener = listener;
    };
    /**
     * The EndSession complete callback.
     */
    EndSessionNotifier.prototype.onEndSessionComplete = function (request, response, error) {
        if (this.listener) {
            // complete EndSession request
            this.listener(request, response, error);
        }
    };
    return EndSessionNotifier;
}());
exports.EndSessionNotifier = EndSessionNotifier;
// TODO(rahulrav@): add more built in parameters.
/* built in parameters. */
exports.BUILT_IN_PARAMETERS = ['redirect_uri', 'client_id', 'response_type', 'state', 'scope'];
/**
 * Defines the interface which is capable of handling an EndSession request
 * using various methods (iframe / popup / different process etc.).
 */
var EndSessionRequestHandler = /** @class */ (function () {
    function EndSessionRequestHandler(utils, crypto) {
        this.utils = utils;
        this.crypto = crypto;
        // notifier send the response back to the client.
        this.notifier = null;
    }
    /**
     * A utility method to be able to build the EndSession request URL.
     */
    EndSessionRequestHandler.prototype.buildRequestUrl = function (configuration, request) {
        // build the query string
        // coerce to any type for convenience
        var requestMap = {
            'id_token_hint': request.id_token_hint,
            'client_id': request.clientId,
            'post_logout_redirect_uri': request.post_logout_redirect_uri
        };
        var query = this.utils.stringify(requestMap);
        var baseUrl = configuration.endSessionEndpoint;
        var url = baseUrl + "?" + query;
        return url;
    };
    /**
     * Completes the EndSession request if necessary & when possible.
     */
    EndSessionRequestHandler.prototype.completeEndSessionRequestIfPossible = function () {
        var _this = this;
        // call complete EndSession if possible to see there might
        // be a response that needs to be delivered.
        logger_1.log("Checking to see if there is an EndSession response to be delivered.");
        if (!this.notifier) {
            logger_1.log("Notifier is not present on EndSessionRequest handler.\n          No delivery of result will be possible");
        }
        return this.completeEndSessionRequest().then(function (result) {
            if (!result) {
                logger_1.log("No result is available yet.");
            }
            if (result && _this.notifier) {
                _this.notifier.onEndSessionComplete(result.request, result.response, result.error);
            }
        });
    };
    /**
     * Sets the default EndSession Service notifier.
     */
    EndSessionRequestHandler.prototype.setEndSessionNotifier = function (notifier) {
        this.notifier = notifier;
        return this;
    };
    ;
    return EndSessionRequestHandler;
}());
exports.EndSessionRequestHandler = EndSessionRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VuZF9zZXNzaW9uX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFNSCxtQ0FBNkI7QUFzQjdCOzs7R0FHRztBQUNIO0lBQUE7UUFDVSxhQUFRLEdBQTRCLElBQUksQ0FBQztJQWtCbkQsQ0FBQztJQWhCQyxrREFBcUIsR0FBckIsVUFBc0IsUUFBNEI7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaURBQW9CLEdBQXBCLFVBQ0ksT0FBMEIsRUFDMUIsUUFBaUMsRUFDakMsS0FBMkI7UUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLDhCQUE4QjtZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLGdEQUFrQjtBQXFCL0IsaURBQWlEO0FBQ2pELDBCQUEwQjtBQUNiLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFcEc7OztHQUdHO0FBQ0g7SUFDRSxrQ0FBbUIsS0FBdUIsRUFBWSxNQUFjO1FBQWpELFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVwRSxpREFBaUQ7UUFDdkMsYUFBUSxHQUE0QixJQUFJLENBQUM7SUFIb0IsQ0FBQztJQUt4RTs7T0FFRztJQUNPLGtEQUFlLEdBQXpCLFVBQ0ksYUFBNkMsRUFDN0MsT0FBMEI7UUFDNUIseUJBQXlCO1FBQ3pCLHFDQUFxQztRQUVyQyxJQUFJLFVBQVUsR0FBYztZQUMxQixlQUFlLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDdEMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzdCLDBCQUEwQixFQUFFLE9BQU8sQ0FBQyx3QkFBd0I7U0FDN0QsQ0FBQztRQUVGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztRQUMvQyxJQUFJLEdBQUcsR0FBTSxPQUFPLFNBQUksS0FBTyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsc0VBQW1DLEdBQW5DO1FBQUEsaUJBZ0JDO1FBZkMsMERBQTBEO1FBQzFELDRDQUE0QztRQUM1QyxZQUFHLENBQUMscUVBQXFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixZQUFHLENBQUMseUdBQ3VDLENBQUMsQ0FBQTtTQUM3QztRQUNELE9BQU8sSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNqRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLFlBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsSUFBSSxNQUFNLElBQUksS0FBSSxDQUFDLFFBQVEsRUFBRTtnQkFDM0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25GO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3REFBcUIsR0FBckIsVUFBc0IsUUFBNEI7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQUEsQ0FBQztJQWVKLCtCQUFDO0FBQUQsQ0FBQyxBQXJFRCxJQXFFQztBQXJFcUIsNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge0VuZFNlc3Npb25SZXF1ZXN0fSBmcm9tICcuL2VuZF9zZXNzaW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtFbmRTZXNzaW9uRXJyb3IsIEVuZFNlc3Npb25SZXNwb25zZX0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9yZXNwb25zZSc7XG5pbXBvcnQge0VuZFNlc3Npb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7UXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG5cbi8qKlxuICogVGhpcyB0eXBlIHJlcHJlc2VudHMgYSBsYW1iZGEgdGhhdCBjYW4gdGFrZSBhbiBFbmRTZXNzaW9uUmVxdWVzdCxcbiAqIGFuZCBhbiBFbmRTZXNzaW9uUmVzcG9uc2UgYXMgYXJndW1lbnRzLlxuICovXG5leHBvcnQgdHlwZSBFbmRTZXNzaW9uTGlzdGVuZXIgPVxuICAgIChyZXF1ZXN0OiBFbmRTZXNzaW9uUmVxdWVzdCwgcmVzcG9uc2U6IEVuZFNlc3Npb25SZXNwb25zZXxudWxsLCBlcnJvcjogRW5kU2Vzc2lvbkVycm9yfG51bGwpID0+XG4gICAgICAgIHZvaWQ7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0cnVjdHVyYWwgdHlwZSBob2xkaW5nIGJvdGggRW5kU2Vzc2lvbiByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRTZXNzaW9uUmVxdWVzdFJlc3BvbnNlIHtcbiAgcmVxdWVzdDogRW5kU2Vzc2lvblJlcXVlc3Q7XG4gIHJlc3BvbnNlOiBFbmRTZXNzaW9uUmVzcG9uc2V8bnVsbDtcbiAgZXJyb3I6IEVuZFNlc3Npb25FcnJvcnxudWxsO1xufVxuXG4vKipcbiAqIEVuZFNlc3Npb24gU2VydmljZSBub3RpZmllci5cbiAqIFRoaXMgbWFuYWdlcyB0aGUgY29tbXVuaWNhdGlvbiBvZiB0aGUgRW5kU2Vzc2lvblJlc3BvbnNlIHRvIHRoZSAzcCBjbGllbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmRTZXNzaW9uTm90aWZpZXIge1xuICBwcml2YXRlIGxpc3RlbmVyOiBFbmRTZXNzaW9uTGlzdGVuZXJ8bnVsbCA9IG51bGw7XG5cbiAgc2V0RW5kU2Vzc2lvbkxpc3RlbmVyKGxpc3RlbmVyOiBFbmRTZXNzaW9uTGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIH1cblxuICAvKipcbiAgICogVGhlIEVuZFNlc3Npb24gY29tcGxldGUgY2FsbGJhY2suXG4gICAqL1xuICBvbkVuZFNlc3Npb25Db21wbGV0ZShcbiAgICAgIHJlcXVlc3Q6IEVuZFNlc3Npb25SZXF1ZXN0LFxuICAgICAgcmVzcG9uc2U6IEVuZFNlc3Npb25SZXNwb25zZXxudWxsLFxuICAgICAgZXJyb3I6IEVuZFNlc3Npb25FcnJvcnxudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdGVuZXIpIHtcbiAgICAgIC8vIGNvbXBsZXRlIEVuZFNlc3Npb24gcmVxdWVzdFxuICAgICAgdGhpcy5saXN0ZW5lcihyZXF1ZXN0LCByZXNwb25zZSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBUT0RPKHJhaHVscmF2QCk6IGFkZCBtb3JlIGJ1aWx0IGluIHBhcmFtZXRlcnMuXG4vKiBidWlsdCBpbiBwYXJhbWV0ZXJzLiAqL1xuZXhwb3J0IGNvbnN0IEJVSUxUX0lOX1BBUkFNRVRFUlMgPSBbJ3JlZGlyZWN0X3VyaScsICdjbGllbnRfaWQnLCAncmVzcG9uc2VfdHlwZScsICdzdGF0ZScsICdzY29wZSddO1xuXG4vKipcbiAqIERlZmluZXMgdGhlIGludGVyZmFjZSB3aGljaCBpcyBjYXBhYmxlIG9mIGhhbmRsaW5nIGFuIEVuZFNlc3Npb24gcmVxdWVzdFxuICogdXNpbmcgdmFyaW91cyBtZXRob2RzIChpZnJhbWUgLyBwb3B1cCAvIGRpZmZlcmVudCBwcm9jZXNzIGV0Yy4pLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRW5kU2Vzc2lvblJlcXVlc3RIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzLCBwcm90ZWN0ZWQgY3J5cHRvOiBDcnlwdG8pIHt9XG5cbiAgLy8gbm90aWZpZXIgc2VuZCB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGUgY2xpZW50LlxuICBwcm90ZWN0ZWQgbm90aWZpZXI6IEVuZFNlc3Npb25Ob3RpZmllcnxudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQSB1dGlsaXR5IG1ldGhvZCB0byBiZSBhYmxlIHRvIGJ1aWxkIHRoZSBFbmRTZXNzaW9uIHJlcXVlc3QgVVJMLlxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkUmVxdWVzdFVybChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEVuZFNlc3Npb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEVuZFNlc3Npb25SZXF1ZXN0KSB7XG4gICAgLy8gYnVpbGQgdGhlIHF1ZXJ5IHN0cmluZ1xuICAgIC8vIGNvZXJjZSB0byBhbnkgdHlwZSBmb3IgY29udmVuaWVuY2VcblxuICAgIGxldCByZXF1ZXN0TWFwOiBTdHJpbmdNYXAgPSB7XG4gICAgICAnaWRfdG9rZW5faGludCc6IHJlcXVlc3QuaWRfdG9rZW5faGludCxcbiAgICAgICdjbGllbnRfaWQnOiByZXF1ZXN0LmNsaWVudElkLFxuICAgICAgJ3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSc6IHJlcXVlc3QucG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpXG4gICAgfTtcblxuICAgIGxldCBxdWVyeSA9IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3RNYXApO1xuICAgIGxldCBiYXNlVXJsID0gY29uZmlndXJhdGlvbi5lbmRTZXNzaW9uRW5kcG9pbnQ7XG4gICAgbGV0IHVybCA9IGAke2Jhc2VVcmx9PyR7cXVlcnl9YDtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlcyB0aGUgRW5kU2Vzc2lvbiByZXF1ZXN0IGlmIG5lY2Vzc2FyeSAmIHdoZW4gcG9zc2libGUuXG4gICAqL1xuICBjb21wbGV0ZUVuZFNlc3Npb25SZXF1ZXN0SWZQb3NzaWJsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBjYWxsIGNvbXBsZXRlIEVuZFNlc3Npb24gaWYgcG9zc2libGUgdG8gc2VlIHRoZXJlIG1pZ2h0XG4gICAgLy8gYmUgYSByZXNwb25zZSB0aGF0IG5lZWRzIHRvIGJlIGRlbGl2ZXJlZC5cbiAgICBsb2coYENoZWNraW5nIHRvIHNlZSBpZiB0aGVyZSBpcyBhbiBFbmRTZXNzaW9uIHJlc3BvbnNlIHRvIGJlIGRlbGl2ZXJlZC5gKTtcbiAgICBpZiAoIXRoaXMubm90aWZpZXIpIHtcbiAgICAgIGxvZyhgTm90aWZpZXIgaXMgbm90IHByZXNlbnQgb24gRW5kU2Vzc2lvblJlcXVlc3QgaGFuZGxlci5cbiAgICAgICAgICBObyBkZWxpdmVyeSBvZiByZXN1bHQgd2lsbCBiZSBwb3NzaWJsZWApXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlRW5kU2Vzc2lvblJlcXVlc3QoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICBsb2coYE5vIHJlc3VsdCBpcyBhdmFpbGFibGUgeWV0LmApO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAmJiB0aGlzLm5vdGlmaWVyKSB7XG4gICAgICAgIHRoaXMubm90aWZpZXIub25FbmRTZXNzaW9uQ29tcGxldGUocmVzdWx0LnJlcXVlc3QsIHJlc3VsdC5yZXNwb25zZSwgcmVzdWx0LmVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkZWZhdWx0IEVuZFNlc3Npb24gU2VydmljZSBub3RpZmllci5cbiAgICovXG4gIHNldEVuZFNlc3Npb25Ob3RpZmllcihub3RpZmllcjogRW5kU2Vzc2lvbk5vdGlmaWVyKTogRW5kU2Vzc2lvblJlcXVlc3RIYW5kbGVyIHtcbiAgICB0aGlzLm5vdGlmaWVyID0gbm90aWZpZXI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ha2VzIGFuIEVuZFNlc3Npb24gcmVxdWVzdC5cbiAgICovXG4gIGFic3RyYWN0IHBlcmZvcm1FbmRTZXNzaW9uUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEVuZFNlc3Npb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEVuZFNlc3Npb25SZXF1ZXN0KTogdm9pZDtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIEVuZFNlc3Npb24gZmxvdyBjYW4gYmUgY29tcGxldGVkLCBhbmQgY29tcGxldGVzIGl0LlxuICAgKiBUaGUgaGFuZGxlciByZXR1cm5zIGEgYFByb21pc2U8RW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZT5gIGlmIHJlYWR5LCBvciBhIGBQcm9taXNlPG51bGw+YFxuICAgKiBpZiBub3QgcmVhZHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdCgpOiBQcm9taXNlPEVuZFNlc3Npb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD47XG59XG4iXX0=