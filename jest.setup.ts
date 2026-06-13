import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as any;
}

if (typeof global.ReadableStream === "undefined") {
  global.ReadableStream = require("stream/web").ReadableStream;
}

if (typeof global.Request === "undefined" || typeof global.fetch === "undefined") {
  const { Request, Response, Headers, fetch } = require("undici");
  if (typeof global.Request === "undefined") global.Request = Request;
  if (typeof global.Response === "undefined") global.Response = Response;
  if (typeof global.Headers === "undefined") global.Headers = Headers;
  if (typeof global.fetch === "undefined") global.fetch = fetch;
}


