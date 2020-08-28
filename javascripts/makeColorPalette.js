import mainColor from './ColorObject';
import namedColors from './namedColors';
import hsvFromRGB from './colorMethods/hsvFromRGB';





function hexFromRGB(rgb) {
    const color = [
        Math.round(rgb.red).toString(16).split('.')[0],
        Math.round(rgb.green).toString(16).split('.')[0],
        Math.round(rgb.blue).toString(16).split('.')[0]
    ];
    const zeros = '00';
    const result = '#' + color.map(color => zeros.slice(color.length) + color).join('');
    return result;
}

const channels = ['red','green','blue'];


const c1Lookup = {};

function colorNameHSV(name){
    if (c1Lookup[name]){
        return c1Lookup[name];
    }
    c1Lookup[name] = hsvFromRGB({
        red: parseInt(namedColors[name].slice(1, 3),16),
        green: parseInt(namedColors[name].slice(3, 5),16),
        blue: parseInt(namedColors[name].slice(5, 7),16)
    });
    return c1Lookup[name];
}

function closestNamedColor(color){
    let best = null;
    Object.keys(namedColors).forEach(k => {
        const c1 = colorNameHSV(k);
    
        const c2 = hsvFromRGB(color);
    
        const hmin = Math.min(c1.hue, c2.hue);
        const hmax = Math.max(c1.hue, c2.hue);
        let hdiff = Math.min(hmax-hmin, hmin+360-hmax);
        hdiff = isNaN(hdiff) ? 0 : hdiff;
    
        const squareSum = (hdiff/360)**2*2 + ((c1.saturation - c2.saturation)/100)**2 + ((c1.value - c2.value)/100)**2*2;

        if (!best || best.distance > squareSum){
            best = {
                color: k,
                distance: squareSum
            }
        }
    })
    return {
        color: best.color,
        distance: ((1 - Math.sqrt(best.distance/6))*100).toFixed(),
    };
}



function mix(c1, c2, t){
    return {
        red: c1.red + (c2.red - c1.red)*t,
        green: c1.green + (c2.green - c1.green)*t,
        blue: c1.blue + (c2.blue - c1.blue)*t,
    }
}


function isDark(rgb) {
    return .2126*rgb.red + .7152*rgb.green + .0722*rgb.blue < .68*255;
}

export default function makeColorPalette({target}) {
    const currentColor = document.createElement('div');
    currentColor.classList.add('current-color');
    target.appendChild(currentColor);
    mainColor.subscribe(COLOR => {
       const secondaryRGB = mix({red: 255, green: 255, blue: 255}, COLOR.rgb, .3);

       const hexColor = hexFromRGB(COLOR.rgb);
       const closest = closestNamedColor(COLOR.rgb);
       currentColor.style.background = hexColor;
       currentColor.classList.add(isDark(COLOR.rgb) ? 'dark' : 'light');
       currentColor.classList.remove(isDark(COLOR.rgb) ? 'light' : 'dark');

       currentColor.innerHTML = hexColor;
       currentColor.innerHTML = `<div>${closest.color.toUpperCase()}</div><div>${closest.distance}% match</div>`;
    })
}