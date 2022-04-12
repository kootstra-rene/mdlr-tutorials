mdlr('[html]examples-form', m => {
  m.html`
    <form action="/api/form" method="post">
      <label for="name">name:</label><input type="text" id="name" name="user_name"><br>
      <label for="mail">e-mail:</label><input type="email" id="mail" name="user_mail"><br>
      <br>
      <button type="submit">submit</button>
    </form>`;

  m.css`
    :root {
      color: white;
      background-color: #222;
      display: inline-block;
    }
    label {
      display: inline-block;
      width: 5em;
    }
  `;
})

mdlr('examples-form:router', m => {
  const { ok } = m.require('[mdlr]server-response');
  const router = m.require('[mdlr]router');
  const reader = m.require('stream-reader');

  router.post('/api/form', (stream, headers) => {
    reader(stream, (error, buffer) => {
      ok(stream, `form was submitted with: '${buffer}'`);
    });
  });

  return router;
})

mdlr('examples-form', m => {
  m.require('[mdlr]html-loader');
  m.require('[html]examples-form');

  const { setRoute } = m.require('repl:backend-api');
  const { body } = m.require('html:body');

  setRoute('examples-form:router', error => {
    body('examples-form');
  });
})