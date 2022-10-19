mdlr('[html]blog-post-tldr', m => {

  m.html`<div>{post?.tldr ?? ''}</div>`;

  m.css`
  :root {
    display: block;
    white-space: nowrap;
    line-height: 1.2em;
    text-align: center;
    padding: 0.5em 0;
    color: #777;
    font-weight: unset;
    font-size: 1.1em;
  }`;

  return class {
    post = null;
  } 

})