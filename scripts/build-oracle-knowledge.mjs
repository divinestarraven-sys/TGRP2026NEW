import ts from 'typescript';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const app = readFileSync('src/App.tsx', 'utf8');
const imports = new Map([...app.matchAll(/const (\w+) = lazy\(\(\) => import\('\.\/pages\/([^']+)'\)\)/g)].map(m => [m[1], m[2]]));
const sections = [];
for (const [, path, component] of app.matchAll(/<Route path="([^"]+)" element=\{<(\w+) \/>\}/g)) {
  if (path === '*' || !imports.has(component) || /Confirm|Unsubscribe/.test(component)) continue;
  const filename = `src/pages/${imports.get(component)}.tsx`;
  const source = ts.createSourceFile(filename, readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const texts = [];
  function visit(node) {
    if (ts.isJsxText(node)) texts.push(node.text);
    if (ts.isStringLiteral(node) && ts.isPropertyAssignment(node.parent) && /^(title|name|description|desc|subtitle|text|label|question|answer|content|practice|meaning|principle)$/.test(node.parent.name.getText(source))) texts.push(node.text);
    ts.forEachChild(node, visit);
  }
  visit(source);
  const text = [...new Set(texts.map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean))].join('\n');
  sections.push({ title: component.replace(/([a-z])([A-Z])/g, '$1 $2'), path, text });
}
mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/oracle-knowledge.json', JSON.stringify(sections, null, 2) + '\n');
writeFileSync('supabase/functions/oracle/knowledge.json', JSON.stringify(sections) + '\n');
console.log(`Indexed ${sections.length} public pages for the Oracle.`);
