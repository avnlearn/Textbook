import type MarkdownIt from 'markdown-it';
import type { PluginSimple } from 'markdown-it';

const pandocDashPlugin: PluginSimple = (md: MarkdownIt): void => {
  md.core.ruler.after('inline', 'pandoc_typography', (state) => {
    state.tokens.forEach((token) => {
      // Pandoc logic only applies to text within standard inline elements
      if (token.type === 'inline' && token.children) {
        token.children.forEach((child) => {
          if (child.type === 'text') {
            let content = child.content;

            // 1. Triple Dash (---) -> Em-dash (—)
            // Regex handles escaping (e.g., \--- becomes ---)
            content = content.replace(/(?<!\\)---/g, '—').replace(/\\---/g, '---');

            // 2. Double Dash (--) -> En-dash (–)
            content = content.replace(/(?<!\\)--/g, '–').replace(/\\--/g, '--');

            // 3. Ellipsis (...) -> (…) 
            // Often bundled with Pandoc smart typography
            content = content.replace(/(?<!\\)\.\.\./g, '…').replace(/\\\.\.\./g, '...');

            child.content = content;
          }
        });
      }
    });
  });
};

export default pandocDashPlugin;
