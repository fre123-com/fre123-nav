import { parse, compileScript } from '@vue/compiler-sfc';
import MagicString from 'magic-string';

function supportScriptName(code, id) {
  let s;
  const str = () => s || (s = new MagicString(code));
  const { descriptor } = parse(code);
  if (!descriptor.script && descriptor.scriptSetup) {
    const result = compileScript(descriptor, { id });
    const name = result.attrs.name;
    const lang = result.attrs.lang;
    if (name) {
      str().appendLeft(0, `<script ${lang ? `lang="${lang}"` : ""}>
import { defineComponent } from 'vue'
export default defineComponent({
  name: '${name}',
})
<\/script>
`);
    }
    return {
      map: str().generateMap(),
      code: str().toString()
    };
  } else {
    return null;
  }
}

const index = (options = {}) => {
  return {
    name: "vite:setup-name-support",
    enforce: "pre",
    async transform(code, id) {
      if (!/\.vue$/.test(id)) {
        return null;
      }
      const { name = true } = options;
      if (name) {
        return supportScriptName.call(this, code, id);
      }
      return null;
    }
  };
};

export { index as default };
