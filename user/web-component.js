mdlr('[html]web-component', m => {

  m.html`<span>hello world!</span>`;

})

mdlr('[html]web-component-css', m => {
  m.html`<span>Hello world!</span>`;
  
  m.css`span {
    display: block;
    text-align: center;
    font-weight: bold;
  }`;
})

mdlr('[html]web-component-state', m => {
  m.html`<span>Hello world{bang}</span>`;
  
  return class {
    bang = '!!!';
  };
})

mdlr('[html]web-component-css-state', m => {
  m.html`<span>Hello world{bang}</span>`;
  
  m.css`span {
    display: block;
    text-align: center;
    font-weight: bold;
  }`;

  return class {
    bang = '!!!';
  };
})