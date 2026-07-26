import { mkdir, rm, writeFile } from "node:fs/promises";
import app from "../dist/server/index.js";

const outputDir = new URL("../docs/", import.meta.url);
const basePath = (process.env.PAGES_BASE || "/audit_hub_demo").replace(
  /\/$/,
  "",
);
const routes = ["/", "/dashboard", "/capa/2", "/capa/3", "/capa/5"];

await rm(outputDir, { recursive: true, force: true });

for (const route of routes) {
  const response = await app.fetch(
    new Request(`https://pages.local${route}`),
  );
  let html = await response.text();

  // GitHub project Pages sites are served below /<repository-name>/.
  html = html.replaceAll('href="/', `href="${basePath}/`);

  const routeDirectory =
    route === "/" ? outputDir : new URL(`.${route}/`, outputDir);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(new URL("index.html", routeDirectory), html, "utf8");
}

await writeFile(new URL(".nojekyll", outputDir), "", "utf8");

console.log(`Generated ${routes.length} GitHub Pages routes in docs/`);
