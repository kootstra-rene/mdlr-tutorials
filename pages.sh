curl -s --insecure 'https://localhost:8443/bundler/html?unit=\[html\]mdlr-blog' | gunzip | sed 's/^ *//g' > docs/blog/index.html

curl -s --insecure 'https://localhost:8443/bundler/html?unit=\[html\]tutorial-svg-clock' | gunzip | sed 's/^ *//g' > docs/blog/resources/svg-clock.html

curl -s --insecure 'https://localhost:8443/bundler/html?unit=\[html\]tutorial-firewatch' | gunzip | sed 's/^ *//g' > docs/blog/resources/firewatch.html