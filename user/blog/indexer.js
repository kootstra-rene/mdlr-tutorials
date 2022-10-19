mdlr('blog-indexer', m => {

  const { foreach } = m.require('foreach');
  const fs = m.require('[node]fs');

  const prologRegEx = /-{3}\n(?<head>.*)-{3}\s*(?<body>[^$]*)/s;
  const path = 'docs/posts';

  const posts = [];

  function prologToJson({head, body}, slug) {
    const object = head.split(/\n/g).filter(a=>a).map(a=>a.split(/\s*:\s*/g)).reduce((a,[k,v]) => {a[k]=JSON.parse(v);return a;}, {});
    object.slug = slug;
    return object;
  }

  function addPostToIndexFile({ v: file }, done) {
    const slug = `${path}/${file}`
    console.log(slug);
    fs.readFile(slug, 'utf8', (error, body) => {
      const prolog = prologRegEx.exec(body).groups;
      posts.push(prologToJson(prolog, slug.replace('docs/', '')));
      done();
    });
  }

  fs.readdir(path, (error, files) => {
    if (error) return console.error(error);

    foreach(files).do(addPostToIndexFile, error => {
      posts.sort((a, b) => { return (b.slug).localeCompare(a.slug); });

      fs.writeFileSync('docs/all.json', JSON.stringify(posts));
    })
  })
})