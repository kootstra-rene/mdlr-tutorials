mdlr('audio:fft', m => {

  function setWindow(options) {
    const { sampleRate, timeSlice, windowSize } = options;

    const window = this.windowValues;
    const widthGuess = (4 * timeSlice / 1000) * sampleRate; // half of hann window should atleast contain 2 timeslices
    const bits = Math.ceil(Math.log2(widthGuess));
    const width = windowSize;//Math.max(windowSize >> 1, Math.min(windowSize, 1 << bits));
    console.log('*', width, windowSize);

    const factor = (windowSize - 1) / width;
    const offset = (windowSize >> 1) - (width >> 1);
    console.log('#', offset, width);
    // generate symmetrical hahn window
    window.fill(+0);
    for (let i = 0, l = width >> 1; i < l; ++i) {
      const v = 0.5 * (1 - Math.cos((Math.PI * 2 * i * factor) / (windowSize - 1)));
      const li = (offset + i) >>> 0;
      window[li] = v;
      const ri = (offset + width - 1 - i) >>> 0;
      window[ri] = v;
    }
  }

  function FFT(options) {
    const { sampleRate, windowSize } = options;

    const sinTable = new Float32Array(windowSize);
    const cosTable = new Float32Array(windowSize);

    this.real = new Float32Array(windowSize);
    this.imag = new Float32Array(windowSize);
    this.windowValues = new Float32Array(windowSize);
    this.reverseTable = new Uint32Array(windowSize);
    this.spectrum = new Float32Array(windowSize / 2);

    setWindow.call(this, options);

    let limit = 1;
    let bit = windowSize >> 1;

    while (limit < windowSize) {
      for (let i = 0; i < limit; ++i) {
        const value = this.reverseTable[i] + bit;
        this.reverseTable[i + limit] = value;
      }

      limit = limit << 1;
      bit = bit >> 1;
    }

    for (let i = 0; i < windowSize; i++) {
      sinTable[i] = Math.sin(-Math.PI / i);
      cosTable[i] = Math.cos(-Math.PI / i);
    }

    this.calculateSpectrum = function (buffer, startIndex = 0) {
      // Locally scope variables for speed up
      const reverseTable = this.reverseTable,
        windowValues = this.windowValues,
        real = this.real,
        imag = this.imag;

      let halfSize = 1;

      for (let i = 0; i < windowSize; ++i) {
        let ri = reverseTable[i];
        real[i] = buffer[startIndex + ri] * windowValues[ri];
        imag[i] = +0;
      }

      while (halfSize < windowSize) {
        const phaseShiftStepReal = cosTable[halfSize];
        const phaseShiftStepImag = sinTable[halfSize];

        let currentPhaseShiftReal = 1;
        let currentPhaseShiftImag = 0;

        for (let fftStep = 0; fftStep < halfSize; ++fftStep) {
          let i = fftStep;

          while (i < windowSize) {
            const off = i + halfSize;
            const tr = currentPhaseShiftReal * real[off] - currentPhaseShiftImag * imag[off];
            const ti = currentPhaseShiftReal * imag[off] + currentPhaseShiftImag * real[off];

            real[off] = real[i] - tr;
            real[i] += tr;
            imag[off] = imag[i] - ti;
            imag[i] += ti;

            i += halfSize << 1;
          }

          const tmpReal = currentPhaseShiftReal;
          currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
          currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
        }

        halfSize = halfSize << 1;
      }

      const spectrum = this.spectrum;
      const bSi = +2 / windowSize;
      const sqrt = Math.sqrt;

      for (let i = 0, N = spectrum.length; i < N; ++i) {
        const mag = bSi * sqrt(real[i] * real[i] + imag[i] * imag[i]);
        spectrum[i] = mag;
      }

      return spectrum;
    };
  }

  return {
    FFT
  }

})