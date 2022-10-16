mdlr('[html]blog-post-title', m => {

  m.html`<div>{title}</div>`;

  m.css`
  :root {
    display: block;
    white-space: nowrap;
    font-size: 2em;
    text-align: center;
    background-color: #555;
    font-weight: bold;
    font-spacing:0.1em;
    box-shadow: inset 0 0px 50px #333;
  }
  
  div {
    color: #ffffffe0;
    text-shadow: 1px 2px 4px #000, 0 0 0 #000, 1px 2px 4px #555;
  }`;

  return class {
    title = null;
  } 

})