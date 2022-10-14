mdlr('[html]blog-post', m => {

  m.require('[html]blog-post-title');
  m.require('[html]blog-post-sections');

  m.html`
  <blog-post-title{=} />
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

  return class {
    title = null;
    tldr = null;
    sections = null;
  }

})