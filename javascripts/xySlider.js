import rgbFromHSL from './colorMethods/rgbFromHSL';
import rgbFromHSLUV from './colorMethods/rgbFromHSLUV';
import createSVG from './createSVG';
import makePattern from './makePattern';
import mainColor from './ColorObject';
import convert from './colorMethods/index';
export default function({
    xChannel,
    yChannel,
    zChannel, 
    colorSpace, 
    zInit,
    height = 150,
    width = 250,
    trackWidth = 20,
    spaceBetween = 10
}){

    
    const margin = 0;
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    c.height = height;
    c.width = width;
    c.style.display = 'none';
    document.body.appendChild(c);

    function makeGradient(){
        const img = ctx.createImageData(width, height);
        for (let x=0; x<width; x++){
            for (let y=0; y<height; y++){
    
                let xVal = (x-margin)/(width-2*margin)*xChannel.max;
                xVal = Math.min(xChannel.max,xVal);
                xVal = Math.max(0,xVal);
    
                let yVal = (1-(y-margin)/(height-2*margin))*yChannel.max;
                yVal = Math.min(yChannel.max, yVal);
                yVal = Math.max(0, yVal);
    
                const zVal = zInit(mainColor.color);
                const {red, green, blue} = convert.getRGB[colorSpace]({
                    [xChannel.name]: xVal,
                    [yChannel.name]: yVal,
                    [zChannel.name]: zVal
                });
                img.data[(y*width + x)*4 +0] = red;
                img.data[(y*width + x)*4 +1] = green;
                img.data[(y*width + x)*4 +2] = blue;
                img.data[(y*width + x)*4 +3] = 255;
            }
        }
        ctx.putImageData(img,0,0);
        const url = c.toDataURL();
        return url;
    }

   

    const outerMargin = 20;
    const svg = createSVG('svg',{
        height: height + 2*outerMargin,
        width: width + 2*outerMargin + trackWidth + spaceBetween,
    });
    svg.style.border = '1px solid #555';
    svg.style.margin = '4px';
    
    const body = createSVG('g',{
        transform: `translate(${outerMargin} ${outerMargin})`
    });
    
    const pattern = makePattern();
    const image = pattern.getElementsByTagName('image')[0];
    image.setAttribute('href',makeGradient());
    const defs = createSVG('defs',{});

    const rect = createSVG('rect',{
        height: height,
        width: width,
        rx: margin,
        fill: `url(#${pattern.id})`
    })

    const pip = createSVG('circle',{
        r: 5,
        stroke: 'white',
        fill: 'transparent',
        filter: 'url(#shadow)'
    })

    const pipWidth = 22;
    const pipHeight = 8;
    const sliderPip = createSVG('rect',{
        height: pipHeight,
        width: pipWidth,
        stroke: 'white',
        filter: 'url(#shadow)',
        x: width + spaceBetween + (trackWidth - pipWidth)/2,
        fill: 'transparent'
    })

    sliderPip.addEventListener('mousedown',(e)=>{
        let y = e.clientY;
        function move(e){
            const delY = (y - e.clientY)/(height-pipHeight)*zChannel.max;
            const yAttempt = mainColor.color[colorSpace][zChannel.name] + delY;
            let newY = Math.min(zChannel.max, yAttempt);
            newY = Math.max(newY, 0);
            mainColor[`set${[colorSpace.toUpperCase()]}`]({
                [zChannel.name]: newY,
            })
            if (newY === yAttempt) y = e.clientY;
        }
        document.addEventListener('mousemove',move);
        document.addEventListener('mouseup',()=>{
            document.removeEventListener('mousemove', move)
        },{once: true})
    })

    mainColor.subscribe((COLOR, PREV) => {
        const y = (1-(COLOR[colorSpace][zChannel.name]/zChannel.max))*(height - pipHeight);
        sliderPip.setAttribute('y',y);
    })
    

    const sliderTrack = createSVG('rect',{
        width: trackWidth,
        height: height,
        fill: 'red',
        x: width + spaceBetween,
    })

    body.appendChild(sliderTrack)
    body.appendChild(sliderPip)

    mainColor.subscribe((COLOR, PREV) => {
        const xVal = COLOR[colorSpace][xChannel.name]/xChannel.max*width;
        const yVal = (1-COLOR[colorSpace][yChannel.name]/yChannel.max)*height;
        pip.setAttribute('cx',xVal);
        pip.setAttribute('cy',yVal);
        if (zInit(COLOR) !== zInit(PREV)){
            image.setAttribute('href',makeGradient());
        }
    })

    pip.addEventListener('mousedown',e => {
        let x = e.clientX;
        let y = e.clientY;
        function move(e){
            const delX = (e.clientX - x)/width * xChannel.max;
            const delY = (y - e.clientY)/height * yChannel.max;
            const rawY = mainColor.color[colorSpace][yChannel.name] + delY;
            const rawX = mainColor.color[colorSpace][xChannel.name] + delX;

            let nY = Math.max(rawY, 0);
            nY = Math.min(nY, yChannel.max);

            let nX = Math.max(rawX, 0);
            nX = Math.min(nX, xChannel.max);

            //todo: fix!
            mainColor[`set${colorSpace.toUpperCase()}`]({
                [xChannel.name]: nX,
                [yChannel.name]: nY,
            })

            if (nY === rawY) y = e.clientY; 
            //note: the conditional here prevents deltas from being erroneously registered when we're outside of the slider box.
            if (nX === rawX) x = e.clientX;      
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