mdlr('[html]blog-particles', m => {

  m.html`<canvas{} width=512 height=128 />`;

  m.css`
  :root {
    display: block;
    width: 100%;
    height: 100%
  }
  
  canvas {
    width: 100%;
    height: 100%
  }`;

  return class {
    canvas = null;

    connected() {
      const { width: canvasWidth, height: canvasHeight } = this.canvas;
      const ctx = this.canvas.getContext('2d', {
        alpha: false
      });
      ctx.lineWidth = 1;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'white';

      const maxPs = 24;      // max nr of particles
      const threshold = 100; // threshold distance between particles at which a line should be drawn
      const speed = 0.5;     // speed of movement; adapt to your environment and preference

      function particle() {
        return {
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight,
          vx: (Math.random() * speed * 2) - (1 * speed),
          vy: (Math.random() * speed * 2) - (1 * speed),
        }
      }

      const ps = Array.from({ length: maxPs }, particle);

      function drawCircle(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        ctx.fill();
      }

      // map a point p in a range from a1 to a2
      // into a range from b1 to b2 (linearly)
      function mapRange(p, a1, a2, b1, b2) {
        return (b1 + ((p - a1) * (b2 - b1)) / (a2 - a1));
      }

      function distance(p1, p2) {
        let dx2 = Math.pow((p2.x - p1.x), 2);
        let dy2 = Math.pow((p2.y - p1.y), 2);
        return Math.sqrt(dy2 + dx2);
      }

      function drawLine(d, p1, p2) {
        ctx.lineWidth = mapRange(d, 0, threshold, 2, 0);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      function drawLines(p1) {
        ps.forEach(p2 => {
          let d = distance(p1, p2);
          if (d < threshold) {
            drawLine(d, p1, p2);
          }
        });
      }

      function move(p) {
        p.x = p.x + p.vx;
        p.y = p.y + p.vy;
      }

      function bounce(p) {
        if (p.x < 0 || p.x > canvasWidth) { p.vx = -p.vx }
        if (p.y < 0 || p.y > canvasHeight) { p.vy = -p.vy }
      }

      function clearFrame() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      }

      function drawFrame() {
        ps.forEach(p => { drawCircle(p.x, p.y); });
        ps.forEach(p => { drawLines(p); });

        ps.forEach(p => {
          move(p);
          bounce(p);
        });
      }

      function animate() {
        requestAnimationFrame(animate);
        clearFrame();
        drawFrame();
      }

      requestAnimationFrame(animate);

    }
  };

})