mdlr('blog-indexer', m => {

  const { args } = m.require('args');
  const { foreach } = m.require('foreach');
  const fs = m.require('[node]fs');

  const prologRegEx = /-{3}\n(?<head>.*)-{3}\s*(?<body>[^$]*)/s;
  const posts = [];

  function prologToJson({ head, body }, slug) {
    const object = head.split(/\n/g).filter(a => a).map(a => a.split(/\s*:\s*/g)).reduce((a, [k, v]) => { a[k] = JSON.parse(v); return a; }, {});
    if (object.type === 'code') object.body = `---\n${head}---\n${body}`;
    object.slug = slug;
    return object;
  }

  function addPostToIndexFile({ v: file }, done) {
    const slug = `${this.path}/${file}`
    console.log(slug);
    fs.readFile(slug, 'utf8', (error, body) => {
      const prolog = prologRegEx.exec(body)?.groups;
      try {
      if (prolog) posts.push(prologToJson(prolog, slug.replace('docs', ''), body));
      }
      catch(e){}
      done();
    });
  }

  args.path.forEach(path => {
    fs.readdir(path, (error, files) => {
      if (error) return console.error(error);

      foreach(files).call({path}, addPostToIndexFile, error => {
        posts.sort((a, b) => { return (b.slug).localeCompare(a.slug); });

        fs.writeFileSync(args.out[0], JSON.stringify(posts));
      })
    })
  })
})