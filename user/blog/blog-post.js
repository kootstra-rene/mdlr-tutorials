mdlr('[html]blog-post', m => {

  m.require('[html]blog-post-title');
  m.require('[html]blog-post-tldr');
  m.require('[html]blog-post-sections');

  m.html`
  <blog-post-title{=} />
  <blog-post-tldr{=} />
  <blog-post-sections{=} />`

  return class {
    title = null;
    tldr = null;
    sections = null;
  } 

})