'use strict';
globalThis.mdlr = (() => {
const m = {
names: /^(?:\[(?<t>[a-z]+)\])?(?<n>[-:a-z0-9]+)$/,
modules: new Map,
loader: new Map,
checks: new Set,
info: (name, type = 'unit') => {
const [ , t, n ] = m.names.exec(name) ?? [];
return { type:t??type, n:`[${t??type}]${n}` };
},
load: (info, context) => {
return m.loader.get(info.type)(info, context);
}
}
m.loader
.set('unit', (info, context) => {
const scope = new Modular(info, context);
const unit = m.modules.get(info.n)(scope);
// todo: move this check to static analisys
if (undefined !== unit && '[object Object]' !== Object.prototype.toString.call(unit)) {
if (!m.checks.has(info.n)) {
console.error(info, 'should return an object');
m.checks.add(info.n);
}
}
return unit;
})
.set('mdlr', m.loader.get('unit'))
.set('node', info => require(info.n.replace('[node]', '')));
class Modular {
constructor(info, context) {
this.context = context ?? {};
this.name = info.n;
if (info.type === 'mdlr') {
this.$ = k => m[k];
}
}
require(name, context) {
if (this.context[name]) {
return this.context[name];
}
const info = m.info(name);
return m.load(info, context);
}
}
return (name, context) => {
const info = m.info(name);
if (context && context.constructor === Function) {
m.modules.set(info.n, context);
}
else {
return m.load(info, context);
}
}
})()
mdlr('[html]tutorial-svg-clock', m => {
const utcOffset = (new Date()).getTimezoneOffset();
m.html`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100">
<circle class="dialplate" r="48" />
<text x="0" y="18" dominant-baseline="middle" text-anchor="middle" >{logo}</text>
{#each m in [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]}
<line class="major" y1="35" y2="45" transform="rotate({6 * m})" stroke-linecap="round" />
{#each o in [1, 2, 3, 4]}
<line class="minor" y1="42" y2="45" transform="rotate({6 * (m + o)})" stroke-linecap="round" />
{/each}
{/each}
<line class="hour" y1="2" y2="-20" transform="rotate({30 * hours + minutes / 2})" stroke-linecap="round" />
<line class="minute" y1="4" y2="-30" transform="rotate({6 * minutes + seconds / 10})" stroke-linecap="round" />
<line class="second" y1="10" y2="-38" transform="rotate({6 * seconds})" stroke-linecap="round" />
</svg>`;
m.css`:root {
position: absolute;
left: 0;
top: 0;
right:0;
bottom: 0;
}
.dialplate {
stroke: #eee;
fill: #111;
}
.major {
stroke: #666;
stroke-width: 1;
}
.minor {
stroke: #999;
stroke-width: 0.5;
}
.hour {
stroke: #555;
}
.minute {
stroke: #666;
}
.second {
stroke: #b00;
}
text {
font: bold 7px sans-serif;
fill: #999;
}
svg {
width: 100%;
height: 100%;
}`;
return class {
logo = 'mdlr';
offset = 0; // in minutes
hours = 0;
minutes = 0;
seconds = 0;
#updateTime() {
const tzOffset = (this.offset + utcOffset) * 60 * 1000;
let time = new Date(Date.now() + tzOffset);
this.hours = time.getHours();
this.minutes = time.getMinutes();
this.seconds = time.getSeconds();
m.render(this);
}
connected() {
setInterval(this.#updateTime.bind(this), 500);
this.#updateTime();
}
}
})
mdlr('[mdlr]html-loader', _ => {
const cache = new Map;
const $cache = new Map;
const { tokenizer } = _.require('html-tokenizer');
const eachRegEx = /^(?<item>[a-zA-Z0-9-]+(,\s*[a-zA-Z0-9-]+)?) in (?<member>[^}]+)$/;
const attrRegEx = /^(?<n>[a-zA-Z0-9-]*)(?<d>{(?<e>[^}:]*?)(:(?<h>[^}]*))?})?$/;
const copyRegEx = /^\{(?<code>[^}]+)\}|(?<text>.*)$/;
function defineElement(name, e, $) {
customElements.define(name, class extends HTMLElement {
#state = e.bind(new $);
connectedCallback() {
const s = this.#state;
const record = { nodes: [], $root: this, e };
$cache.set(s, record);
e.create(s, record.nodes, record.$root);
s.connected?.call(s, this);
}
disconnectedCallback() {
const s = this.#state;
e.delete(s);
$cache.delete(s);
s.disconnected?.call(s, this);
}
get $() {
return this.#state;
}
});
}
function html(strings, ...values) {
let create = 'let $i=0, $t=[]; $t[0] = $e[0] = $d.createDocumentFragment();\n';
let update = 'let $i=0;\n';
let hs = [];
const add = (c, u = true) => { create += c; if (u) update += c; }
const markup = String.raw({ raw: strings }, ...values)
for (let { id, type, data } of tokenizer(markup)) {
let code;
switch (type) {
case 'open':
const { n, e, h, d } = attrRegEx.exec(id).groups;
const isHtmlModule = cache.has(n);
const xmlns = (data.find(a => a.key === 'xmlns') ?? {}).value;
create += `$e[++$i] = $d.createElementNS(${xmlns ? `'${xmlns}'` : '($t[0].namespaceURI ?? \'http://www.w3.org/1999/xhtml\')'}, '${n}');\n`;
if (d) {
const m = (h || e) || n;
if (m[0] !== '=') {
create += `$.${m} = $e[$i].$ ?? $e[$i];\n`;
}
else {
const v = m.slice(1) || '$';
cache.get(n).keys.forEach(k => {
add(`if(${v}.${k}) $e[$i].$.${k} = ${v}.${k};\n`);
});
}
}
update += '++$i;\n';
data.forEach(({ key: k, value: v }) => {
if (k === 'on') {
let { e, h } = attrRegEx.exec(v).groups;
create += `$e[$i].addEventListener('${e}', ${h ?? e});\n`;
return;
}
if (v === '{}') v = `{${k}}`;
if (isHtmlModule) {
const g = (copyRegEx.exec(v) ?? {}).groups;
if (g.text) {
code = `$e[$i].$.${k} = \'${g.text}\';\n`;
}
if (g.code) {
const rk = (g.code || k)?.split('.')[0];
code = `$e[$i].$.${k} = ${g.code || k};\n`;
}
}
else {
code = `$e[$i].setAttribute('${k}', \`${v.replace(/\{/g, '${')}\`);\n`;
}
add(code, v.indexOf('{') !== -1);
})
create += `$t[0].append($e[$i]);\n`;
create += `$t.unshift($e[$i]);\n`;
break;
case 'text':
create += `$e[++$i] = $d.createTextNode('');\n`;
update += '++$i;\n';
code = `$e[$i].textContent = \`${data.replace(/\{/g, '${')}\`;\n`;
add(code, data.indexOf('{') !== -1);
create += `$t[0].append($e[$i]);\n`;
break;
case 'close':
add(`$t.shift();\n`, false);
break;
case 'hint':
switch (id) {
case '#each': {
const g = eachRegEx.exec(data).groups;
add(`if(${g.member}?.length){ ${g.member}.forEach((${g.item}) => {\n`);
hs.unshift(id);
} break;
case ':else':
add(`${hs[0] === '#each' ? '});' : ''}} else {\n`);
hs[0] = id;
break;
case '/each':
add(`${hs[0] === '#each' ? '});' : ''}};\n`);
hs.shift();
break;
case '#if':
hs.unshift(id);
add(`if (${data}) {\n`);
break
case ':elseif':
hs[0] = id;
add(`} else if (${data}) {\n`);
break
case '/if':
hs.shift();
add(`}\n`);
break;
case '@html':
// todo: verify html?
create += `$e[++$i] = $d.createElement('template');\n`;
update += '++$i;\n';
code = `$e[$i].innerHTML = \`\${${data}}\`;\n`;
add(code, data.indexOf('{') !== -1);
create += `$t[0].append($e[$i].content);\n`;
break;
}
break;
}
}
this.create = create;
this.update = update;
}
function css(name, strings, ...values) {
const markup = String.raw({ raw: strings }, ...values)
const block = /\s*(?<key>.+?)\s*\{(?<body>[^}]*)\}/g;
let b, style = '';
while (!!(b = block.exec(markup))) {
const { key, body } = b.groups;
const keys = key.split(',').map(a => a.trim());
keys.forEach(k => {
if (k.indexOf(':root') === 0) {
style += `${k.replace(':root', name)} {${body}}\n`;
}
else {
style += `${name} ${k} {${body}}\n`;
}
});
}
const e = document.createElement('style');
e.id = name;
e.textContent = style;
document.head.append(e);
}
_.$('loader').set('html', (i, context) => {
const name = i.n.replace('[html]', '');
if (cache.has(name)) return;
const config = {};
const m = new _.constructor(i, context);
m.html = html.bind(config);
m.css = css.bind(config, name);
const stateClass = _.$('modules').get(i.n)(m) ?? class { };
const state = new stateClass;
const names = Object.getOwnPropertyNames;
const funcs = names(stateClass.prototype);
const props = [...names(state), ...funcs].join(', ');
const functor = new Function(`//${name}\nconst $d = document, $keys = new Set([${[...names(state)].map(a => `'${a}'`).join(',')}]); return {
bind: $ => { ${funcs.map(f => `$.${f} = $.${f}.bind($);`).join('\n')}; return $; },
create: ($, $e, $root) => {\nconst {${props}} = $\n${config.create}\$root.textContent='';\$root.append($e[0]);\n},
update: ($, $e, $root) => {\nconst {${props}} = $;\n${config.update}},
delete: () => {}
}`);
const e = functor();
defineElement(name, e, stateClass);
m.redraw = $ => {
if (!$cache.has($)) return;
const { nodes, $root, e } = $cache.get($);
e.create($, nodes, $root);
}
m.render = $ => {
if (!$cache.has($)) return;
const { nodes, $root, e } = $cache.get($);
e.update($, nodes, $root);
}
m.redirect = path => {
const { hash, href } = window.location;
window.location.href = href.replace(hash, path);
}
cache.set(name, { stateClass, keys: [...names(state)] });
window.cache = cache;
})
})
mdlr('[unit]html-tokenizer', m => {
const attributesRegEx = /(?<key>[a-zA-Z0-9\-]+)=(?:"(?<value1>(?:\\"|[^"\r\n])*)"|(?<value2>(?:\\"|[^\x20>\r\n])*))/g;
const tagRegEx = /(?<space>[\s]+)(?=<|$|{)|\<\/(?<close>[^>]+)\>|\<(?<open>(?<tag>[a-z0-9-]+)({[^}]*})?)[^>]*\>|{(?<hint>[#:\/@][a-z]+)[\s]*(?<body>({[^}]*}|[^{}]*)*)}|(?<text>[^<]+)/g;
function getAttributes(match) {
return [...match.matchAll(attributesRegEx)].map(a => a.groups).map(a => ({ key: a.key, value: (a.value1 ?? a.value2) }));
}
function* tokenizer(html) {
tagRegEx.lastIndex = 0;
const $ = (id, type, data = null) => ({ id, type, data });
let m;
while (null != (m = tagRegEx.exec(html))) {
const { space, close, open, tag, hint, body, text } = m.groups;
if (open) {
yield $(open, 'open', getAttributes(m[0]));
if (m[0].endsWith('/>')) {
yield $(open, 'close');
}
}
else if (close) {
yield $(close, 'close');
}
else if (space) {
yield $(null, 'space', space);
}
else if (text) {
yield $(null, 'text', text);
}
else if (hint) {
yield $(hint, 'hint', body);
}
}
}
return { tokenizer };
})
mdlr('[mdlr]html-loader');
mdlr('[html]tutorial-svg-clock'); document.body.innerHTML = '<tutorial-svg-clock></tutorial-svg-clock>';