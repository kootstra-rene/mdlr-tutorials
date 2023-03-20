mdlr('[html]mmzsource-spotify-dinges', m => {

  m.html`<audio src="/noise.mp3" type="audio/mpeg" controls=true></audio>`

})

mdlr('audio:experiment', m => {

  window.document.body.style.overflow = 'hidden';

  const { FFT } = m.require('audio:fft');

  const colormap = m.require('colormap:inferno');

  const settings = {
    spectogramSlice: 1000 / 60,
    spectogramLimit: (1 << 15) - 1,
    // frequencyRange: [300, 3400] // Narrowband
    // frequencyRange: [50, 7000] // Wideband
    // frequencyRange: [50, 14000] // Superwideband
    // frequencyRange: [20, 20000] // Fullband
    // frequencyRange: [0, 24000] // everything
    frequencyRange: [0, 16000] // youtube mp3 
  };

  const windowSize = 4096;
  const canvasHeight = 128;
  const audibleCutoff = 1 / (1 << 15); //-32768-+32768
  const fft = new FFT({
    sampleRate: settings.frequencyRange[1] << 1,
    timeSlice: settings.spectogramSlice,
    windowSize,
  });

  const channels = [];
  let timeContext = null;

  function normalize(samples, scale) {
    let max = 0;
    for (let i = 0, l = samples.length; i < l; ++i) {
      const value = Math.abs(samples[i]);
      if (max < value) max = value;
    }

    const factor = scale / max;
    for (let i = 0, l = samples.length; i < l; ++i) {
      samples[i] *= factor;
    }
  }

  function createChannelCanvas(top, width, height = canvasHeight) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.cssText = `
      position: absolute;
      left: 8px;
      width: ${width}px;
      top: ${top}px;
      height: ${height}px;
      border: solid 1px gray;
    `;
    return canvas;
  }

  function createCanvas2dContext(canvas, alpha = false) {
    return canvas.getContext('2d', {
      willReadFrequently: false,
      desynchronized: true,
      alpha,
    });
  }

  function createFrequencyContext(canvas) {
    const context = createCanvas2dContext(canvas);
    context.lineWidth = 1;
    context.strokeStyle = 'cyan';
    context.translate(0.5, 0.5);
    context.imageSmoothingEnabled = false;
    return context;
  }

  function createSpectrogramContext(canvas, audio) {
    // settings.spectogramSlice = (windowSize >> 1) / audio.sampleRate;
    const context = createCanvas2dContext(canvas);
    context.translate(0.5, 0.5);
    context.imageSmoothingEnabled = false;

    let count = 0;
    {
      // console.log(`spectrum:`, canvas.width, canvas.height, (maxFreq - minFreq) / canvas.height);
      const sampleRate = audio.sampleRate;
      console.log(`fft-samples-duration: ${(1000 * windowSize / sampleRate).toFixed(2)}ms`)

      const values = fft.windowValues;
      // let count = 0;
      let sumplus = 0, summin = 0;
      for (let i = 0; i < values.length; ++i) {
        if (values[i] >= 0.5) {
          sumplus += values[i];
          ++count;
        }
        else {
          summin += values[i];
        }
      }
      console.log(count, sumplus, summin);
      console.log(`fft-windowed-samples-duration: ${(1000 * count / sampleRate).toFixed(3)}ms`)
    }

    let limit = Math.floor(audio.length / audio.sampleRate * 1000 / settings.spectogramSlice);
    if (limit >= settings.spectogramLimit) {
      limit = settings.spectogramLimit;
    }

    canvas.height = (windowSize >> 1);
    canvas.width = limit;


    return context;
  }

  function drawChannelSamples(canvas, ranges) {
    const context = createCanvas2dContext(canvas);
    context.lineWidth = 1;
    context.fillStyle = 'none';
    context.translate(0.5, 0.5);
    context.imageSmoothingEnabled = false;
    context.strokeStyle = 'gray';
    context.beginPath();
    const mid = canvas.height / 2;
    for (let i = 0; i < ranges.length; ++i) {
      const [min, max,] = ranges[i];
      const ymin = min * mid;
      const ymax = max * mid;
      context.moveTo(i, mid - ymin);
      context.lineTo(i, mid - ymax);
    }
    context.stroke();
    context.strokeStyle = 'lightgray';
    context.beginPath();
    for (let i = 0; i < ranges.length; ++i) {
      const [, , min, max] = ranges[i];
      const ymin = min * mid;
      const ymax = max * mid;
      context.moveTo(i, mid - ymin);
      context.lineTo(i, mid - ymax);
    }
    context.stroke();
  }

  function setupMemoryInfo(span) {
    span.style.cssText = 'float:right;';
    setInterval(() => {
      span.textContent = `${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)}M`;
    }, 250);
  }

  function updateSpectrum(channel, spectrum, sampleRate) {
    const spectrumContext = channel.frequencyContext;
    const clientWidth = spectrumContext.canvas.width;
    const clientHeight = spectrumContext.canvas.height;

    spectrumContext.clearRect(0, 0, clientWidth, clientHeight);
    spectrumContext.beginPath();

    const scale = clientWidth / spectrum.length;

    for (let i = 0; i < spectrum.length; ++i) {
      const cv = Math.max(1, spectrum[i]);
      spectrumContext.moveTo(i, 255);
      spectrumContext.lineTo(i, 255 - cv);
    }
    spectrumContext.stroke();
  }

  function getChunkMinMax(samples, begin, end) {
    let min = +0, negCount = 0 >>> 0, negTotal = +0;
    let max = +0, posCount = 0 >>> 0, posTotal = +0;
    for (let i = begin >>> 0; i < end >>> 0; ++i) {
      const sample = samples[i];

      if (sample >= 0) {
        if (sample > max) max = sample;
        posTotal += sample;
        ++posCount;
      }
      else {
        if (sample < min) min = sample;
        negTotal += sample;
        ++negCount;
      }
    }
    // console.log (negTotal, negCount, negTotal/negCount, posTotal, posCount, posTotal/posCount);
    return [min, max, !negCount ? +0 : negTotal / negCount, !posCount ? +0 : posTotal / posCount];
  }

  const audioContext = new AudioContext({
    sampleRate: (settings.frequencyRange[1] * 2) >>> 0
  });

  document.body.innerHTML = 'drop a file...'

  function run(file) {
    audioContext.decodeAudioData(file, data => {
      console.log(data);
      document.body.style.margin = '8px';
      document.body.innerHTML = '<button disabled=true>play</button><button>calc</button><span></span>';

      const [btnPlay, btnCalc, spnInfo] = document.body.childNodes;

      setupMemoryInfo(spnInfo);

      btnPlay.addEventListener('click', () => {
        btnPlay.disabled = true;
        play(data, chunks, chunkSize, timeContext);
      });
      btnCalc.addEventListener('click', () => {
        btnCalc.disabled = true;

        console.time('calculate');
        const scaler = Math.log2;//Math.log10;
        channels.forEach(channel => {
          let offset = 0;
          let { width, height } = channel.spectographContext.canvas;
          height = fft.windowValues.length >> 1; // temp hack until only using smaples within frequency range
          console.log(`texture: ${width}x${height} : ${fft.windowValues.length >> 1}`);

          let step = Math.floor(data.length / width);
          console.log('**', data.length, channel.spectographContext.canvas.width, step)
          const buffer = new Float32Array(width * height);

          let bufferIndex = 0;
          let columns = 0;
          console.time(`calculate spectogram data`);
          const min_value = -scaler(audibleCutoff);
          const hstep = (step >> 1);

          channel.buffer = buffer;
          channel.bufferIndex = 0;

          const samplesPerSlice = (settings.spectogramSlice / 1000) * data.sampleRate;
          console.log('#slices:', data.length /samplesPerSlice, samplesPerSlice, step, data.length / step);

          for (let sampleIndex = hstep, lastSample = data.length - hstep; sampleIndex < lastSample; sampleIndex += step) {
            const spectrum = fft.calculateSpectrum(channel.samples, (sampleIndex >> 0) - (windowSize >> 1));
            for (let i = 0; i < spectrum.length; ++i) {
              if (spectrum[i] >= 1.0) continue;
              if (spectrum[i] > channel.spectogram.max) channel.spectogram.max = spectrum[i];
              buffer[bufferIndex++] = (spectrum[i] < audibleCutoff) ? audibleCutoff : spectrum[i];
            }
            ++columns;
          }
          console.log(`columns: ${columns}`);
          console.timeEnd(`calculate spectogram data`);

          // scale
          // Math.log10(x / y) === Math.log10(x) - Math.log10(y)
          console.time(`scale spectogram data`);
          const specmax = 1.0;//-scaler(channel.spectogram.max);
          console.log(channel.spectogram.max, specmax);
          const factor = 255 / (min_value - specmax);

          channel.fftdata = new Uint8ClampedArray(buffer.length);
          const imageData = channel.spectographContext.createImageData(columns, windowSize >> 1);
          const data32 = new Uint32Array(imageData.data.buffer);
          for (let i = 0; i < buffer.length; ++i) {
            const scaledValue = -scaler(buffer[i]) - specmax;
            let cv = 255 - (scaledValue * factor) >> 0;
            channel.fftdata[i] = cv;

            const x = (i / (windowSize >> 1)) >> 0;
            const y = i % (windowSize >> 1);
            data32[x + (columns * ((windowSize >> 1) - y))] = colormap[cv];
          }
          console.timeEnd(`scale spectogram data`);

          console.time(`update spectogram texture`);
          channel.spectographContext.putImageData(imageData, 0, 0);
          console.timeEnd(`update spectogram texture`);

          channel.buffer = null;
        });
        console.timeEnd('calculate')

        console.log(channels);
        btnPlay.disabled = false;
      });

      const chunks = document.body.clientWidth;
      const chunkSize = data.length / chunks;
      console.log([chunks, chunkSize, data.length / 512 * 256]);

      for (let ch = 0; ch < data.numberOfChannels; ++ch) {
        const sectionHeight = 3 * (canvasHeight + 8) + canvasHeight;
        const baseOffset = 40 + ch * sectionHeight;

        let samplesCanvas = createChannelCanvas(baseOffset + 0 * (canvasHeight + 8), chunks);
        document.body.appendChild(samplesCanvas);

        let spectrumCanvas = createChannelCanvas(baseOffset + 1 * (canvasHeight + 8), chunks, 2 * canvasHeight);
        document.body.appendChild(spectrumCanvas);
        const spectographContext = createSpectrogramContext(spectrumCanvas, data);
        console.log(spectrumCanvas.width)
        const imageData = spectographContext.createImageData(1, spectrumCanvas.height);

        let frequencyCanvas = createChannelCanvas(baseOffset + 2 * (canvasHeight + 8) + canvasHeight, chunks);
        frequencyCanvas.height = canvasHeight << 1;
        frequencyCanvas.width = windowSize >> 1;
        document.body.appendChild(frequencyCanvas);

        const samples = data.getChannelData(ch);
        const samplesFloat32 = new Float32Array(samples.buffer);

        normalize(samplesFloat32, 0.98);

        channels.push({
          canvas: {
            samples: samplesCanvas,
            spectrum: spectrumCanvas,
            frequency: frequencyCanvas,
          },
          frequencyContext: createFrequencyContext(frequencyCanvas),
          spectographContext,
          samples: samplesFloat32,
          spectogram: {
            min: +Number.MAX_SAFE_INTEGER,
            max: +Number.MIN_SAFE_INTEGER,
          },
          lastSliceId: -1
        })

        samplesCanvas.width = spectrumCanvas.width;

        const ranges = [];
        const chunkSize = samplesFloat32.length / samplesCanvas.width;
        for (let i = 0; i < samplesCanvas.width; ++i) {
          ranges.push(getChunkMinMax(samples, i * chunkSize, i * chunkSize + chunkSize));
        }

        drawChannelSamples(samplesCanvas, ranges);
      }

      // progress canvas
      let canvas = document.createElement('canvas');
      canvas.width = chunks;
      canvas.height = 1;
      canvas.style.cssText = `
        pointer-events: none;
        position: absolute;
        left: 8px;
        width: ${chunks}px;
        top: ${40}px;
        height: ${data.numberOfChannels * (4 * canvasHeight + 24) - 8}px;
        border: solid 1px transparent;
      `;
      document.body.appendChild(canvas);
      timeContext = createCanvas2dContext(canvas, true);
      timeContext.lineWidth = 3;
      timeContext.strokeStyle = 'rgba(0,128,255,0.75)';
      timeContext.imageSmoothingEnabled = false;
    });

  }
  let source = null;
  function updateTime() {
    requestAnimationFrame(updateTime);
  }
  updateTime();

  function play(buffer, chunks, chunkSize, timeContext) {
    /*const */source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
    source.addEventListener('ended', m => {
      document.body.firstChild.disabled = false;
    })
    window.audioContext = audioContext;
    window.audioSource = source;

    function track(now) {
      const seconds = audioContext.currentTime - beginTime; 
      // console.log(seconds / buffer.duration * 100);

      let width = timeContext.canvas.width;

      let x = Math.min((seconds / buffer.duration) * width, width);
      timeContext.clearRect(0, 0, width, 10);// optimise by only clearing part?
      if (x < 0) x = 0;
      if (x >= width) return;

      requestAnimationFrame(track);
      timeContext.lineWidth = 3;
      timeContext.strokeStyle = 'rgba(0,128,255,0.75)';
      timeContext.imageSmoothingEnabled = false;
      timeContext.beginPath();
      timeContext.moveTo(x, 0);
      timeContext.lineTo(x, 1);
      timeContext.stroke();

      channels.forEach(channel => {
        const height = windowSize >> 1;
        const slices = channel.fftdata.length / height;
        let startSample = (x / width * buffer.length) >> 0;
        startSample = Math.max(startSample, 0);
        startSample = Math.min(startSample, buffer.length - windowSize);
        const sliceId = (startSample / (buffer.length / slices)) >>> 0;

        if (channel.lastSliceId !== sliceId) {
          const spectrum = new Uint8Array(channel.fftdata.buffer, sliceId * height, height);
          updateSpectrum(channel, spectrum, buffer.sampleRate);
          channel.lastSliceId = sliceId;
        }
      });
    }

    const beginTime = audioContext.currentTime;
    track(performance.now());
  }

  const resizeObserver = new ResizeObserver(entries => {
    const lastChange = entries[entries.length - 1];
    channels.forEach(ch => {
      const width = lastChange.borderBoxSize[0].inlineSize;
      // console.log(ch.canvas.samples.style.width, lastChange.borderBoxSize[0]);
      ch.canvas.samples.style.width = `${width}px`;
      ch.canvas.spectrum.style.width = `${width}px`;
      ch.canvas.frequency.style.width = `${width}px`;

      timeContext.canvas.style.width = `${width}px`;
      timeContext.canvas.width = width;
    });
  });

  resizeObserver.observe(document.body);


  function openFile(file) {
    var reader = new FileReader();

    reader.onload = function (event) {
      console.log(file, file.size);

      run(event.target.result);
      // audioContext.decodeAudioData(event.target.result, data => {
      //   playAudio(data);
      //   console.log(data);
      // });
    };

    reader.readAsArrayBuffer(file);
  }

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    const fileList = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;

    [...fileList].forEach(file => openFile(file));
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }

  document.addEventListener('dragover', handleDragOver, false);
  document.addEventListener('drop', handleFileSelect, false);

  function playAudio(buffer) {
    /*const */source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
    source.addEventListener('ended', m => {
      console.log('song ended');
    })
  }

})