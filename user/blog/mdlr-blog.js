mdlr('[html]mdlr-blog', m => {

  const { blog } = m.require('mdlr-posts');

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
    blog = blog;
    post = null;
    options = null;

    constructor() {
      this.router(window.location.href);
      if (!window.location.hash != this.hash) window.location = this.hash;
    }

    connected() {
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
    }

    router(newURL) {
      const url = new URL(newURL);
      const [hash, search] = url.hash.split('?');

      const options = new URLSearchParams(search);
      this.options = [...options].reduce((a, [key, value]) => {
        a[key] = value;
        return a;
      }, {});

      this.hash = hash || '#/';

      if (this.hash.startsWith('#/post/')) {
        // search based on slug...
        const slug = this.hash.replace('#/post/', '');
        const post = this.blog.find(post => post.meta.slug === slug);
        // console.log(slug, post);
        this.post = post;
      }
    }
  }

})