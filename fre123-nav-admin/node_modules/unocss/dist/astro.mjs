import AstroIntegrationPlugin from '@unocss/astro';
import presetUno__default from '@unocss/preset-uno';

function UnocssAstroIntegration(config) {
  return AstroIntegrationPlugin(
    config,
    {
      presets: [
        presetUno__default()
      ]
    }
  );
}

export { UnocssAstroIntegration as default };
