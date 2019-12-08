import rgbFromHSL from './colorMethods/rgbFromHSL';
import rgbFromHSLUV from './colorMethods/rgbFromHSLUV';
import createSVG from './createSVG';
import makePattern from './makePattern';
import mainColor from './ColorObject';

export default function(){
    const c = document.createElement('canvas');
    c.height = 150;
    c.width = 250;
    c.style.display = "none";
    const margin = 0;

    document.body.appendChild(c);
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(c.width, c.height);
    for (let x=0; x<c.width; x++){
        for (let y=0; y<c.height; y++){

            let hue = (x-margin)/(c.width-2*margin)*360;
            hue = Math.min(360,hue);
            hue = Math.max(0,hue);

            let saturation = (1-(y-margin)/(c.height-2*margin))*100;
            saturation = Math.min(100, saturation);
            saturation = Math.max(0, saturation);

            const lightness = 50;
            const {red, green, blue} = rgbFromHSL({hue, saturation, lightness});
            img.data[(y*c.width + x)*4 +0] = red;
            img.data[(y*c.width + x)*4 +1] = green;
            img.data[(y*c.width + x)*4 +2] = blue;
            img.data[(y*c.width + x)*4 +3] = 255;
        }
    }
    ctx.putImageData(img,0,0);

    const outerMargin = 20;
    const svg = createSVG('svg',{
        height: c.height + 2*outerMargin,
        width: c.width + 2*outerMargin,
    });
    svg.style.border = '1px solid #555';
    svg.style.margin = '4px';
    
    const body = createSVG('g',{
        transform: `translate(${outerMargin} ${outerMargin})`
    });
    
    const pattern = makePattern();
    const image = pattern.getElementsByTagName('image')[0];
    image.setAttribute('href',c.toDataURL());
    const defs = createSVG('defs',{});

    const rect = createSVG('rect',{
        height: c.height,
        width: c.width,
        rx: margin,
        fill: `url(#${pattern.id})`
    })

    const pip = createSVG('circle',{
        r: 5,
        stroke: 'white',
        fill: 'transparent',
        filter: 'url(#shadow)'
    })

    mainColor.subscribe((COLOR, PREV) => {
        if (
            COLOR.hsl.saturation === PREV.hsl.saturation &&
            COLOR.hsl.hue === PREV.hsl.hue
        ) return;
        const {saturation, hue} = COLOR.hsl;
        const x = hue/360*c.width;
        const y = (1-saturation/100)*c.height;
        pip.setAttribute('cx',x);
        pip.setAttribute('cy',y);
    })

    pip.addEventListener('mousedown',e => {
        let x = e.clientX;
        let y = e.clientY;
        function move(e){
            const delHue = (e.clientX - x)/c.width * 360;
            const delSat = (y - e.clientY)/c.height * 100;
            console.log({delHue, delSat})
            const {saturation, hue} = mainColor.color.hsl;
            const rawSat = saturation + delSat;
            const rawHue = hue + delHue;

            let nSat = Math.max(rawSat, 0);
            nSat = Math.min(nSat, 100);

            let nHue = Math.max(rawHue, 0);
            nHue = Math.min(nHue, 360);

            mainColor.setHSL({saturation: nSat, hue: nHue})

            if (nSat === rawSat) y = e.clientY; 
            //note: the conditional here prevents deltas from being erroneously registered when we're outside of the slider box.
            if (nHue === rawHue) x = e.clientX;      
        }
        document.addEventListener('mousemove',move);
        document.addEventListener('mouseup',() => {
            document.removeEventListener('mousemove',move)
        },{once: true})
    })

    

    document.body.appendChild(svg);
    svg.appendChild(defs);
    svg.appendChild(body);
    body.appendChild(rect);
    body.appendChild(pip);
    defs.appendChild(pattern);
}