mdlr('[html]blog-overview-item', m => {

  m.require('[html]router-link');

  m.html`
  <h1>{title}</h1><h2>{tldr}</h2>
  <router-link href={href()} text="more..."/>
  {#each tag in meta.tags}<li>{tag}</li>{/each}`;

  m.css`
  :root {
    display: block;
    padding: 0 1em;
  }
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
    cursor: pointer
  }

  li + li {
    margin: 0 0 0 0.25em;
  }

  h1 {
    margin: 0;
    margin-top: 0.25em;
    font-size: 1.5em;
  }

  h2 {
    margin: 0;
    margin-bottom: 0.25em;
    color: #777;
    font-weight: unset;
    font-size: 1.1em;
  }

  router-link {
    color: #777;
    text-decoration-color: #bbb;
    font-size: 0.8em;
  }`;

  return class {
    title = null;
    tldr = null;
    meta = null;

    href() {
      return `#/${this.meta?.slug}`;
    }

  }

})