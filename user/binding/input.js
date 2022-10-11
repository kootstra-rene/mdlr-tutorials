mdlr('[html]tutorial-input', m => {

  m.html`<input value={content} on={input} /><div>hello, {content}</div>`;

  m.css`div { 
    color: white; 
    padding: 0.5em;
  }`;

  return class {
    content = 'default';

    input(e) {
      this.content = e.target.value;
      m.render(this);
    }
  }

})