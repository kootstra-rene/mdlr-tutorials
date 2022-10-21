#!/bin/bash

getHtml() {
  echo $1
  curl -s --insecure 'https://localhost:8443/bundler/html?unit='$1 | gunzip | sed 's/^ *//g' > $2
}

getHtml '\[html\]mdlr-blog' docs/index.html
getHtml '\[html\]tutorial-svg-clock' docs/resources/svg-clock.html
getHtml '\[html\]tutorial-firewatch' docs/resources/firewatch.html

curl -s --insecure 'https://localhost:8443/bundler/node?unit=blog-indexer' | gunzip | node - path=docs/posts path=user out=docs/all.json

# curl -s --insecure 'https://localhost:8443/bundler/node?unit=blog-indexer' | gunzip | node - path=user out=docs/code.json
