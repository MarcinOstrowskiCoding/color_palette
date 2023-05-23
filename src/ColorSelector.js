import { useState } from "react";

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

// function DispColor({color, showHidePalettes }) {
//     let [hue, sat, light] = [...color];
//     return(
//         <div 
//             className="disp-color"
//             style={{background: `hsl(${hue}, ${sat}%, ${light}%)`,
//                     display: showHidePalettes}}>
//         </div>
//     )
// }

export function ColorSelector({color, setColor, showHidePalettes, isMouseDown }) {
    return(
        <div className="color-selector">
            <div className="color-selector-container"
                id="color-selector-container">
                <ColorWheel
                    color={color}
                    setColor={setColor}
                    isMouseDown={isMouseDown}>
                </ColorWheel>
                {/* <DispColor 
                    color={color}
                    showHidePalettes={showHidePalettes}>
                </DispColor> */}
                <Sliders 
                    color={color} 
                    setColor={setColor}>
                </Sliders>
            </div>
        </div>
    )
}

function ColorWheel({color, setColor, isMouseDown }) {
    function getCoordsOnCircle() {
        let angleMono = calcHue(vecAB, vecAC) + 180;
        let angleComp = angleMono -180;
        let r = 250/2;
        let centerX = 142;
        let centerY = 142;
        function calcXY(angle) {
            return { x: (-1 * r * Math.sin(Math.PI * 2 * angle / 360)) + centerX, 
                     y: r * Math.cos(Math.PI * 2 * angle / 360) + centerY}
        }
        let monoCoords = calcXY(angleMono);
        let ptMono = document.querySelector('.dot-monohrome');
        ptMono.style.left = monoCoords.x + 'px';
        ptMono.style.top = monoCoords.y + 'px';
        let contCoords = calcXY(angleComp);
        let ptComp = document.querySelector('.dot-complementary');
        ptComp.style.left = contCoords.x + 'px';
        ptComp.style.top = contCoords.y + 'px';
    }
    const [coords, setCoords] = useState({x:150, y:150});
    function getHueFromWheel(e) {
        let newColor = [...color];
        let newHue = calcHue(vecAB, vecAC);
        let parent = document.querySelector('.color-wheel');
        let element = parent.getBoundingClientRect();
        let elementX = Math.round(element.left);
        let elementY = Math.round(element.top);
        newColor[0] = newHue;
        getCoordsOnCircle();
        setColor(newColor);
        setCoords({x: e.clientX - elementX, y: e.clientY - elementY});
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
    // A is circle center, B is mouse position, C is relative to A and B
    let a = {x:150, y:150};
    let b = {...coords};
    let c = {x:b.x, y:a.y};
    let vecAB = [a.x - b.x, a.y - b.y];
    let vecAC = [a.x - c.x, a.y - c.y];

    function multiplyVectors(vecAB, vecAC) {
        return Math.abs(vecAB[0] * vecAC[0]) + Math.abs(vecAB[1] * vecAC[1]);
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
    function calcHue(vecAB, vecAC) {
        let deg = calcAngleDegrees(vecAB, vecAC);
        // calculations differ based on circle quadrants
        // circle center coords are: x:150, y:150
        if (b.x > 150 && b.y < 150) {
            return Math.abs(90 - deg);
        } else if (b.x > 150 && b.y > 150) {
            return deg + 90;
        } else if (b.x < 150 && b.y > 150) {
            return Math.abs(90 - deg) + 180;
        } else if (b.x < 150 && b.y < 150) {
            return deg + 270;
        } else if (b.x === 150 && b.y < 150) {
            return 0;
        } else if (b.x > 150 && b.y === 150) {
            return 90;
        } else if (b.x === 150 && b.y > 150) {
            return 180;
        } else if (b.x < 150 && b.y === 150) {
            return 270;
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
            <div className="dot dot-monohrome"></div>
            <div className="dot dot-complementary"></div>
            <div className="dot dot-triadical"></div>
            <div className="dot dot-constructor"></div>
            <div className="color-wheel-center">
                <p>color[0]: {color[0]}</p>
                <p>calcHue {calcHue(vecAB, vecAC)}</p>
                {/* <p>coords: {`${getCoordsOnCircle(color).x}, ${getCoordsOnCircle(color).y}`}</p> */}
                <p>coords: {`${b.x}, ${b.y}`}</p>
                <p>coords: {`${c.x}, ${c.y}`}</p>

            </div>
        </div>
        </>
    )
}