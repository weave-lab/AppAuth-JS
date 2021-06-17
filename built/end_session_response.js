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
exports.EndSessionError = exports.EndSessionResponse = void 0;
/**
 * Represents the Authorize Response type.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.2
 */
var EndSessionResponse = /** @class */ (function () {
    function EndSessionResponse(response) {
        this.code = response.code;
        this.state = response.state;
    }
    EndSessionResponse.prototype.toJson = function () {
        return { code: this.code, state: this.state };
    };
    return EndSessionResponse;
}());
exports.EndSessionResponse = EndSessionResponse;
/**
 * Represents the Authorize error response.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.2.1
 */
var EndSessionError = /** @class */ (function () {
    function EndSessionError(error) {
        this.error = error.error;
        this.errorDescription = error.error_description;
        this.errorUri = error.error_uri;
        this.state = error.state;
    }
    EndSessionError.prototype.toJson = function () {
        return {
            error: this.error,
            error_description: this.errorDescription,
            error_uri: this.errorUri,
            state: this.state
        };
    };
    return EndSessionError;
}());
exports.EndSessionError = EndSessionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZW5kX3Nlc3Npb25fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBb0JIOzs7O0dBSUc7QUFDSDtJQUlFLDRCQUFZLFFBQWdDO1FBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVELG1DQUFNLEdBQU47UUFDRSxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLGdEQUFrQjtBQWMvQjs7OztHQUlHO0FBQ0g7SUFNRSx5QkFBWSxLQUEwQjtRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3hDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQztJQUNKLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFyQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFbmRTZXNzaW9uUmVzcG9uc2UgYXMgYSBKU09OIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRTZXNzaW9uUmVzcG9uc2VKc29uIHtcbiAgY29kZTogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVuZFNlc3Npb25FcnJvciBhcyBhIEpTT04gb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZFNlc3Npb25FcnJvckpzb24ge1xuICBlcnJvcjogc3RyaW5nO1xuICBlcnJvcl9kZXNjcmlwdGlvbj86IHN0cmluZztcbiAgZXJyb3JfdXJpPzogc3RyaW5nO1xuICBzdGF0ZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemUgUmVzcG9uc2UgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjJcbiAqL1xuZXhwb3J0IGNsYXNzIEVuZFNlc3Npb25SZXNwb25zZSB7XG4gIGNvZGU6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihyZXNwb25zZTogRW5kU2Vzc2lvblJlc3BvbnNlSnNvbikge1xuICAgIHRoaXMuY29kZSA9IHJlc3BvbnNlLmNvZGU7XG4gICAgdGhpcy5zdGF0ZSA9IHJlc3BvbnNlLnN0YXRlO1xuICB9XG5cbiAgdG9Kc29uKCk6IEVuZFNlc3Npb25SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiB7Y29kZTogdGhpcy5jb2RlLCBzdGF0ZTogdGhpcy5zdGF0ZX07XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemUgZXJyb3IgcmVzcG9uc2UuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMi4xXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmRTZXNzaW9uRXJyb3Ige1xuICBlcnJvcjogc3RyaW5nO1xuICBlcnJvckRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlcnJvclVyaT86IHN0cmluZztcbiAgc3RhdGU/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZXJyb3I6IEVuZFNlc3Npb25FcnJvckpzb24pIHtcbiAgICB0aGlzLmVycm9yID0gZXJyb3IuZXJyb3I7XG4gICAgdGhpcy5lcnJvckRlc2NyaXB0aW9uID0gZXJyb3IuZXJyb3JfZGVzY3JpcHRpb247XG4gICAgdGhpcy5lcnJvclVyaSA9IGVycm9yLmVycm9yX3VyaTtcbiAgICB0aGlzLnN0YXRlID0gZXJyb3Iuc3RhdGU7XG4gIH1cblxuICB0b0pzb24oKTogRW5kU2Vzc2lvbkVycm9ySnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiB0aGlzLmVycm9yLFxuICAgICAgZXJyb3JfZGVzY3JpcHRpb246IHRoaXMuZXJyb3JEZXNjcmlwdGlvbixcbiAgICAgIGVycm9yX3VyaTogdGhpcy5lcnJvclVyaSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlXG4gICAgfTtcbiAgfVxufVxuIl19