mdlr('[html]blog-post-section-text-right', m => {

  m.html`
  <img src="{url}" />
  <p>{text}</p>
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