import ResizeObserver from 'resize-observer-polyfill';

function resizeColorEditor(parentRect) {
  const minRatio = 1.6;
  const maxRatio = 1.8;

  let height;
  let width;

  if (parentRect.width / parentRect.height > maxRatio) {
    height = parentRect.height;
    width = parentRect.height * maxRatio;
  } else if (parentRect.width / parentRect.height < minRatio) {
    width = parentRect.width;
    height = parentRect.width / minRatio;
  } else {
    height = parentRect.height;
    width = parentRect.width;
  }
  return {
    height,
    width,
  };
}

function resizeBlockSliders(parentRect) {
  return {
    height: parentRect.height * 0.4,
  };
}

function resizeTop(parentRect) {
  return {
    height: parentRect.height * 0.6,
  };
}

function resizeMain(parentRect) {
  return {
    height: parentRect.height,
    width: parentRect.height,
  };
}

function resizeRgbCmyk(parentRect) {
  return {
    height: parentRect.height,
    width: parentRect.width - parentRect.height,
  };
}

function resizeLeftContent(parentRect) {
  return {
    height: parentRect.height,
    width: 0.15 * parentRect.width,
  };
}

function resizeRightContent(parentRect) {
  return {
    height: parentRect.height,
    width: 0.85 * parentRect.width,
  };
}

function resizeHsl(parentRect) {
  return {
    height: parentRect.height,
    width: parentRect.width - parentRect.height,
  };
}

function resizeHsv(parentRect) {
  return {
    height: parentRect.height,
    width: parentRect.height,
  };
}

function resizeRgb(parentRect) {
  return {
    height: parentRect.height * 0.4,
  };
}

function resizeCmyk(parentRect) {
  return {
    height: parentRect.height * 0.5,
  };
}

class ResizeEvents {
  constructor() {
    this.subscriptions = [];
    // window.addEventListener('resize', this.resize.bind(this));
  }

  addResizeObserver(el, child, func) {
    func(el.getBoundingClientRect());
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const dims = func(entry.contentRect);
        Object.assign(child.style, {
          width: dims.width != null ? `${dims.width}px` : 'unset',
          height: dims.height != null ? `${dims.height}px` : 'unset',
        });
      });
    });
    ro.observe(el);
  }

  subscribe(fn) {
    setTimeout(fn);
    window.addEventListener('resize', fn);
  }

  init() {
    // outer
    this.addResizeObserver(
      document.getElementById('ooo'),
      document.getElementById('color-editor-container'),
      resizeColorEditor,
    );

    this.addResizeObserver(
      document.getElementById('color-editor-container'),
      document.getElementById('lightness-blocks'),
      resizeLeftContent,
    );

    this.addResizeObserver(
      document.getElementById('color-editor-container'),
      document.getElementById('right-container'),
      resizeRightContent,
    );

    this.addResizeObserver(
      document.getElementById('right-container'),
      document.getElementById('block-sliders'),
      resizeBlockSliders,
    );
    this.addResizeObserver(
      document.getElementById('right-container'),
      document.getElementById('top'),
      resizeTop,
    );

    // top
    this.addResizeObserver(
      document.getElementById('top'),
      document.getElementById('main'),
      resizeMain,
    );
    this.addResizeObserver(
      document.getElementById('top'),
      document.getElementById('rgb-cmyk'),
      resizeRgbCmyk,
    );

    this.addResizeObserver(
      document.getElementById('top'),
      document.getElementById('rgb'),
      resizeRgb,
    );
    this.addResizeObserver(
      document.getElementById('top'),
      document.getElementById('cmyk'),
      resizeCmyk,
    );

    // bottom
    this.addResizeObserver(
      document.getElementById('block-sliders'),
      document.getElementById('hsl'),
      resizeHsl,
    );
    this.addResizeObserver(
      document.getElementById('block-sliders'),
      document.getElementById('hsv'),
      resizeHsv,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  resize() {
    const ooo = document.getElementById('ooo');
    // const main = document.getElementById('main');
    // const hsl = document.getElementById('hsl');
    // const hsv = document.getElementById('hsv');
    // const lb = document.getElementById('lightness-blocks');
    // const rc = document.getElementById('right-container');

    // const rgbcmyk = document.getElementById('rgb-cmyk');
    // const rgb = document.getElementById('rgb');
    // const cmyk = document.getElementById('cmyk');

    const minRatio = 1.6;
    const maxRatio = 1.8;

    ooo.style.height = '450px';
    ooo.style.width = '800px';

    const rect = ooo.getBoundingClientRect();
    const container = {
      height: 0,
      width: 0,
    };
    if (rect.width / rect.height > maxRatio) {
      container.height = rect.height;
      container.width = rect.height * maxRatio;
    } else if (rect.width / rect.height < minRatio) {
      container.width = rect.width;
      container.height = rect.width / minRatio;
    } else {
      container.height = rect.height;
      container.width = rect.width;
    }

    // iii.style.height = `${container.height}px`;
    // iii.style.width = `${container.width}px`;

    // const topHeight = (container.height - MARGIN) * 0.6;
    // main.style.height = `${topHeight}px`;
    // main.style.width = `${topHeight}px`;
    // top.style.height = `${topHeight}px`;
    // bs.style.height = `${(container.height - MARGIN) * 0.4}px`;

    // const numBlocks = 21;
    // const blockMargin = 1;

    // const lbWidth = (
    //   container.height - 2 * MARGIN - (numBlocks - 1) * blockMargin
    // ) / numBlocks * 2 + 3 * MARGIN;

    // lb.style.width = `${lbWidth}px`;
    // const rightWidth = container.width - MARGIN - lbWidth;

    // rc.style.width = `${rightWidth}px`;
    // hsl.style.width = `${(rightWidth - MARGIN)}px`;
    // hsv.style.width = `${(rightWidth - MARGIN) * 0.35}px`;

    // rgbcmyk.style.width = `${rightWidth - MARGIN - topHeight}px`;
    // rgbcmyk.style.height = `${topHeight}px`;

    // rgb.style.height = `${(topHeight - MARGIN) * 0.43}`;
    // cmyk.style.height = `${(topHeight - MARGIN) * 0.57}`;
  }
}

export default new ResizeEvents();
