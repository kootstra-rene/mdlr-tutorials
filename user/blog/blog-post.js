mdlr('[html]blog-post', m => {

  const { $www } = m.require('www-root');

  m.require('[html]blog-post-title');
  m.require('[html]blog-post-sections');

  m.html`
  <blog-post-title title={post?.title} />
  <blog-post-sections{=} />`

  m.css`
  :root {
    display: flex;
    flex-direction: column;
  }

  blog-post-title {
    line-height: 8vh;
    height: 8vh;
    flex: none;
  }

  blog-post-sections {
    flex: 1;
  }`;

  const contentRegEx = /-{3}\n(?<head>.*)-{3}\s*(?<body>[^$]*)/s;

  function postToJson({ head, body }, slug) {
    const meta = head.split(/\n/g).filter(a => a).map(a => a.split(/\s*:\s*/g)).reduce((a, [k, v]) => { a[k] = JSON.parse(v); return a; }, {});
    return Object.assign({ slug }, meta, { body })
  }

  return class {
    slug = null;
    post = null;

    async connected() {
      const content = await fetch(`${$www}/${this.slug}`).then(r => r.text());
      this.post = this.#contentToJson(content);
      m.redraw(this);
    }

    #contentToJson(content) {
      return postToJson(contentRegEx.exec(content).groups);
    }
  }

})