mdlr('[html]tutorial-todo-overview', m => {

  const { html, css } = m;

  html`
    {#each todo in todoList}
      <span>- {todo.description}</span><br/>
    {:else}
      <span>You have nothing todo.</span>
    {/each}`;

  css`
    :root {
      background-color: #111;
      white-space: pre;
      flex: 1;
      padding: 0.5em;
    }`;

  return class {
    todoList = [];

    addItem(record) {
      this.todoList.push(record);
      m.redraw(this);
    }
  }

})

mdlr('[html]tutorial-todo-input', m => {

  const { EventEmitter } = m.require('event-emitter');
  const { html, css } = m;

  html`<input{input} /><button on={click}>create</button>`;

  css`
    :root {
      padding: 0.5em;
      background-color: #333;
      display: flex;
      flex-direction: row
    }
    input {
      flex: 1;
    }
    button {
      cursor: pointer;
    }`;

  return class extends EventEmitter {
    input = null;

    click() {
      this.emit('create', { description: this.input.value });
    }
  }

})

mdlr('[html]tutorial-todo', m => {

  const { log } = m.require('html-logger');

  m.require('[html]tutorial-todo-overview');
  m.require('[html]tutorial-todo-input');

  const { html, css } = m;

  html`
    <header><h1>TODO list</h1></header>
    <tutorial-todo-input{input} />
    <tutorial-todo-overview{todoList} />`;

  css`
    :where(*) {
      box-sizing: border-box;
      user-select: none;
    }
    :root {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      color: white;
    }
    header {
      background-color: #444;
      text-align: center;
    }`;

  return class {
    input = null;
    todoList = null;

    connected() {
      this.input.subscribe('create', record => {
        log(`added '${record.description}' to list`);
        this.todoList.addItem(record);
      })
    }

  }

})