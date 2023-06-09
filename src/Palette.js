import { paletteHues } from "./ColorSelector";
import { autoCollapse, expand } from "./Collapse";

export function getHSL(arr){
    return `hsl(${arr[0]}, ${arr[1]}%, ${arr[2]}%)`
};

function maxValue(value){
    if (value > 100){
        return 100;
    } else if (value < 0) {
        return 0;
    } else {
        return Math.floor(value);
    }
};

function hideAllHueDots() {
    paletteHues.map((palette)=>{
        let dotElement = document.querySelector(`.dot-${palette.name}`);
        dotElement.style.visibility = 'hidden';
    });
}

function showSelectedHueDot(e) {
    let dotMono = document.querySelector('.dot-monochrome');
    dotMono.style.visibility = 'visible';
    let selectedPalette = e.target.value;
    if (selectedPalette === 'monochromatic') {
        // monochromatic dot needs to be visible in all cases therfore
        // code responsible for that is included above if else statement
    } else if (selectedPalette === 'complementary') {
        let dotCompl = document.querySelector('.dot-complementary');
        dotCompl.style.visibility = 'visible';
    } else if (selectedPalette === 'custom') {
        //custom dot/dots will be added in future
    } else {
        let dotElement1 = document.querySelector(`.dot-${selectedPalette}1`);
        let dotElement2 = document.querySelector(`.dot-${selectedPalette}2`);
        dotElement1.style.visibility = 'visible';
        dotElement2.style.visibility = 'visible';
    }
}

function passPaletteTypeToState(e, paletteTypes, setPalType, palType) {
    paletteTypes.map((palette) => {
        if(e.target.value === palette.name) {
            return setPalType(palette);
        }
    });
    let newPalette = {};
    newPalette.name = e.target.value;
    autoCollapse('palettes-collapse', newPalette);
    expand('palettes-collapse', newPalette);
}

function SelectPalType( {palType, setPalType} ){
    let paletteTypes = [
        {name: "monochromatic", hue: [0]},
        {name: "complementary", hue: [0, 180]},
        {name: "triadical", hue: [0, 120, -120]},
        {name: "analogus", hue: [0, 30, -30]},
        {name: "neutral", hue: [0, 15, -15]}
    ];
    function handleInput(e){
        passPaletteTypeToState(e, paletteTypes, setPalType, palType);
        hideAllHueDots();
        showSelectedHueDot(e);
    }
    return (
        <>
            <div className="select-pal-type">
                <label id="palette-types">Sellect palette type: </label>
                <select 
                        id="palette-types" 
                        name="palette-types"
                        onInput={(e) => handleInput(e)}
                        >                        
                    <option 
                        value={"monochromatic"}
                        id="sel-pal-def-option"
                        >monochromatic</option>
                    <option value={"complementary"}>complementary</option>
                    <option value={"triadical"}>triadical</option>
                    <option value={"analogus"}>analogus</option>
                    <option value={"neutral"}>neutral</option>
                </select>
            </div>
        </>
    )
}

function calcHue(mainHue, hueModifier){
    let hueSum = mainHue + hueModifier;
    if (hueSum > 360){
        return hueSum - 360;
    } else if (hueSum < 0) {
        return hueSum + 360;
    }else {
        return hueSum;
    }
};

function calcPalettes(hue, sat, lgt, contrast) {
    let base = [hue, sat, lgt];
    let light = [hue, 
                     maxValue(sat + contrast), 
                     maxValue(lgt + (contrast/2))];
    let dark = [hue, 
                     maxValue(sat + contrast), 
                     maxValue(lgt - (contrast/2))];
    let midLight = [hue, 
                        maxValue((2*sat + contrast/2)/2), 
                        maxValue((2*lgt + contrast/2)/2)];
    let midDark = [hue, 
                        maxValue((2*sat + contrast/2)/2), 
                        maxValue((2*lgt - contrast/2)/2)];
    let newPalette = [base, light, midLight, midDark, dark];
    return newPalette;
};

export function getColors(hueModifier, color, contrast){
    let [mainHue, mainSat, mainLight] = [...color];
    let hue = calcHue(mainHue, hueModifier);
    let sat = mainSat; //for future calcSat function (ModifyPalette functionality)
    let lgt = mainLight; //for future calcLgt function (ModifyPalette functionality)
    let newPalette = calcPalettes(hue, sat, lgt, contrast);
    return newPalette;
};

function DispPalette({color, contrast, palType, showHidePalettes}){
    return (
        <div style={{display: showHidePalettes}}>
            {palType.hue.map((hues) => (
                <div 
                    className="main-color"
                    style={{background: getHSL(getColors(hues, color, contrast)[0])}}>
                    {getColors(hues, color, contrast).map((color) => (
                        <div
                            className="palette-color"
                            style={{background: getHSL(color)}}
                            >
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
};

function ModifyPalette({contrast, setContrast}){
    function handleInput(e){
        let newContrast = e.target.value;
        return setContrast(newContrast);
    }
    return (
        <div className="slider contrast">
            <lablel rel="contrast">Contrast: {contrast}</lablel>
            <input 
            type="range"
            id="contrast"
            min={0}
            max={200}
            value={contrast}
            onInput={(e) => handleInput(e)}>
            </input>
        </div>
    )
};

export function Palette({color, contrast, setContrast, palType, setPalType, showHidePalettes}){
    return (
        <div className="palette">
            <SelectPalType
                palType={palType}
                setPalType={setPalType}>               
            </SelectPalType>
            <DispPalette 
                color={color} 
                contrast={contrast} 
                palType={palType}
                showHidePalettes={showHidePalettes}>
            </DispPalette>
            <ModifyPalette 
                contrast={contrast} 
                setContrast={setContrast}>
            </ModifyPalette>
        </div>
    )
};