import WebpackPlugin__default from '@unocss/webpack';
export * from '@unocss/webpack';
import presetUno__default from '@unocss/preset-uno';

function UnocssWebpackPlugin(configOrPath) {
  return WebpackPlugin__default(
    configOrPath,
    {
      presets: [
        presetUno__default()
      ]
    }
  );
}

export { UnocssWebpackPlugin as default };
