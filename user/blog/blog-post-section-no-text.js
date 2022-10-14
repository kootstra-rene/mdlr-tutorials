mdlr('[html]blog-post-section-no-text', m => {

  m.html`<img src="{url}" />`;

  m.css`
  :root {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  `;

  return class {
    url = null;
  } 

})