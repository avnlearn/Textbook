import type MarkdownIt from 'markdown-it';
// @ts-ignore: Suppress "Module not found" or "Circular definition" for internal types
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.js';

const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;

function createScriptRule(marker: string, tag: string) {
  const markerCode = marker.charCodeAt(0);

  // 2. Ensure the parameter is 'StateInline' (the instance type), 
  // NOT 'typeof StateInline' (the class itself).
  return (state: StateInline, silent: boolean): boolean => {
    const max = state.posMax; // Now 'posMax' will be recognized
    const start = state.pos;

    if (state.src.charCodeAt(start) !== markerCode) return false;
    if (silent) return false;
    if (start + 2 >= max) return false;

    state.pos = start + 1;
    let found = false;

    while (state.pos < max) {
      if (state.src.charCodeAt(state.pos) === markerCode) {
        found = true;
        break;
      }
      state.md.inline.skipToken(state);
    }

    if (!found || start + 1 === state.pos) {
      state.pos = start;
      return false;
    }

    const content = state.src.slice(start + 1, state.pos);

    if (content.match(/(^|[^\\])(\\\\)*\s/)) {
      state.pos = start;
      return false;
    }

    state.posMax = state.pos;
    state.pos = start + 1;

    const token_so = state.push(`${tag}_open`, tag, 1);
    token_so.markup = marker;

    const token_t = state.push('text', '', 0);
    token_t.content = content.replace(UNESCAPE_RE, '$1');

    const token_sc = state.push(`${tag}_close`, tag, -1);
    token_sc.markup = marker;

    state.pos = state.posMax + 1;
    state.posMax = max;
    return true;
  };
}

export default function scriptPlugin(md: MarkdownIt): void {
  md.inline.ruler.after('emphasis', 'sub', createScriptRule('~', 'sub'));
  md.inline.ruler.after('emphasis', 'sup', createScriptRule('^', 'sup'));
}
