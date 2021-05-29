let hueSlider;

export default {
  hueSlider: {
    svgMargin: 20,
    radius: 140,
    trackThickness: 8,
    set(that) { hueSlider = that; },
    get() { return hueSlider; },
  },
  triangleSlider: {
  },
  sliderSet: {
    trackThickness: 8,
    pipWidth: 12,
    margin: 20,
  },
};
