mdlr('scale', m => {

  function linear() {
    const instance = {
      dMin: 0,
      dMax: 0,
      rMin: 0,
      rMax: 0,
      domain: (min, max) => {
        instance.dMin = min;
        instance.dMax = max;
        return instance;
      },
      range: (min, max) => {
        instance.rMin = min;
        instance.rMax = max;
        return (v) => {
          const { dMin, dMax, rMin, rMax } = instance;
          return rMin + (((v - dMin) / (dMax - dMin)) * (rMax - rMin));
        };
      },
    };

    return instance;
  }

  return {
    linear
  }

})