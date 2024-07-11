import { createError, createRequiredError, defineDriver } from "./utils/index.mjs";
import { getStore, getDeployStore } from "@netlify/blobs";
import { fetch } from "ofetch";
const DRIVER_NAME = "netlify-blobs";
export default defineDriver(
  ({ deployScoped, name, ...opts }) => {
    let store;
    const getClient = () => {
      if (!store) {
        if (deployScoped) {
          if (name) {
            throw createError(
              DRIVER_NAME,
              "deploy-scoped stores cannot have a name"
            );
          }
          store = getDeployStore({ fetch, ...opts });
        } else {
          if (!name) {
            throw createRequiredError(DRIVER_NAME, "name");
          }
          store = getStore({ name: encodeURIComponent(name), fetch, ...opts });
        }
      }
      return store;
    };
    return {
      name: DRIVER_NAME,
      options: {},
      async hasItem(key) {
        return getClient().getMetadata(key).then(Boolean);
      },
      getItem: (key, tops) => {
        return getClient().get(key, tops);
      },
      getMeta(key) {
        return getClient().getMetadata(key);
      },
      getItemRaw(key, topts) {
        return getClient().get(key, { type: topts?.type ?? "arrayBuffer" });
      },
      setItem(key, value, topts) {
        return getClient().set(key, value, topts);
      },
      setItemRaw(key, value, topts) {
        return getClient().set(key, value, topts);
      },
      removeItem(key) {
        return getClient().delete(key);
      },
      async getKeys(base, tops) {
        return (await getClient().list({ ...tops, prefix: base })).blobs.map(
          (item) => item.key
        );
      },
      async clear(base) {
        const client = getClient();
        return Promise.allSettled(
          (await client.list({ prefix: base })).blobs.map(
            (item) => client.delete(item.key)
          )
        ).then(() => {
        });
      }
    };
  }
);
