mdlr('worker:poc-worker', m => {

  const { generate } = m.require('uuid');

  const uuid = generate();

  postMessage(`started worker: ${uuid}`);
  // for (; ;); // hog the cpu
  setTimeout(() => {postMessage(`stopped worker: ${uuid}`);}, 5000)
})

mdlr('worker:poc', m => {
  const { log } = m.require('html-logger');
  const { spawn } = m.require('core:worker');

  const totalWorkers = navigator.hardwareConcurrency - 1;
  const bots = [];

  for (let i = 0; i < totalWorkers; i++) {
    const worker = spawn('worker:poc-worker');
    worker.onmessage = function (e) {
      log(e.data);
    }
    bots.push(worker);
  }

  // setTimeout(() => {
  //   bots.forEach(worker => worker.terminate());
  // }, 5000);

})