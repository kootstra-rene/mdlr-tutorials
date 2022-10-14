mdlr('[html]blog-post-section-text-right', m => {

  m.html`<img src="{url}"/>{text}`;

  m.css`
  :root {
    display: inline-block;
    text-align: justify;
    font-size: 1.2em;
    line-height: 1.2em;
  }
  img {
    float: left;
    width : 6em;
    height: 6em;
    padding: 0 0.6em 0.5em 0;
  }`;

  return class {
    url = null;
    text = null;
  } 

})