# Axios `AxiosRequestConfig` — Full Reference

Every option available on an Axios request config object, what it does, and when you'd actually reach for it.

---

## `url`
The request URL. Combined with `baseURL` unless it's already absolute.

```ts
axios({ url: '/users/1' })
```
Practical use: rarely set directly — usually implied by `axios.get(url)` etc. Useful in generic request wrappers that build config objects dynamically (e.g., a retry queue that replays a stored config).

---

## `method`
HTTP method (`'get'`, `'post'`, `'put'`, `'delete'`, `'patch'`, etc.). Defaults to `GET`.

Practical use: building a single generic `apiRequest(config)` function used by all services instead of separate `.get`/`.post` calls, so method becomes data (e.g., driven by a config-driven CRUD table).

---

## `baseURL`
Prepended to `url` unless `url` is absolute.

```ts
const api = axios.create({ baseURL: 'https://api.splitwise-clone.com' });
```
Practical use: environment-specific API hosts — `import.meta.env.VITE_API_URL` in dev vs. prod, or pointing at a mock server in tests without editing every call site.

---

## `allowAbsoluteUrls`
Controls whether an absolute `url` is allowed to override `baseURL` (added to guard against SSRF-style config confusion). When `false`, an absolute URL is rejected/normalized against `baseURL` instead of replacing it.

Practical use: security hardening in apps that accept a partial user-controlled path and forward it to axios — prevents a malicious `url: 'http://evil.com'` from bypassing your intended `baseURL`.

---

## `transformRequest`
Function (or array of functions) that mutates outgoing `data` before it's sent, before headers are set.

```ts
transformRequest: [(data, headers) => {
  headers['Content-Type'] = 'application/json';
  return JSON.stringify(camelToSnake(data));
}]
```
Practical use: converting camelCase JS objects to snake_case JSON for a backend convention, or stripping `undefined` fields before serialization.

---

## `transformResponse`
Function (or array) applied to raw response data before it's handed to `.then()`.

```ts
transformResponse: [(data) => {
  const parsed = JSON.parse(data);
  return snakeToCamel(parsed);
}]
```
Practical use: normalizing API responses (snake_case → camelCase) in one place instead of in every component/service that consumes the response.

---

## `headers`
Custom request headers, merged with defaults.

```ts
headers: { Authorization: `Bearer ${token}`, 'X-Group-Id': groupId }
```
Practical use: attaching JWT auth tokens (typically via an interceptor rather than per-call), custom tenant/group IDs, or `Content-Type` overrides for file uploads (`multipart/form-data`).

---

## `params`
Object serialized into the URL query string.

```ts
axios.get('/expenses', { params: { groupId: 42, settled: false } })
```
Practical use: filtering/paginating list endpoints — e.g., fetching expenses for a specific group with query filters instead of manually building the URL string.

---

