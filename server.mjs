import http from "node:http";
import app from "./dist/server/index.js";

const port = Number(process.env.PORT || 4173);

const server = http.createServer(async (request, response) => {
  try {
    const host = request.headers.host || `localhost:${port}`;
    const url = new URL(request.url || "/", `http://${host}`);
    const webRequest = new Request(url, {
      method: request.method,
      headers: request.headers,
    });
    const webResponse = await app.fetch(webRequest);

    response.statusCode = webResponse.status;
    webResponse.headers.forEach((value, key) => response.setHeader(key, value));
    response.end(Buffer.from(await webResponse.arrayBuffer()));
  } catch (error) {
    response.statusCode = 500;
    response.setHeader("content-type", "text/plain; charset=utf-8");
    response.end(`Local server error: ${error.message}`);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(
    `LABORATORY QUALITY THINKING MODEL (LQTM): http://127.0.0.1:${port}`,
  );
});
