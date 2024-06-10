mdlr('[unit]markdown', m => {
    const { $raw } = m.require('www-root');
  
    const whiteSpaceRegEx = /(^\s*)|(\s*$)/mg;
    const linebreakReqEx = /\u0020{2,4}\n/mg;
    const headingReqEx = /^\u0020{0,3}(#{1,6})\u0020*([^\n]*)/mg;
    const inlineReqEx = /(\\?)(!?)\[([^\]]*)\]\(([^\)\|]*)(?:\|([^\)]*))?\)/g;
    const emphasisRegEx = /(\*{1,3})([^*]+)(\*{1,3})/g;
    const strikeRegEx = /(~{1,2})([^~]+)(~{1,2})/g;
    const scriptRegEx = /(\^{1,2})([^^]+)(\^{1,2})/g;
    const codeRegEx = /((?:\\?)`{3,3})((?:[^`]+?|`)*?)(`{3,3})|((?:\\?)`([^`]+)`)/mg;
  
    const bulletReqEx = /^(\u0020{0,6})([-][\u0020]*)([^\n]*)/mg;
  
    const emphasis = { otag: ['<i>', '<b>', '<b><i>'], etag: ['</i>', '</b>', '</i></b>'] };
    const strike = { otag: ['<u>', '<s>'], etag: ['</u>', '</s>'] };
    const script = { otag: ['<sub>', '<sup>'], etag: ['</sub>', '</sup>'] };
  
    function emphasisReplacer(match, p1, p2, p3) {
      if (p1.length !== p3.length) return match;
      const type = p1.length - 1;
      return `${emphasis.otag[type]}${p2}${emphasis.etag[type]}`;
    }
  
    function strikeReplacer(match, p1, p2, p3) {
      if (p1.length !== p3.length) return match;
      const type = p1.length - 1;
      return `${strike.otag[type]}${p2}${strike.etag[type]}`;
    }
  
    function scriptReplacer(match, p1, p2, p3) {
      if (p1.length !== p3.length) return match;
      const type = p1.length - 1;
      return `${script.otag[type]}${p2}${script.etag[type]}`;
    }
  
    function escape(t) {
      return t.replace(/</g, '&lt;').replace(/\u0020/g, '&nbsp;')
    }
    function codeReplacer(match, p1, p2, p3, p4) {
      if (p4?.length) {
        if (p4[0] === '\\') return match.slice(1);
        return `<code>${p4.slice(1, p4.length - 1)}</code>`;
      }
      if (p1[0] === '\\') return escape(match.slice(1));
      return `<pre>${escape(p2)}</pre>`;
    }
  
    function linebreakReplacer(match) {
      const breaks = (match.length - 1) >> 1;
      return '<br>'.repeat(breaks);
    }
  
    function headingReplacer(match, p1, p2) {
      return `<h${p1.length}>${p2.trim()}</h${p1.length}>`;
    }
  
    function bulletReplacer(match, p1, p2, p3) {
      return `<li style="padding-left:${(p1.length >> 1)}em">${p3}</li>`;
    }
  
    function inlineReplacer(match, ...args) {
      let [esc, show, name, href, props] = args;
      if (href.startsWith('link:')) return `<a href="${href.slice(5)}" onclick="const { hash, href } = globalThis.location; globalThis.location.href = href.replace(hash, ${href.slice(5)});">${name}</a>`;
      href = href.replace('#', $raw);
      if (!show) return `<a href="${href}">${name}</a>`;
  
      if (esc) return `\`${match.slice(1)}\``;
      if (href.endsWith('.png')) return `<img alt="${name}" src="${href}" ${props || ''}/>`;
      if (href.startsWith('mdlr:')) return `<iframe title="${name}" src="${href.replace('mdlr:', 'https:')}" ${props || ''}></iframe>`;
      return `<iframe title="${name}" src="${href}" sandbox="allow-scripts allow-same-origin" ${props || ''}></iframe>`;
    }
  
    function md(strings, ...values) {
      return String
        .raw({ raw: strings }, ...values)
        .replace(inlineReqEx, inlineReplacer)
        .replace(bulletReqEx, bulletReplacer)
        .replace(headingReqEx, headingReplacer)
        .replace(emphasisRegEx, emphasisReplacer)
        .replace(strikeRegEx, strikeReplacer)
        .replace(scriptRegEx, scriptReplacer)
        .replace(codeRegEx, codeReplacer)
        .replace(linebreakReqEx, linebreakReplacer)
        .replace(whiteSpaceRegEx, '');
    }
    return { md };
  
  })
  