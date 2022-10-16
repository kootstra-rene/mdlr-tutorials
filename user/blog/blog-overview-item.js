mdlr('[html]blog-overview-item', m => {

  m.require('[html]router-link');

  m.html`
  <h1>{title}</h1>
  <h3>{tldr}</h3>
  <router-link href={href()} text="more..."/>
  {#each tag in meta.tags}<li>{tag}</li>{/each}`;

  m.css`
  li {
    all: unset;
    box-sizing: border-box;
    border: 1px solid #777;
    font-size:0.8em;
    line-height: 1.0em;
    height: 1.3em;
    padding: 0 0.5em;
    border-radius: 0.9em;
    color: #777;
    float: right;
    margin: 0 0.25em;
  }

  li + li {
    margin: 0 0 0 0.25em;
  }

  router-link {
    color: #777;
    text-decoration-color: #bbb;
  }
  `;

  return class {
    title = null;
    tldr = null;
    meta = null;

    href() {
      return `#/${this.meta?.slug}`;
    }

  }

})