mdlr('[unit]www-root', m => {

  const loc = window.location;

  if (loc.pathname.indexOf('/app/html') === 0) {
    return { $raw: `${loc.origin}/docs`, $root: loc.href.replace(loc.hash, '') }
  }
  if (loc.pathname === '/bundler/html') {
    return { $raw: `${loc.origin}/docs`, $root: loc.href.replace(loc.hash, '') }
  }
  return { $raw: loc.href.split('#')[0], $root: loc.href.replace(loc.hash, '') }

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