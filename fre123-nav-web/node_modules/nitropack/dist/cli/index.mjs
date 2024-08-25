#!/usr/bin/env node
import { defineCommand, runMain } from 'citty';
import { n as nitroPkg } from '../shared/nitro.fbb67b25.mjs';

const main = defineCommand({
  meta: {
    name: nitroPkg.name,
    description: "Nitro CLI",
    version: nitroPkg.version
  },
  subCommands: {
    dev: () => import('../chunks/dev.mjs').then((r) => r.default),
    build: () => import('../chunks/build.mjs').then((r) => r.default),
    prepare: () => import('../chunks/prepare.mjs').then((r) => r.default)
  }
});
runMain(main);
