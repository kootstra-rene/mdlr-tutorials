mdlr('[html]blog-post-tldr', m => {

  m.html`<div>{tldr}</div>`

  m.css`
  :root {
    display: block;
    white-space: nowrap;
    font-size: 1.2em;
    line-height: 1.2em;
    text-align: center;
    color: #111;
    background-color: #fff;
  }
  `

  return class {
    tldr = null;
  } 

})