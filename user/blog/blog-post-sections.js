mdlr('[html]blog-post-sections', m => {

  m.require('[html]blog-post-section-text');

  m.html`<a href="https://github.com/kootstra-rene/mdlr-tutorials/tree/main/docs/{post?.slug}">edit</a><blog-post-section-text{=} />`;

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
  a {
    position:absolute;
    right:0.75em;
    top:0em;
    height: 2em;
    line-height:2em;
  }`;

  return class {
    post = null;
  } 

})