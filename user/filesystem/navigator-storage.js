mdlr('[html]tutorial-navigator-storage', m => {

  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/storage

  m.html`
  <table>
  <tr>
    <th></th><th>name</th><th>size</th><th>type</th><th>date</th>
  </tr>
  {#each f in files}
    <tr>
      <td>x</td><td>{f.name}</td><td>{f.size}</td><td>{f.type}</td><td>{new Date(f.lastModified).toISOString()}</td>
    </tr>
  {/each}
  </table>`;

  m.style`
  display: block;
  width: 100%;

  > table {
    width: 100%;
    user-select: none;

    > tr {
      > th, > td {
        text-align: left;
        pointer-events: none;  
      }

      > td:first-child {
        pointer-events: auto;
        cursor: pointer;
        text-align: center;
      }
    }
  }`;

  return class {
    files = [];

    connected() {
      const { estimate, persist } = navigator.storage;

      document.body.style.zoom = 2 / devicePixelRatio;

      // navigator.storage.estimate()?.then(estimate => {
      //   console.log(estimate.usage, 'of', estimate.quota);
      // });

      navigator.storage.persist().then(async persistent => {
        if (persistent) {
          console.log("Storage will not be cleared except by explicit user action");
        }
        else {
          console.log("Storage may be cleared by the UA under storage pressure.");
        }

        const root = await navigator.storage.getDirectory();
        await this.#store_files(root);

        this.files = await this.#get_files(root);
        m.redraw(this);
      })
    }

    async #get_files(root, path = '', files = []) {
      for await (const [key, value] of root.entries()) {
        if (value.kind === 'directory') {
          await this.#get_files(value, `${path}/${value.name}`, files);
        }
        if (value.kind === 'file') {
          const { name, type, size, lastModified } = await value.getFile();
          files.push({ name: `${path}/${name}`, type, size, lastModified });
        }
      }
      return files;
    }

    async #store_files(root) {
      {
        const file_handle = await root.getFileHandle("draft.txt", { create: true });
        const writable = await file_handle.createWritable({ keepExistingData: true });
        await writable.write('hello world');
        await writable.close();
      }
      {
        const folder_handle = await root.getDirectoryHandle("folder", { create: true });
        const file_handle = await folder_handle.getFileHandle("draft2.txt", { create: true });
        const writable = await file_handle.createWritable({ keepExistingData: true });
        await writable.write('hello world');
        await writable.close();
      }
    }
  }

})