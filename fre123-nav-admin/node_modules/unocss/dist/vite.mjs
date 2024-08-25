import VitePlugin__default from '@unocss/vite';
export * from '@unocss/vite';
import presetUno__default from '@unocss/preset-uno';

function UnocssVitePlugin(configOrPath) {
  return VitePlugin__default(
    configOrPath,
    {
      presets: [
        presetUno__default()
      ]
    }
  );
}

export { UnocssVitePlugin as default };
