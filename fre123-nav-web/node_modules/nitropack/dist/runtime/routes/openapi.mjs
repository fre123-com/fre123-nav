import { eventHandler } from "h3";
import { handlersMeta } from "#internal/nitro/virtual/server-handlers";
export default eventHandler((event) => {
  return {
    openapi: "3.0.0",
    info: {
      title: "Nitro Server Routes",
      version: null
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
        variables: {}
      }
    ],
    schemes: ["http"],
    paths: getPaths()
  };
});
function getPaths() {
  const paths = {};
  for (const h of handlersMeta) {
    const { route, parameters } = normalizeRoute(h.route);
    const tags = defaultTags(h.route);
    const method = (h.method || "get").toLowerCase();
    const item = {
      [method]: {
        tags,
        parameters,
        responses: {
          200: { description: "OK" }
        }
      }
    };
    if (paths[route] === void 0) {
      paths[route] = item;
    } else {
      Object.assign(paths[route], item);
    }
  }
  return paths;
}
function normalizeRoute(_route) {
  const parameters = [];
  let anonymousCtr = 0;
  const route = _route.replace(/:(\w+)/g, (_, name) => `{${name}}`).replace(/\/(\*)\//g, () => `/{param${++anonymousCtr}}/`).replace(/\*\*{/, "{").replace(/\/(\*\*)$/g, () => `/{*param${++anonymousCtr}}`);
  const paramMatches = route.matchAll(/{(\*?\w+)}/g);
  for (const match of paramMatches) {
    const name = match[1];
    if (!parameters.some((p) => p.name === name)) {
      parameters.push({ name, in: "path", required: true });
    }
  }
  return {
    route,
    parameters
  };
}
function defaultTags(route) {
  const tags = [];
  if (route.startsWith("/api/")) {
    tags.push("API Routes");
  } else if (route.startsWith("/_")) {
    tags.push("Internal");
  } else {
    tags.push("App Routes");
  }
  return tags;
}
