mdlr('[html]blog-post-title', m => {

  m.html`<div>{title}</div>`

  m.css`
  :root {
    display: block;
    white-space: nowrap;
    font-size: 2em;
    line-height: 2em;
    text-align: center;
    color: #111;
    background-color: #eee;
    font-weight: bold;
  }
  `

  return class {
    title = null;
  } 

})