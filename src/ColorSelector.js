import { useState } from "react";

export function ColorSelector({color, setColor, palType, isMouseDown }) {
    return(
        <div className="color-selector">
            <div className="color-selector-container"
                id="color-selector-container">
                <ColorWheel
                    color={color}
                    setColor={setColor}
                    palType={palType}
                    isMouseDown={isMouseDown}>
                </ColorWheel>
                <Sliders 
                    color={color} 
                    setColor={setColor}>
                </Sliders>
            </div>
        </div>
    )
}

function Sliders({color, setColor }) {
    function handleInput(e, index) {
        let newValue = Number(e.target.value);
        let newColor = color.map((c,i) => {
            if (i === index) {
                return newValue;
            } else {
                return c;
            }
        });
        return setColor(newColor);
    }    
    return (
        <div>
            <div className="slider sat">
                <label rel="sat">S: {color[1]}</label>
                <input 
                    type="range" 
                    min={0} 
                    max={100}
                    id="sat"
                    value={color[1]}
                    onInput={(e) => handleInput(e, 1)}
                ></input>
            </div>

            <div className="slider light">
                <label rel="light">L: {color[2]}</label>
                <input 
                    type="range" 
                    min={0} 
                    max={100}
                    id="light"
                    value={color[2]}
                    onInput={(e) => handleInput(e, 2)}
                ></input>
            </div>
        </div>
    )
}

export let paletteHues = [
    {name: 'monochrome', angle: 0},
    {name: 'complementary', angle: 180}, 
    {name: 'triadical1', angle: -120},
    {name: 'triadical2', angle: 120},
    {name: 'analogus1', angle: -30},
    {name: 'analogus2', angle: 30},
    {name: 'neutral1', angle: -15},
    {name: 'neutral2', angle: 15},
    {name: 'custom', angle: 0}
];


function drawDotsOnCircle(calcHue, vecAB, vecAC, palType) {
    let r = 250/2;
    let centerX = 142;
    let centerY = 142;
    function calcXY(angle) {
        return { x: (-1 * r * Math.sin(Math.PI * 2 * angle / 360)) + centerX, 
                 y: r * Math.cos(Math.PI * 2 * angle / 360) + centerY }
    }
    paletteHues.map((dot)=>{
        let newAngle = calcHue(vecAB, vecAC) + 180;
        let dotCoords = calcXY(newAngle + dot.angle);
        let dotElement = document.querySelector(`.dot-${dot.name}`);
        dotElement.style.left = dotCoords.x + 'px';
        dotElement.style.top = dotCoords.y + 'px';
        dotElement.style.position = 'absolute';
        dotElement.style.height =  16 + 'px';
        dotElement.style.width =  16 + 'px';
        dotElement.style.borderRadius =  50 + '%';
        dotElement.style.zIndex = 3;
        dotElement.style.border = '1px solid gray';
        dotElement.style.backgroundColor = 'hsla(0, 0%, 40%, 0.5)';
        dotElement.style.visibility = 'hidden';
        if (dot.name === "monochrome") {
            dotElement.style.backgroundColor = 'hsla(0, 0%, 80%, 0.7)';
            dotElement.style.border = '1px solid white';
            dotElement.style.visibility = 'visible';
        }
        if (dot.name === palType.name 
            || dot.name === palType.name + '1'
            || dot.name === palType.name + '2' ) {
            dotElement.style.visibility = 'visible';
        }
    })
}

function multiplyVectors(vecAB, vecAC) {
    return vecAB[0] * vecAC[0] + vecAB[1] * vecAC[1];
}
function magnitude(vector) {
    return Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1]));
}
function calcCosVal(vecAB, vecAC) {
    return multiplyVectors(vecAB, vecAC) / (magnitude(vecAB) * magnitude(vecAC));
}
function calcAngleDegrees(vecAB, vecAC) {
    let radians = Math.acos(calcCosVal(vecAB, vecAC));
    let pi = Math.PI;
    return Math.round(radians * (180/pi));
}

function ColorWheel({ color, setColor, palType, isMouseDown }) {
    const [coords, setCoords] = useState({x:150, y:150});
    function getHueFromWheel(e) {
        let newColor = [...color];
        let newHue = calcHue(vecAB, vecAC);
        let parent = document.querySelector('.color-wheel');
        let element = parent.getBoundingClientRect();
        let elementX = Math.round(element.left);
        let elementY = Math.round(element.top);
        newColor[0] = newHue;
        setCoords({x: e.clientX - elementX, y: e.clientY - elementY});
        setColor(newColor);
        drawDotsOnCircle(calcHue, vecAB, vecAC, palType);
    }
    function handleMouseMove(e) {
        if (isMouseDown) {getHueFromWheel(e)};
    }
    function handleMouseDown(e) {
        getHueFromWheel(e);
    }
    function handleMouseUp(e) {
        getHueFromWheel(e);
    }
    // setting ABC triangle to get Hue from AB AC angle degrees
    // A is circle center, B is mouse position, C is at the bottom of Y axis
    let a = {x:150, y:150};
    let b = {...coords};
    let c = {x:150, y:0};
    let vecAB = [a.x - b.x, a.y - b.y];
    let vecAC = [a.x - c.x, a.y - c.y];
    function calcHue(vecAB, vecAC) {
        let deg = calcAngleDegrees(vecAB, vecAC);
        if (b.x > 150) {
            return deg;
        } else if (b.x < 150) {
            return 360 - deg;
        } else if (b.x === 150 && b.y > 150) {
            return 180;
        } else {
            return 0;
        }
    }
    
    return (
        <>
        <div className="color-wheel"
            onMouseMove={(e)=>handleMouseMove(e)}
            onMouseDown={(e)=>handleMouseDown(e)}
            onMouseUp={(e)=>handleMouseUp(e)}
            >
            {/* {paletteHues.map((dot)=>(
                <div
                className={`.dot-${dot.name}`}
                >
                </div>
            ))} */}
            {/* TODO: figure out why below happens:
                creating below divs via .map() Method makes them being rendered after 
                functions in this component events. This breaks the code by assigning null to 
                document.queryselector that targets below divs*/}
            <div className="dot dot-monochrome"></div>
            <div className="dot dot-complementary"></div>
            <div className="dot dot-triadical1"></div>
            <div className="dot dot-triadical2"></div>
            <div className="dot dot-analogus1"></div>
            <div className="dot dot-analogus2"></div>
            <div className="dot dot-neutral1"></div>
            <div className="dot dot-neutral2"></div>
            <div className="dot dot-custom"></div>
            <div className="dot dot-constructor"></div>
            <div className="color-wheel-center">
                <p>color[0]: {color[0]}</p>
                <p>calcHue {calcHue(vecAB, vecAC)}</p>
                <p>coords: {`${b.x}, ${b.y}`}</p>
                <p>coords: {`${c.x}, ${c.y}`}</p>
            </div>
        </div>
        </>
    )
}