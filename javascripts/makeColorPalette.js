import mainColor from './ColorObject';
import namedColors from './namedColors';
import hsvFromRGB from './colorMethods/hsvFromRGB';
import { CHAN_MAX } from './colorMathConstants';

function hexFromRGB(rgb) {
  const color = [
    Math.round(rgb.red).toString(16).split('.')[0],
    Math.round(rgb.green).toString(16).split('.')[0],
    Math.round(rgb.blue).toString(16).split('.')[0],
  ];
  const zeros = '00';
  const result = `#${color.map((color) => zeros.slice(color.length) + color).join('')}`;
  return result;
}

const c1Lookup = {};

function colorNameHSV(name) {
  if (c1Lookup[name]) {
    return c1Lookup[name];
  }
  c1Lookup[name] = hsvFromRGB({
    red: parseInt(namedColors[name].slice(1, 3), 16),
    green: parseInt(namedColors[name].slice(3, 5), 16),
    blue: parseInt(namedColors[name].slice(5, 7), 16),
  });
  return c1Lookup[name];
}

function closestNamedColor(color) {
  let best = null;
  Object.keys(namedColors).forEach((k) => {
    const c1 = colorNameHSV(k);

    const c2 = hsvFromRGB(color);

    const hmin = Math.min(c1.hue, c2.hue);
    const hmax = Math.max(c1.hue, c2.hue);
    let hdiff = Math.min(hmax - hmin, hmin + 360 - hmax);
    hdiff = isNaN(hdiff) ? 0 : hdiff;
    const sdiff = isNaN(c1.saturation - c2.saturation) ? 0 : c1.saturation - c2.saturation;
    const squareSum = (hdiff / 360) ** 2 * 2 + (sdiff / 100) ** 2 + ((c1.value - c2.value) / 100) ** 2 * 2;

    if (!best || best.distance > squareSum) {
      best = {
        color: k,
        distance: squareSum,
      };
    }
  });
  return {
    color: best.color,
    distance: ((1 - Math.sqrt(best.distance / 6)) * 100).toFixed(),
  };
}

function isDark(rgb) {
  return 0.2126 * rgb.red + 0.7152 * rgb.green + 0.0722 * rgb.blue < 0.68 * 255;
}

const inputStyle = `
    font-size: 16px; 
    color: inherit; 
    text-shadow: inherit; 
    border: none;
    outline: none;
    padding: 0px 4px;
`;

function inputEvent(e) {
  const { colorspace } = e.target.dataset;
  const values = e.target.innerText.split(',').map((v) => +v);
  if (values.some((v) => isNaN(v) || v < 0)) return;

  const keys = Object.keys(mainColor.color[colorspace]);

  if (keys.some((k, i) => {
    const v = values[i];
    if (isNaN(v)) return true;
    if (v < 0) return true;
    if (CHAN_MAX[colorspace][k] < v) return true;
    return false;
  })) return;

  mainColor.set(colorspace, keys.reduce((obj, k, i) => {
    obj[k] = values[i];
    return obj;
  }, {}));
}

const opts = [
  () => {
    const closest = closestNamedColor(mainColor.color.rgb);
    return `
            <div style="display: flex; width: 100%; justify-content: space-between">  
            <div class="color-description">
                <div id="swatch-input">${closest.color.toUpperCase()}</div>
                <div>${closest.distance}% match</div>
            </div>
            </div>
        `;
  },
  () => {
    const { color: { rgb: { red, green, blue } } } = mainColor;
    return `
            <div>
            <span style="font-weight: 900; color: inherit;">RGB(</span>
            <span id="swatch-input" data-colorspace="rgb" style="${inputStyle}">
            ${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}
            </span> 
            <span style="font-weight: 900; color: inherit;">)</span>
            </div>
        `;
  },
  () => {
    const {
      color: {
        cmyk: {
          cyan, magenta, yellow, black,
        },
      },
    } = mainColor;
    return `
            <div>
            <span style="font-weight: 900; color: inherit;">CMYK(</span>
            <span id="swatch-input" data-colorspace="cmyk" style="${inputStyle}">
            ${Math.round(cyan)}, ${Math.round(magenta)}, ${Math.round(yellow)}, ${Math.round(black)}
            </span>
            <span style="font-weight: 900; color: inherit;">)</span>
            </div>
        `;
  },
  () => {
    const {
      color: {
        rgb,
      },
    } = mainColor;
    const color = hexFromRGB(rgb);
    return `
            <div>
            <div style="font-weight: 900; color: inherit;">HEXADECIMAL</div>
            <span id="swatch-input" style="${inputStyle}">${color}</span>
            </div>
        `;
  },
];

export default function makeColorPalette({ target }) {
  let showIdx = 0;
  const currentColor = document.createElement('div');
  currentColor.classList.add('current-color');
  currentColor.addEventListener('click', () => {
    showIdx = (showIdx + 1) % opts.length;
    currentColor.innerHTML = opts[showIdx]();
    const swatch = document.getElementById('swatch-input');
    swatch.addEventListener('input', inputEvent);
    swatch.addEventListener('click', (e) => { e.stopPropagation(); });
    swatch.addEventListener('blur', () => {
      currentColor.innerHTML = opts[showIdx]();
    });
    swatch.contentEditable = true;
  });

  target.appendChild(currentColor);
  mainColor.subscribe((COLOR) => {
    const hexColor = hexFromRGB(COLOR.rgb);
    currentColor.style.background = hexColor;
    currentColor.classList.add(isDark(COLOR.rgb) ? 'dark' : 'light');
    currentColor.classList.remove(isDark(COLOR.rgb) ? 'light' : 'dark');

    if (document.activeElement.id === 'swatch-input') return;
    currentColor.innerHTML = opts[showIdx]();
  });
}
