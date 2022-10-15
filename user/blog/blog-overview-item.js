mdlr('[html]blog-overview-item', m => {

  m.require('[html]router-link');

  m.html`{title} + {meta.slug} <router-link href={href()} text="link" />`;

  m.css``;

  return class {
    title = null;
    meta = null;

    href () {
      return `#/${this.meta?.slug}`;
    }

  }

})