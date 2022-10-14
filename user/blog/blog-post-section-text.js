mdlr('[html]blog-post-section-text', m => {

  m.html`{text ?? '... text ...'}`;

  m.css`
  :root {
    display: inline-block;
    font-size: 1.2em;
    line-height: 1.2em;
    text-align: justify;
    color: #111;
    background-color: #fff;
  }`;

  return class {
    text = null;
  } 

})