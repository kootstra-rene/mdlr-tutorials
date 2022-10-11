mdlr('[html]tutorial-propagate-receiver', m => {

  m.html`<div>{one}, {two}, {three}</div>`;

  return class {
    one = null;
    two = null;
    three = null;
  }
})

mdlr('[html]tutorial-propagate', m => {

  m.require('[html]tutorial-propagate-receiver');

  m.html`<tutorial-propagate-receiver{=} />`;

  return class {
    one = 'one';
    two = 'two';
    four = 'four';
  }
})