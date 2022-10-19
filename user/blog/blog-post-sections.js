mdlr('[html]blog-post-sections', m => {

  m.require('[html]blog-post-tldr');
  m.require('[html]blog-post-section-text');

  m.html`<blog-post-tldr{=} /><blog-post-section-text{=} />`;

  m.css`
  * {
    box-sizing: border-box;
    user-select: none;
    font-family: sans-serif;
  }
  :root {
    height: 100%;
    overflow-y: auto;
    display: block;
    box-shadow: 0 0 black;
  }
  
  span {
    float:right;
  }`;

  return class {
    post = null;
  } 

})