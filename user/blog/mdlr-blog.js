mdlr('[unit]markdown', m => {

  const { $www } = m.require('www-root');

  const whiteSpaceRegEx = /(^\s*)|(\s*$)/mg;
  const linebreakReqEx = /\u0020{2,4}\n/mg;
  const headingReqEx = /^\u0020{0,3}(?<heading>#{1,6})\u0020*(?<text>[^\n]*)/g;
  const linkReqEx = /\[(?<text>[^\]]*)\]\((?<href>[^\)]*)\)/g;
  const inlineReqEx = /!\[(?<text>[^\]]*)\]\((?<href>[^\)\|]*)(?:\|(?<props>[^\)]*))?\)/g;
  const emphasisRegEx = /(\*{1,3})([^*]+)(\*{1,3})/g;
  const strikeRegEx = /(~{1,2})([^~]+)(~{1,2})/g;
  const scriptRegEx = /(\^{1,2})([^^]+)(\^{1,2})/g;

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

  function linebreakReplacer(match) {
    const breaks = (match.length - 1) >> 1;
    return '<br>'.repeat(breaks);
  }

  function headingReplacer(match, p1, p2) {
    return `<h${p1.length}>${p2.trim()}</h${p1.length}>`;
  }

  function linkReplacer(match, p1, p2) {
    return `<a href="${p2}">${p1}</a>`;
  }

  function inlineReplacer(match, p1, p2, p3) {
    if (p2.startsWith('$www/')) {
      p2 = p2.replace('$www/', $www);
    }

    if (p2.endsWith('.png')) return `<img alt="${p1}" src="${p2}" ${p3 || ''}/>`;
    if (p2.startsWith('mdlr:')) return `<iframe id="${p1}" src="${p2.replace('mdlr:', 'https:')}" sandbox="allow-scripts" ${p3 || ''}></iframe>`;
    return `<iframe id="${p1}" src="${p2}" sandbox="allow-scripts" ${p3 || ''}></iframe>`;
  }

  function md(strings, ...values) {
    return String
      .raw({ raw: strings }, ...values)
      .replace(inlineReqEx, inlineReplacer)
      .replace(linebreakReqEx, linebreakReplacer)
      .replace(whiteSpaceRegEx, '')
      .replace(headingReqEx, headingReplacer)
      .replace(emphasisRegEx, emphasisReplacer)
      .replace(strikeRegEx, strikeReplacer)
      .replace(scriptRegEx, scriptReplacer)
      .replace(linkReqEx, linkReplacer)
  }
  return { md };

})

mdlr('[unit]www-root', m => {

  const $www = window.location.pathname === '/bundler/html' ? `${window.location.origin}/docs/` : window.location.href.split('#')[0];

  return { $www };

})

mdlr('[html]router-link', m => {

  m.html`<a href={} on={click}>{text}</a>`;

  m.css``;

  return class {
    text = null;
    href = null;

    click(e) {
      m.redirect(this.href);
    }
  }

})

mdlr('[html]mdlr-blog', m => {

  const { $www } = m.require('www-root');

  m.require('[html]blog-overview');
  m.require('[html]blog-post');

  m.html`
  <header>header</header>
  {#if hash === '#/'}
    <blog-overview{=} />
  {:else}
    <blog-post{=post} />
  {/if}
  <footer>footer</footer>`

  m.css`
  :root {
    display:flex;
    flex-direction: column;
    width: 60vw;
    height: 100%;
    transform: translate(20vw,0);
    align-items: center;
  }
  blog-post, blog-overview {
    width: 60vw;
    flex: 1;
    overflow: hidden;
  }
  header, footer {
    width: 100%;
    background-color: #ccc;
    flex: none;
    text-align: center;
    line-height: 3vh;
    height: 3vh;
  }`;

  return class {
    hash = '#/';
    blog = [];
    post = null;
    // options = null;

    constructor() {
      this.router(window.location.href);
      if (!window.location.hash != this.hash) window.location = this.hash;

    }

    async connected() {
      document.body.style.cssText = `
        height: 100vh;
        overflow-y: hidden;
        position: absolute;
      `;
      // primitive router
      window.addEventListener('hashchange', e => {
        this.router(e.newURL);
        m.redraw(this);
      });

      this.blog = await fetch(`${$www}/all.json`).then(r => r.json());
      m.redraw(this);
    }

    router(newURL) {
      const url = new URL(newURL);
      const [hash, search] = url.hash.split('?');

      // const options = new URLSearchParams(search);
      // this.options = [...options].reduce((a, [key, value]) => {
      //   a[key] = value;
      //   return a;
      // }, {});

      this.hash = hash || '#/';

      if (this.hash.startsWith('#/post/')) {
        // search based on slug...
        const slug = this.hash.replace('#/', '');
        const post = this.blog.find(post => post.meta.slug === slug);
        // console.log(slug, post);
        this.post = post;
        if (!this.post) this.hash = '#/';
      }
    }
  }

})