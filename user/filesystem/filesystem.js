mdlr('stream:dsv-splitter', m => {

  return {
    stream: (separator) => new TransformStream({
      regex: new RegExp(`(?:"([^"]*(?:""[^"]*)+)"|"([^"]*)"|([^${separator}]*?))(?:(?:${separator})|($))`, 'g'),
      start(controller) {
      },
      transform(chunk, controller) {
        const records = chunk.map(line => {
          this.regex.lastIndex = 0;
          let matches;
          const columns = [];
          while (null !== (matches = this.regex.exec(line))) {
            let quotedText = matches[1];
            let normalText = matches[2] || matches[3];
            let endOfRecord = matches[4] !== undefined;

            if (undefined !== quotedText) {
              columns.push(quotedText.replace(/""/g, '"'));
            }
            else if (undefined !== normalText) {
              columns.push(normalText);
            }

            if (endOfRecord) break;
          }
          return columns;
        })

        controller.enqueue(records);
      },
      flush(controller) {
      }
    })
  }
})

mdlr('stream:splitter', m => {

  return {
    stream: (separator) => new TransformStream({
      lastBlock: '',
      blocks: 0,
      start(controller) {
        this.lastBlock = '';
      },
      transform(chunk, controller) {
        if (!Array.isArray(chunk)) {
          const blocks = chunk.split(separator);
          blocks[0] = this.lastBlock + blocks[0];
          this.lastBlock = blocks.pop();
          this.blocks += blocks.length;

          controller.enqueue(blocks);
        }
        else {
          const blocks = chunk.map(a => a.split(separator));
          controller.enqueue(blocks);
        }
      },
      flush(controller) {
        if (this.lastBlock) {
          controller.enqueue([this.lastBlock]);
          ++this.blocks;
        }
        console.log('#blocks:', this.blocks);
      }
    })
  }
})

mdlr('stream:pipeline', m => {

  function pipeline(...args) {
    const done = args.pop();
    let stream = args.shift();
    args.filter(a => a).forEach(a => {
      stream = stream.pipeThrough(a);
    });

    stream.pipeTo(new WritableStream({
      write(chunk) {
        // console.log(chunk)
      },
      close() {
        done(null);
      },
      abort(error) {
        done(error);
      }
    }));
  }

  return { pipeline };

})

mdlr('[html]tutorial-filesystem', m => {

  const { stream: delimited } = m.require('stream:dsv-splitter');
  const { stream: splitter } = m.require('stream:splitter');
  const { pipeline } = m.require('stream:pipeline');

  m.html`
  {#if map.size < 1}
  <button on={click}>open folder</button>
  {:else}
  <div>
    {#each e in files()}
    <div><span>{e.k}</span></div>
    {/each}
  </div>
  <div>{info}</div>
  {/if}`;

  m.css`
  > div {
    display: block;
    overflow: auto;
    height: 100vh;
  }
  
  > div + div {
    position:absolute;
    right:0;
    top:0;
  }`;

  async function listEntries(handle, options) {
    const { root, map } = options;

    for await (const entry of handle.values()) {
      if (entry.name[0] === '.') continue;

      if (entry.kind === 'directory') {
        await listEntries(entry, options);
      }
      else {
        const path = await root.resolve(entry);
        map.set(path.join('/'), entry);
      }
    }
  }

  return class {
    map = new Map;
    info = '';

    connected(self) {
      const me = this;
      self.addEventListener('click', async e => {
        if (e.target.localName === 'span') {
          const name = e.target.innerText;
          me.#readFile(name);
        }
      })
    }

    async click(e) {
      const handle = await window.showDirectoryPicker({ id: 'id', mode: 'readwrite' });
      await listEntries(handle, { root: handle, map: this.map });
      m.redraw(this);
    }

    files() {
      return [...this.map].map(([k, v]) => ({ k, v }));
    }

    async #readFile(name) {
      const file = await this.map.get(name).getFile();
      const decompressor = (/\.gz$/.test(name)) ? new DecompressionStream("gzip") : null;
      const readline = splitter('\n');

      console.time(name);
      pipeline(file.stream(), decompressor, new TextDecoderStream(), readline, delimited('\t'), error => {
        console.log(error);
        console.timeEnd(name);
      });
    }
  }

})