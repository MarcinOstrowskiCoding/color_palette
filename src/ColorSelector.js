import { useState, useRef } from "react";

// const reducer = (state, action) => {
//     switch(action.type) {
//       case "Increment":
//         return state + 1;
//       default:
//         return state;
//     }
//   }

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
            <div className="slider hue">
                <label rel="hue">H: {color[0]}</label>
                <input 
                    type="range" 
                    min={0} 
                    max={360} 
                    id="hue"
                    value={color[0]}
                    onInput={(e) => handleInput(e, 0)}
                ></input>
            </div>

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

function DispColor({color, showHidePalettes }) {
    let [hue, sat, light] = [...color];
    return(
        <div 
            className="disp-color"
            style={{background: `hsl(${hue}, ${sat}%, ${light}%)`,
                    display: showHidePalettes}}>
        </div>
    )
}

export function ColorSelector({color, setColor, showHidePalettes }) {
    return(
        <div className="color-selector">
            <div className="color-selector-container"
                id="color-selector-container">
                <ColorWheel
                    color={color}
                    setColor={setColor}>
                </ColorWheel>
                <DispColor 
                    color={color}
                    showHidePalettes={showHidePalettes}>
                </DispColor>
                <Sliders 
                    color={color} 
                    setColor={setColor}>
                </Sliders>
            </div>
        </div>
    )
}


function ColorWheel({color, setColor }) {
    const intervalRef = useRef(null);
    const [coords, setCoords] = useState({x:50, y:300});
    // const [count, setCount] = useState(0);
    
    function onHold(e){
        let newColor = [...color];
        let newHue = calcHue(vecAB, vecAC);
        let parent = document.querySelector('.color-wheel');
        let element = parent.getBoundingClientRect();
        let elementX = Math.round(element.left);
        let elementY = Math.round(element.top);
        newColor[0] = newHue;
        setColor(newColor);
        setCoords({x: e.clientX - elementX, y: e.clientY - elementY});
        // setCount((count) => count + 1);
    }
    function onMouseDown(e){
        if (intervalRef.current) return;
        intervalRef.current = setInterval(onHold, 50, e);        
    }
    function stopCounter() {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
    };
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
            onMouseDown={(e)=>onMouseDown(e)}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}>
            <div className="color-wheel-center">
                <p>hue:</p>
                {/* <p>counter: {count}</p> */}
                <p>coords: {`${a.x}, ${a.y}`}</p>
                <p>coords: {`${b.x}, ${b.y}`}</p>
                <p>coords: {`${c.x}, ${c.y}`}</p>
                <p>{calcHue(vecAB, vecAC)}</p>
                <div className="dot dot-monohrome"></div>
                <div className="dot dot-complementary"></div>
                <div className="dot dot-triadical"></div>
            </div>
        </div>
                
        </>
    )
}