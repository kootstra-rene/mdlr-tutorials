mdlr('[html]blog-post-section-text', m => {

  m.html`<p>{text ?? '... text ...'}</p>`

  m.css`
  :root {
    display: block;
    white-space: wrap;
    font-size: 1em;
    line-height: 1em;
    text-align: justify;
    color: #111;
    background-color: #fff;
  }
  `

  return class {
    text = null;
  } 

})