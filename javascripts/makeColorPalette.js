import mainColor from './ColorObject';
import namedColors from './namedColors';
import hsvFromRGB from './colorMethods/hsvFromRGB';
import { CHAN_MAX, COLOR_ORD } from './colorMathConstants';

function getChannels(colorspace) {
  return Object.keys(COLOR_ORD[colorspace])
    .sort((a, b) => COLOR_ORD[colorspace][a] - COLOR_ORD[colorspace][b]);
}

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

  const keys = getChannels(colorspace);

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

function rgbFromHex(str) {
  const doubleRx = /^#([0-9,a-f,A-F]{2})([0-9,a-f,A-F]{2})([0-9,a-f,A-F]{2})$/;
  const singleRx = /^#([0-9,a-f,A-F]{1})([0-9,a-f,A-F]{1})([0-9,a-f,A-F]{1})$/;
  const [, r, g, b] = doubleRx.exec(str) || singleRx.exec(str) || [];
  if (r == null || g == null || b == null) return null;
  const [red, green, blue] = [r, g, b].map((numStr) => {
    if (numStr.length === 1) numStr += numStr;
    return parseInt(numStr, 16);
  });
  return { red, green, blue };
}

function nameEvent(e) {
  const name = e.target.innerText;
  const rgb = rgbFromHex(namedColors[name]);
  if (namedColors[name] && rgb) mainColor.set('rgb', rgb);
}

function hexEvent(e) {
  const rgb = rgbFromHex(e.target.innerText);

  mainColor.set('rgb', rgb);
}

function basicSwatch(colorspace) {
  const channels = getChannels(colorspace).map((c) => Math.round(mainColor.color[colorspace][c]));
  return `
    <div>
        <div>
            <span style="font-weight: 900; color: inherit;">${colorspace.toUpperCase()}(</span>
            <span id="swatch-input" data-colorspace="${colorspace}" data-event="normal" style="${inputStyle}">
            ${channels.join(', ')}
            </span> 
            <span style="font-weight: 900; color: inherit;">)</span>
        </div>
    </div>
`;
}

const opts = [
  () => {
    const closest = closestNamedColor(mainColor.color.rgb);
    return `
            <div>  
                <div class="color-description">
                    <div id="swatch-input" data-event="name" style="outline: none">${closest.color.toUpperCase()}</div>
                    <div>${closest.distance}% match</div>
                </div>
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
                <div>
                <span style="font-weight: 900; color: inherit;">HEX </span>
                <span id="swatch-input" data-event="hex" style="${inputStyle}">${color}</span>
                </div>
            </div>
        `;
  },
  () => basicSwatch('rgb'),
  () => basicSwatch('cmyk'),
  () => basicSwatch('hsl'),
  () => basicSwatch('hsv'),
];

const EVENTS = {
  name: nameEvent,
  normal: inputEvent,
  hex: hexEvent,
};

function prepareEditableContent(element, showIdx) {
  element.innerHTML = opts[showIdx.current]();

  const swatch = document.getElementById('swatch-input');
  swatch.contentEditable = true;
  swatch.addEventListener('input', EVENTS[swatch.dataset.event]);
  swatch.addEventListener('click', (e) => { e.stopPropagation(); });
  swatch.addEventListener('blur', () => {
    prepareEditableContent(element, showIdx);
  });

  const caret = document.createElement('div');
  caret.classList.add('caret');
  caret.innerHTML = '&rsaquo;';

  element.firstElementChild.appendChild(caret);
  caret.addEventListener('click', () => {
    showIdx.current = (showIdx.current + 1) % opts.length;
    prepareEditableContent(element, showIdx);
  });
}

export default function makeColorPalette({ target }) {
  const showIdx = { current: 0 };
  const currentColor = document.createElement('div');
  currentColor.classList.add('current-color');
  target.appendChild(currentColor);
  prepareEditableContent(currentColor, showIdx);

  mainColor.subscribe((COLOR) => {
    const hexColor = hexFromRGB(COLOR.rgb);
    currentColor.style.background = hexColor;
    currentColor.classList.add(isDark(COLOR.rgb) ? 'dark' : 'light');
    currentColor.classList.remove(isDark(COLOR.rgb) ? 'light' : 'dark');

    if (document.activeElement.id === 'swatch-input') return;
    prepareEditableContent(currentColor, showIdx);
  });
}
