mdlr('[html]blog-overview-item', m => {

  m.html`
  <h1>{title}</h1><h2>{tldr}</h2>
  <a href={'#'+slug}>more...</a>
  {#each tag in tags}<li>{tag}</li>{/each}`;

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

  a {
    all: unset;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: inherit;
    color: #777;
    text-decoration-color: #bbb;
    font-size: 0.8em;
  }`;

  return class {
    title = null;
    tldr = null;
    slug = null;
    tags = null;
  }

})