## `paramsSerializer`
Custom function/config controlling how `params` is turned into a query string (default doesn't handle arrays/nested objects consistently).

```ts
paramsSerializer: { indexes: null } // ids[]=1&ids[]=2 style
// or
paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
```
Practical use: sending array params like `?userIds=1&userIds=2` to match a specific backend's expected query format (Rails, Spring, etc. all differ).

---

## `data`
The request body (for `POST`/`PUT`/`PATCH`/`DELETE` with body).

```ts
axios.post('/expenses', { amount: 500, paidBy: userId, splitWith: [...] })
```
Practical use: the actual payload for creating/updating resources — e.g., submitting a new expense form.

---

## `timeout`
Milliseconds to wait before aborting the request with a timeout error. `0` = no timeout (default).

```ts
axios.get('/reports/heavy', { timeout: 15000 })
```
Practical use: preventing a hung request (bad network, unresponsive server) from blocking UI state indefinitely — pair with a loading spinner timeout / retry.

---

## `timeoutErrorMessage`
Custom message for the error thrown when `timeout` is exceeded.

```ts
timeout: 5000,
timeoutErrorMessage: 'Server took too long to respond. Please try again.'
```
Practical use: showing a friendlier toast message instead of Axios's default "timeout of 5000ms exceeded".

---

## `withCredentials`
Whether cross-site requests should include credentials (cookies, HTTP auth) — needed for cookie-based session auth across origins.

```ts
axios.create({ baseURL: API_URL, withCredentials: true })
```
Practical use: if your backend uses `httpOnly` session cookies instead of Bearer tokens (common for CSRF-safe auth), this is required for the browser to send/receive the cookie on cross-origin API calls.

---

## `adapter`
Overrides the transport mechanism Axios uses (default: XHR in browser, `http` module in Node). Can be a custom function or array (tried in order).

Practical use: swapping in a mock adapter for tests (`axios-mock-adapter`), or a custom adapter that logs every request/response for debugging without interceptors.

---

## `auth`
Shorthand for HTTP Basic Auth — sends an `Authorization: Basic ...` header.

```ts
auth: { username: 'admin', password: 'secret' }
```
Practical use: hitting an internal admin API or a third-party service (e.g., some webhook receivers) that only supports Basic Auth, without manually base64-encoding credentials.

---

## `responseType`
Expected response data type: `'json'` (default), `'blob'`, `'arraybuffer'`, `'text'`, `'document'`, `'stream'`.

```ts
axios.get('/expenses/export', { responseType: 'blob' })
```
Practical use: downloading a generated CSV/PDF export (expense report) and turning the blob into a downloadable file via `URL.createObjectURL`.

---

## `responseEncoding`
Encoding used to decode the response (Node only, e.g. `'utf8'`). Ignored in browsers.

Practical use: rarely touched in a frontend client; relevant for a Node-based backend service consuming a non-UTF8 API.

---

## `xsrfCookieName` / `xsrfHeaderName`
Name of the cookie holding the XSRF/CSRF token and the header Axios should copy it into.

```ts
xsrfCookieName: 'XSRF-TOKEN',
xsrfHeaderName: 'X-XSRF-TOKEN'
```
Practical use: if your backend (Django, Laravel, Rails) sets a CSRF cookie on login, Axios auto-forwards it as a header on subsequent state-changing requests — required for CSRF protection to work without manual wiring.

---

## `onUploadProgress`
Callback fired with progress events while uploading (e.g., file/form-data uploads).

```ts
onUploadProgress: (e) => setProgress(Math.round((e.loaded / (e.total ?? 1)) * 100))
```
Practical use: a progress bar when uploading a receipt image/attachment for an expense.

---

## `onDownloadProgress`
Same as above, but for downloading response data.

```ts
onDownloadProgress: (e) => setDownloadPercent((e.loaded / (e.total ?? 1)) * 100)
```
Practical use: showing progress while downloading a large exported report or attachment.

---

## `maxContentLength`
Max allowed size (bytes) of the HTTP response before Axios throws an error. Default is `-1` (no limit) in modern versions but historically defaulted small in Node.

Practical use: guarding against a runaway/misconfigured endpoint accidentally streaming gigabytes of data into memory.

---

## `maxBodyLength`
Max allowed size (bytes) of the outgoing request body (Node only).

Practical use: capping upload size client-side before even hitting the network, e.g., rejecting a receipt photo over 10MB early with a clear error.

---

## `validateStatus`
Function deciding which HTTP status codes should resolve the promise (vs. reject as an error). Default: `status >= 200 && status < 300`.

```ts
validateStatus: (status) => status < 500 // treat 4xx as resolved, not thrown
```
Practical use: handling `404`/`409` as normal resolved responses (e.g., "expense not found") in the `.then()` branch instead of a try/catch, when you want to inspect the body without exception handling.

---

## `maxRedirects`
Max number of redirects to follow before erroring (Node only; browsers handle redirects natively). `0` disables following redirects.

Practical use: detecting/blocking unexpected redirect chains from a proxied API (potential misconfiguration or security concern).

---

## `maxRate`
Caps upload/download rate in bytes/sec — either a single number or `[uploadRate, downloadRate]`.

Practical use: throttling large file uploads/downloads client-side (Node context) to avoid saturating bandwidth, e.g., in a batch-import CLI tool.

---

## `beforeRedirect`
Node-only hook invoked before following a redirect; lets you inspect/modify the redirect target and headers.

Practical use: stripping the `Authorization` header before following a redirect to a different host, to avoid leaking a bearer token to an untrusted third-party redirect target.

---

## `socketPath`
Unix socket path to use instead of a host/port (Node only) — connects directly to a service listening on a Unix domain socket.

Practical use: talking to the Docker daemon API (`/var/run/docker.sock`) or a local service exposed only over a Unix socket, common in infra/tooling scripts, not typical frontend code.

---

## `allowedSocketPaths`
Whitelist of socket paths Axios is allowed to connect to, when `socketPath` is used — a security guard against arbitrary socket access.

Practical use: locking down a Node service that accepts a dynamic `socketPath` from config so it can't be pointed at an arbitrary socket.

---

## `transport`
Custom Node `http`/`https` transport module override (advanced, rarely used directly — most people use `httpAgent`/`httpsAgent` instead).

Practical use: injecting a custom transport for testing or specialized protocols in a Node backend.

---

## `httpAgent` / `httpsAgent`
Custom Node `http.Agent`/`https.Agent` instances — control connection pooling, keep-alive, TLS options.

```ts
httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false })
```
Practical use: keep-alive connection pooling for a high-throughput backend-to-backend service, or (carefully, in dev only) disabling TLS cert validation against a self-signed internal API.

---

## `proxy`
Proxy server config (`{ host, port, auth, protocol }`) or `false` to disable proxying even if env vars like `HTTP_PROXY` are set.

```ts
proxy: { host: '127.0.0.1', port: 8080 }
```
Practical use: routing requests through a corporate proxy, or through a local debugging proxy (Charles/Fiddler/mitmproxy) to inspect API traffic during development.

---

## `cancelToken` (deprecated)
Legacy cancellation mechanism, superseded by `signal` (`AbortController`). Still supported for backward compatibility.

Practical use: only in older codebases pre-dating `AbortController` support; new code should use `signal` instead.

---

## `decompress`
Whether to automatically decompress the response body (Node only, e.g., gzip). Default `true`.

Practical use: disabling auto-decompression if you need the raw compressed bytes (e.g., proxying/forwarding the response as-is to another client).

---

## `transitional`
Options for legacy/deprecation transition behavior (e.g., `silentJSONParsing`, `forcedJSONParsing`, `clarifyTimeoutError`) — internal migration knobs, rarely touched.

Practical use: almost never set manually; exists so Axios can gradually change default parsing behavior across major versions without breaking everyone at once.

---

## `signal`
An `AbortSignal` (from `AbortController`) used to cancel the request.

```ts
const controller = new AbortController();
axios.get('/search', { params: { q }, signal: controller.signal });
// later:
controller.abort();
```
Practical use: canceling in-flight requests when a React component unmounts, or canceling a previous search-as-you-type request when the user types a new character (avoiding race conditions / stale responses).

---

## `insecureHTTPParser`
Uses Node's lenient HTTP parser, tolerating malformed headers/responses that would otherwise throw.

Practical use: interoperating with a legacy/misbehaving server that sends non-spec-compliant HTTP responses you don't control and can't fix.

---

## `env`
Lets you inject a custom `FormData` and/or `fetch` implementation — mainly for non-standard runtimes (React Native, edge/worker environments) where these aren't globally available or you want to swap the implementation.

Practical use: providing a polyfilled `FormData`/`fetch` in a runtime (e.g., certain edge functions) that lacks native support, without a global polyfill.

---

## Quick "which one do I actually need" cheat sheet (for this app)

| Goal | Option(s) |
|---|---|
| Attach JWT to every request | `headers` (via interceptor) |
| Send session cookie cross-origin | `withCredentials` |
| Filter/paginate a list endpoint | `params` |
| Upload a receipt image with progress | `data` (FormData) + `onUploadProgress` + `headers['Content-Type']` |
| Download a CSV/PDF export | `responseType: 'blob'` |
| Cancel a stale request (search-as-you-type) | `signal` + `AbortController` |
| Treat 404 as a normal response, not an error | `validateStatus` |
| Fail fast on a slow endpoint | `timeout` + `timeoutErrorMessage` |
| Point at different API per environment | `baseURL` |
| snake_case ↔ camelCase conversion | `transformRequest` / `transformResponse` |
