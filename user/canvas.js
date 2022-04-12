mdlr('canvas-gradient', m => {

  m.require('[mdlr]html-loader');

  function run({context, height, width}) {
    const image = context.getImageData(0, 0, width, height);

    (function loop(now) {
      requestAnimationFrame(loop);

      const sin64 = 64 * Math.sin(now / 1000);
      const cos64 = 64 * Math.cos(now / 1400);

      for (let p = 0; p < image.data.length; p += 4) {
        const i = p / 4;
        const x = (i % width) >>> 0;
        const y = (i / height) >>> 0;

        const r = 64 + (128 * x / width) + sin64;
        const g = 64 + (128 * y / height) + cos64;
        const b = 128;

        image.data[p + 0] = r;
        image.data[p + 1] = g;
        image.data[p + 2] = b;
        image.data[p + 3] = 255;
      }

      context.putImageData(image, 0, 0);
    }(0));
  }

  m.require('[html]canvas', {
    options: {
      height: 8,
      width: 8,
      run
    }
  });

  // app
  document.body.innerHTML = `<m-canvas></m-canvas>`;

})