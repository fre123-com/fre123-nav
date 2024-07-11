import { destr } from 'destr';
import { nanoid } from 'nanoid';
import { resolvePath, getNuxtVersion, isNuxt3, useLogger, defineNuxtModule } from '@nuxt/kit';
import { e as ensureUserconsent, u as updateUserNuxtRc } from './shared/telemetry.023ac76b.mjs';
import { fetch } from 'ofetch';
import fs from 'fs';
import { resolve } from 'pathe';
import os from 'os';
import gitUrlParse from 'git-url-parse';
import parseGitConfig from 'parse-git-config';
import isDocker from 'is-docker';
import { provider } from 'std-env';
import { createHash } from 'crypto';
import 'consola/utils';
import 'consola';
import 'rc9';

const version = "2.5.3";

async function postEvent(endpoint, body) {
  const res = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      "user-agent": "Nuxt Telemetry " + version
    }
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
}

const build = function({ nuxt }, payload) {
  const duration = { build: payload.duration.build };
  let isSuccess = true;
  for (const [name, stat] of Object.entries(payload.stats)) {
    duration[name] = stat.duration;
    if (!stat.success) {
      isSuccess = false;
    }
  }
  return {
    name: "build",
    isSuccess,
    isDev: nuxt.options.dev || false,
    duration
    // size
  };
};

const command = function({ nuxt }) {
  let command2 = process.argv[2] || "unknown";
  const flagMap = {
    dev: "dev",
    _generate: "generate",
    _export: "export",
    _build: "build",
    _serve: "serve",
    _start: "start"
  };
  for (const _flag in flagMap) {
    const flag = _flag;
    if (nuxt.options[flag]) {
      command2 = flagMap[flag];
      break;
    }
  }
  return {
    name: "command",
    command: command2
  };
};

const generate = function generate2({ nuxt }, payload) {
  return {
    name: "generate",
    // @ts-ignore
    isExport: !!nuxt.options._export,
    routesCount: payload.routesCount,
    duration: {
      generate: payload.duration.generate
    }
  };
};

const module$1 = function({ nuxt: { options } }) {
  const events = [];
  const modules = (options._installedModules || []).filter((m) => m.meta?.version).map((m) => ({
    name: m.meta.name,
    version: m.meta.version,
    timing: m.timings?.setup || 0
  }));
  for (const m of modules) {
    events.push({
      name: "module",
      moduleName: m.name,
      version: m.version,
      timing: m.timing
    });
  }
  return events;
};

const project = function(context) {
  const { options } = context.nuxt;
  return {
    name: "project",
    type: context.git && context.git.url ? "git" : "local",
    isSSR: options.ssr !== false,
    target: options._generate ? "static" : "server",
    packageManager: context.packageManager
  };
};

const session = function({ seed }) {
  return {
    name: "session",
    id: seed
  };
};

const files = async function(context) {
  const { options } = context.nuxt;
  const nuxtIgnore = fs.existsSync(resolve(options.rootDir, ".nuxtignore"));
  const nuxtRc = fs.existsSync(resolve(options.rootDir, ".nuxtrc"));
  const appConfig = fs.existsSync(await resolvePath("~/app.config"));
  return {
    name: "files",
    nuxtIgnore,
    nuxtRc,
    appConfig
  };
};

const eventFactories = {
  __proto__: null,
  build: build,
  command: command,
  files: files,
  generate: generate,
  module: module$1,
  project: project,
  session: session
};

const FILE2PM = {
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "shrinkwrap.json": "npm",
  "pnpm-lock.yaml": "pnpm"
};
async function detectPackageManager(rootDir) {
  for (const file in FILE2PM) {
    if (fs.existsSync(resolve(rootDir, file))) {
      return FILE2PM[file];
    }
  }
  return "unknown";
}

function hash(str) {
  return createHash("sha256").update(str).digest("hex").substr(0, 16);
}

