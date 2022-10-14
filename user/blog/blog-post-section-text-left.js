mdlr('[html]blog-post-section-text-left', m => {

  m.html`
  <p>{text}</p>
  <img src="{url}" />
  `;

  m.css`
  :root {
    display: flex;
  }
  p {
    flex: 80;
    text-align: justify;
  }
  img {
    flex: 20;
    min-width: 10%;
    min-height: 10%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  `;

  return class {
    url = null;
    text = null;
  } 

})