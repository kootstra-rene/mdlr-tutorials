mdlr('[html]blog-overview-item', m => {


  m.html`{title} + {meta.slug} <button on={click}>link</button>`;

  m.css``;

  return class {
    title = null;
    meta = null;

    click() {
      m.redirect(`#/post/${this.meta.slug}`);
    }
  }

})