async function createContext(nuxt, options) {
  const rootDir = nuxt.options.rootDir || process.cwd();
  const git = await getGit(rootDir);
  const packageManager = await detectPackageManager(rootDir);
  const { seed } = options;
  const projectHash = await getProjectHash(rootDir, git, seed);
  const projectSession = getProjectSession(projectHash, seed);
  const nuxtVersion = getNuxtVersion(nuxt);
  const nuxtMajorVersion = isNuxt3(nuxt) ? 3 : 2;
  const nodeVersion = process.version.replace("v", "");
  const isEdge = nuxtVersion.includes("edge");
  return {
    nuxt,
    seed,
    git,
    projectHash,
    projectSession,
    nuxtVersion,
    nuxtMajorVersion,
    isEdge,
    cli: getCLI(),
    nodeVersion,
    os: os.type().toLocaleLowerCase(),
    environment: getEnv(),
    packageManager,
    concent: options.consent
  };
}
function getEnv() {
  if (provider) {
    return provider;
  }
  if (isDocker()) {
    return "Docker";
  }
  return "unknown";
}
function getCLI() {
  const entry = process.argv[1];
  const knownCLIs = {
    "nuxt-ts.js": "nuxt-ts",
    "nuxt-start.js": "nuxt-start",
    "nuxt.js": "nuxt",
    nuxi: "nuxi"
  };
  for (const _key in knownCLIs) {
    const key = _key;
    if (entry.includes(key)) {
      const edge = entry.includes("-edge") ? "-edge" : "";
      return knownCLIs[key] + edge;
    }
  }
  return "programmatic";
}
function getProjectSession(projectHash, sessionId) {
  return hash(`${projectHash}#${sessionId}`);
}
function getProjectHash(rootDir, git, seed) {
  let id;
  if (git && git.url) {
    id = `${git.source}#${git.owner}#${git.name}`;
  } else {
    id = `${rootDir}#${seed}`;
  }
  return hash(id);
}
async function getGitRemote(rootDir) {
  try {
    const parsed = await parseGitConfig({ cwd: rootDir });
    if (parsed) {
      const gitRemote = parsed['remote "origin"'].url;
      return gitRemote;
    }
    return null;
  } catch (err) {
    return null;
  }
}
async function getGit(rootDir) {
  const gitRemote = await getGitRemote(rootDir);
  if (!gitRemote) {
    return;
  }
  const meta = gitUrlParse(gitRemote);
  const url = meta.toString("https");
  return {
    url,
    gitRemote,
    source: meta.source,
    owner: meta.owner,
    name: meta.name
  };
}

const logger = useLogger("@nuxt/telemetry");

class Telemetry {
  nuxt;
  options;
  storage;
  // TODO
  _contextPromise;
  events = [];
  eventFactories = { ...eventFactories };
  constructor(nuxt, options) {
    this.nuxt = nuxt;
    this.options = options;
  }
  getContext() {
    if (!this._contextPromise) {
      this._contextPromise = createContext(this.nuxt, this.options);
    }
    return this._contextPromise;
  }
  createEvent(name, payload) {
    const eventFactory = this.eventFactories[name];
    if (typeof eventFactory !== "function") {
      logger.warn("Unknown event:", name);
      return;
    }
    const eventPromise = this._invokeEvent(name, eventFactory, payload);
    this.events.push(eventPromise);
  }
  async _invokeEvent(name, eventFactory, payload) {
    try {
      const context = await this.getContext();
      const event = await eventFactory(context, payload);
      event.name = name;
      return event;
    } catch (err) {
      logger.error("Error while running event:", err);
    }
  }
  async getPublicContext() {
    const context = await this.getContext();
    const eventContext = {};
    for (const key of [
      "nuxtVersion",
      "nuxtMajorVersion",
      "isEdge",
      "nodeVersion",
      "cli",
      "os",
      "environment",
      "projectHash",
      "projectSession"
    ]) {
      eventContext[key] = context[key];
    }
    return eventContext;
  }
  async sendEvents(debug) {
    const events = [].concat(...(await Promise.all(this.events)).filter(Boolean));
    this.events = [];
    const context = await this.getPublicContext();
    const body = {
      timestamp: Date.now(),
      context,
      events
    };
    if (this.options.endpoint) {
      const start = Date.now();
      try {
        if (debug) {
          logger.info("Sending events:", JSON.stringify(body, null, 2));
        }
        await postEvent(this.options.endpoint, body);
        if (debug) {
          logger.success(`Events sent to \`${this.options.endpoint}\` (${Date.now() - start} ms)`);
        }
      } catch (err) {
        if (debug) {
          logger.error(`Error sending sent to \`${this.options.endpoint}\` (${Date.now() - start} ms)
`, err);
        }
      }
    }
  }
}

const module = defineNuxtModule({
  meta: {
    name: "@nuxt/telemetry",
    configKey: "telemetry"
  },
  defaults: {
    endpoint: process.env.NUXT_TELEMETRY_ENDPOINT || "https://telemetry.nuxt.com",
    debug: destr(process.env.NUXT_TELEMETRY_DEBUG),
    enabled: void 0,
    seed: void 0
  },
  async setup(toptions, nuxt) {
    if (!toptions.debug) {
      logger.level = 0;
    }
    const _topLevelTelemetry = nuxt.options.telemetry;
    if (_topLevelTelemetry !== true) {
      if (toptions.enabled === false || _topLevelTelemetry === false || !await ensureUserconsent(toptions)) {
        logger.info("Telemetry disabled");
        return;
      }
    }
    logger.info("Telemetry enabled");
    if (!toptions.seed) {
      toptions.seed = hash(nanoid());
      updateUserNuxtRc("telemetry.seed", toptions.seed);
      logger.info("Seed generated:", toptions.seed);
    }
    const t = new Telemetry(nuxt, toptions);
    nuxt.hook("modules:done", async () => {
      t.createEvent("project");
      if (nuxt.options.dev) {
        t.createEvent("session");
        t.createEvent("files");
      }
      t.createEvent("command");
      t.createEvent("module");
      await nuxt.callHook("telemetry:setup", t);
      t.sendEvents(toptions.debug);
    });
  }
});

export { module as default };
