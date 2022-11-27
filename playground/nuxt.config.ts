import { defineNuxtConfig } from 'nuxt/config';
import GtmModule from '../src/module';

export default defineNuxtConfig({
  modules: [
    [
      GtmModule,
      {
        id: 'GTM-59BFMNT',
        debug: true,
      },
    ],
  ],
  gtm: {
    scriptHid: 'test',
  },
});
