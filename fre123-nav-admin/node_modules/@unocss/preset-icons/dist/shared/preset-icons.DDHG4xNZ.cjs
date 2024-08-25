'use strict';

const ofetch = require('ofetch');
const core = require('./preset-icons.De8FRNb6.cjs');

function createCDNLoader(cdnBase) {
  return core.createCDNFetchLoader(ofetch.$fetch, cdnBase);
}

exports.createCDNLoader = createCDNLoader;
