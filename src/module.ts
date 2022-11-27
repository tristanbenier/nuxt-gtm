import { fileURLToPath } from 'url';
import defu from 'defu';
import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { RuntimeConfig } from '@nuxt/schema';

const { resolve } = createResolver(import.meta.url);

export interface ModuleOptions {
  enabled?: boolean;
  debug?: boolean;
  id: string|undefined;

  scriptHid?: string;
  noscript?: boolean;
  noscriptHid?: string;
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-gtm',
    configKey: 'gtm',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    enabled: true,
    debug: false,
    id: undefined,
    scriptHid: 'gtm-script',
    noscript: true,
    noscriptHid: 'gtm-noscript',
  },
  setup (options, nuxt) {
    if (!options.enabled) {
      return;
    }

    if (!options.id) {
      throw new Error('[nuxt-gtm] "id" is not defined');
    }

    // Default runtime config
    nuxt.options.gtm = defu(nuxt.options.gtm, { ...options });
    nuxt.options.runtimeConfig.gtm = defu(nuxt.options.runtimeConfig.gtm, {
      ...nuxt.options.gtm as RuntimeConfig['gtm'],
    });

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    // Add plugin
    addPlugin(resolve(runtimeDir, 'plugin'));

    // Add composables
    addImportsDir(resolve(runtimeDir, 'composables'));
  },
});

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      gtm?: ModuleOptions
    }
  }

  interface NuxtOptions {
    gtm?: ModuleOptions
  }
};
