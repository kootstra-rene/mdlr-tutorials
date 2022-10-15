mdlr('[html]blog-post-section-no-text', m => {

  m.html`<img src="{url}"/>`;

  m.css`
  :root {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  img {
    max-width: 100%;
    height: 100%;
    width: 100%;
  }`;

  return class {
    url = null;
  } 

})