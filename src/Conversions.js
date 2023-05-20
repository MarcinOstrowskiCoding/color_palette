import { getColors, getHSL } from './Palette.js';

// below modified version of function hslToHex by icl7126
function hslToHex(hslArr) {
  let [h, s, l] = hslArr;
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  }
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Input parameters is H: [0, 360], S: [0, 100], L: [0, 100].
// Output values is [0, 255].
function hslToRgb(hslArr) {
  let [h, s, l] = hslArr;
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  let calcH = Math.round(255 * f(0));
  let calcS = Math.round(255 * f(8));
  let calcL = Math.round(255 * f(4));
  return [`rgb(${calcH}, ${calcS}, ${calcL})`];
};

export function Conversions( {color, contrast, palType} ) {
  let colorNames = ['base', 'light', 'mid light', 'mid dark', 'dark'];
  function buildPaletteNo(num) {
    let hueModifier = palType.hue[num];
    let newPalette = getColors(hueModifier, color, contrast);
    return newPalette;
  }
  function handleClick(e) {
    let copyValue = e.target.innerHTML;
    navigator.clipboard.writeText(copyValue);
  }
  return (
    <div className="palettes-conv-container">
      {buildPaletteNo(0).map((col, i)=> {
        return (
          <>
            <div className="conv-container">
              <p className='conv-container-label'>{colorNames[i]}:</p>
              <p className="hex copy-on-click"
                 onClick={(e) => handleClick(e)}>{hslToHex(col)}
                  <span className='tooltip-text'>copied!</span>
              </p>
              <p className="rgb copy-on-click"
                 onClick={(e) => handleClick(e)}>{hslToRgb(col)}
                  <span className='tooltip-text'>copied!</span>
              </p>
              <p className="hsl copy-on-click"
                 onClick={(e) => handleClick(e)}>{getHSL(col)}
                  <span className='tooltip-text'>copied!</span>
              </p>
            </div>
          </>
        )
      })}
    </div>
  )
}