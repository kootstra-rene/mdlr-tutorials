mdlr('[unit]markdown', m => {
  const { $raw } = m.require('www-root');

  const whiteSpaceRegEx = /(^\s*)|(\s*$)/mg;
  const linebreakReqEx = /\u0020{2,4}\n/mg;
  const headingReqEx = /^\u0020{0,3}(#{1,6})\u0020*([^\n]*)/mg;
  const inlineReqEx = /(\\?)(!?)\[([^\]]*)\]\(([^\)\|]*)(?:\|([^\)]*))?\)/g;
  const emphasisRegEx = /(\*{1,3})([^*]+)(\*{1,3})/g;
  const strikeRegEx = /(~{1,2})([^~]+)(~{1,2})/g;
  const scriptRegEx = /(\^{1,2})([^^]+)(\^{1,2})/g;
  const codeRegEx = /((?:\\?)`{3,3})((?:[^`]+?|`)*?)(`{3,3})|((?:\\?)`([^`]+)`)/mg;

  const bulletReqEx = /^(\u0020{0,6})([-][\u0020]*)([^\n]*)/mg;

  const emphasis = { otag: ['<i>', '<b>', '<b><i>'], etag: ['</i>', '</b>', '</i></b>'] };
  const strike = { otag: ['<u>', '<s>'], etag: ['</u>', '</s>'] };
  const script = { otag: ['<sub>', '<sup>'], etag: ['</sub>', '</sup>'] };

  function emphasisReplacer(match, p1, p2, p3) {
    if (p1.length !== p3.length) return match;
    const type = p1.length - 1;
    return `${emphasis.otag[type]}${p2}${emphasis.etag[type]}`;
  }

  function strikeReplacer(match, p1, p2, p3) {
    if (p1.length !== p3.length) return match;
    const type = p1.length - 1;
    return `${strike.otag[type]}${p2}${strike.etag[type]}`;
  }

  function scriptReplacer(match, p1, p2, p3) {
    if (p1.length !== p3.length) return match;
    const type = p1.length - 1;
    return `${script.otag[type]}${p2}${script.etag[type]}`;
  }

  function escape(t) {
    return t.replace(/</g, '&lt;').replace(/\u0020/g, '&nbsp;')
  }
  function codeReplacer(match, p1, p2, p3, p4) {
    if (p4?.length) {
      if (p4[0] === '\\') return match.slice(1);
      return `<code>${p4.slice(1, p4.length - 1)}</code>`;
    }
    if (p1[0] === '\\') return escape(match.slice(1));
    return `<pre>${escape(p2)}</pre>`;
  }

  function linebreakReplacer(match) {
    const breaks = (match.length - 1) >> 1;
    return '<br>'.repeat(breaks);
  }

  function headingReplacer(match, p1, p2) {
    return `<h${p1.length}>${p2.trim()}</h${p1.length}>`;
  }

  function bulletReplacer(match, p1, p2, p3) {
    return `<li style="padding-left:${(p1.length >> 1)}em">${p3}</li>`;
  }

  function inlineReplacer(match, ...args) {
    let [esc, show, name, href, props] = args;
    if (href.startsWith('link:')) return `<a href="${href.slice(5)}" onclick="const { hash, href } = globalThis.location; globalThis.location.href = href.replace(hash, ${href.slice(5)});">${name}</a>`;
    href = href.replace('#', $raw);
    if (!show) return `<a href="${href}">${name}</a>`;

    if (esc) return `\`${match.slice(1)}\``;
    if (href.endsWith('.png')) return `<img alt="${name}" src="${href}" ${props || ''}/>`;
    if (href.startsWith('mdlr:')) return `<iframe title="${name}" src="${href.replace('mdlr:', 'https:')}" ${props || ''}></iframe>`;
    return `<iframe title="${name}" src="${href}" sandbox="allow-scripts allow-same-origin" ${props || ''}></iframe>`;
  }

  function md(strings, ...values) {
    return String
      .raw({ raw: strings }, ...values)
      .replace(inlineReqEx, inlineReplacer)
      .replace(bulletReqEx, bulletReplacer)
      .replace(headingReqEx, headingReplacer)
      .replace(emphasisRegEx, emphasisReplacer)
      .replace(strikeRegEx, strikeReplacer)
      .replace(scriptRegEx, scriptReplacer)
      .replace(codeRegEx, codeReplacer)
      .replace(linebreakReqEx, linebreakReplacer)
      .replace(whiteSpaceRegEx, '');
  }
  return { md };

})

mdlr('[unit]www-root', m => {

  const loc = window.location;

  if (loc.pathname.indexOf('/app/html') === 0) {
    return { $raw: `${loc.origin}/docs`, $root: loc.href.replace(loc.hash, '') }
  }
  else if (loc.pathname === '/bundler/html') {
    return { $raw: `${loc.origin}/docs`, $root: loc.href.replace(loc.hash, '') }
  }
  else {
    return { $raw: loc.href.split('#')[0], $root: loc.href.replace(loc.hash, '') }
  }

  return { $root, $raw };

})

mdlr('[html]mdlr-blog', m => {

  const { Router } = m.require('core:router');

  const { $root, $raw } = m.require('www-root');

  m.require('[html]blog-overview');
  m.require('[html]blog-post');

  m.html`
  <header><a href="${$root}"><img src="${$raw}/resources/mdlr.svg"/></a></header>
  {#if !post}
    <blog-overview{=} />
  {:else}
    <blog-post{=post} />
  {/if}
  <footer><a href="https://github.com/kootstra-rene/mdlr-tutorials"><img src="${$raw}/resources/github.png" /></a></footer>`

  m.css`
  :root {
    display:flex;
    flex-direction: column;
    width: 80vw;
    height: 100%;
    transform: translate(10vw,0);
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 6px 32px 0px, rgba(0, 0, 0, 0.6) 0px 6px 16px 0px;
    background-color: #fff;
  }
  blog-post, blog-overview {
    width: 80vw;
    flex: 1;
    overflow: hidden;
  }
  header, footer {
    width: 100%;
    background-color: #ccc;
    flex: none;
    text-align: center;
    line-height: 2em;
    height: 2em;
    overflow: hidden;
  }
  header > a {
    display: inline-block;
    height: 100%;
  }
  header > a > img {
    aspect-ratio: 2/1;
    height: 100%;
  }

  footer {
    line-height: 1.6em;
    height:1.6em;
  }
  
  footer > a > img {
    position:relative;
    top: 0.2em;
    height:1.2em;
  }`;

  return class {
    blog = [];
    post = null;
    #router = new Router();

    constructor() {
      this.#router.get('/', () => {
        this.post = null;
        m.redraw(this);
      })

      this.#router.get('/posts/:slug', ({ path }) => {
        this.post = this.blog.find(p => p.slug === path);
        m.redraw(this);
      })
    }

    async connected() {
      const meta = document.createElement('meta');
      meta.name = m.name;
      meta.content = "Created with mdlr";
      document.head.append(meta);

      document.title = m.name;
      document.body.style.cssText = `
        height: 100vh;
        width: 100vw;
        overflow-y: hidden;
        position: absolute;
        background-color:#666;
      `;

      this.blog = await fetch(`${$raw}/all.json`).then(r => r.json());
      this.#router.connect(window.location.href);
    }

    disconnected() {
      this.#router.disconnect();
    }
  }

})