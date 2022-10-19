#!/bin/bash

getHtml() {
  curl -s --insecure 'https://localhost:8443/bundler/html?unit='$1 | gunzip | sed 's/^ *//g' > $2
}

getHtml '\[html\]mdlr-blog' docs/index.html
getHtml '\[html\]tutorial-svg-clock' docs/resources/svg-clock.html
getHtml '\[html\]tutorial-firewatch' docs/resources/firewatch.html
getHtml '\[html\]blog-particles' docs/resources/particles.html
