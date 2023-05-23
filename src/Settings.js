export function Settings({color, contrast, palType, setColor, setContrast, setPalType, setSHPalettes, showHidePalettes}){
    return (
        <div className="settings-container">
            <p><span>dev</span> PALETTE TOOLS</p>
            <div className="settings">
                <HideExamplePage>
                </HideExamplePage>
                <Reset
                    setColor={setColor}
                    setContrast={setContrast}
                    setPalType={setPalType}
                    setSHPalettes={setSHPalettes}>
                </Reset>
                <Save>
                </Save>
                <Load
                    setColor={setColor}
                    setContrast={setContrast}
                    setPalType={setPalType}>
                </Load>
            </div>
        </div>
    )
}

function Reset( {setColor, setContrast, setPalType, setSHPalettes} ) {
    function handleClick() {
        let selPal = document.getElementById('sel-pal-def-option');
        selPal.selected = true;
        setColor([0, 50, 50]);
        setContrast(80);
        setPalType({name: 'monohromatic', hue: [0]});
        setSHPalettes('block')
    }
    return (
        <button 
            className="btn"
            id="btn-reset"
            onClick={handleClick}
            >reset
        </button>
    )
}

function Save( {color, cotrast, palType} ) {
    function handleClick() {
        return //nada atm
    }
    return (
        <button
            className="btn btn-save"
            id="btn-save"
            onClick={handleClick}>
            save
        </button>
    )
}

function Load( {setColor, setContrast, setPalType} ) {
    function handleClick() {
        return //nada atm
    }
    return (
        <button
            className="btn btn-load"
            id="btn-load"
            onClick={handleClick}>
            load
        </button>
    )
}

function HideExamplePage() {
    function handleClick() {
        let example = document.querySelector('#ex-body');
        let btn = document.querySelector('#btn-hide-example');
        if (example.style.display === 'none') {
            example.style.display = 'flex';
            btn.textContent = '';
            btn.appendChild(document.createTextNode('hide example page'));
        } else {
            example.style.display = 'none';
            btn.textContent = '';
            btn.appendChild(document.createTextNode('show example page'));
        }
    }
    return (
        <button
            className="btn btn-hide-example"
            id="btn-hide-example"
            onClick={handleClick}>
            hide example page
        </button>
    )
}

// function HidePalettes( {showHidePalettes, setSHPalettes} ) {
//     function handleClick() {
//         let btn = document.getElementById('btn-show-hide-pal');
//         if (showHidePalettes === 'block') {
//             setSHPalettes('none');
//             btn.innerHTML = 'show palettes';
//         } else {
//             setSHPalettes('block');
//             btn.innerHTML = 'hide palettes';
//         }
//     }
//     return (
//         <>
//             <button 
//                 className="btn btn-show-pal"
//                 id='btn-show-hide-pal' 
//                 onClick={handleClick}
//             >hide palettes</button>
//         </>
//     )
// }

// function ShowColorWheel() {
//     function handleClick() {
//         return //nada atm
//     }
//     return (
//         <button
//             className="btn btn-show-colorwheel"
//             id="btn-show-colorwheel"
//             onClick={handleClick}>
//             show color wheel
//         </button>
//     )
// }