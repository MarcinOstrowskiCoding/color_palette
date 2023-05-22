import './App.css';
import { useState } from "react";
import { ColorSelector } from './ColorSelector';
import { Palette } from './Palette';
import { ExampleWebApp } from './Example';
import { Settings } from './Settings';
import { Conversions } from './Conversions';
import { Collapse } from './Collapse';



function App() {
  const [color, setColor] = useState([0, 50, 50]);
  const [contrast, setContrast] = useState(80);
  const [palType, setPalType] = useState({name: 'monohromatic', hue: [0]});
  const [showHidePalettes, setSHPalettes] = useState('block');
  const [isMouseDown, setIsMouseDown ] = useState(false);
  function handleMouseDown() {
    setIsMouseDown(true);
  }
  function handleMouseUp() {
    setIsMouseDown(false);
  }
  return (
    <div className='App'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      <div>
        <Settings 
          color={color}
          contrast={contrast}
          palType={palType}
          setColor={setColor}
          setContrast={setContrast}
          setPalType={setPalType}
          setSHPalettes={setSHPalettes}
          showHidePalettes={showHidePalettes}>
        </Settings>
        <div className='main-app-container'>
        <Collapse containerClass={'color-selector-collapse'}>
          <ColorSelector 
            color={color} 
            setColor={setColor}
            showHidePalettes={showHidePalettes}
            isMouseDown={isMouseDown}
            >
          </ColorSelector>
        </Collapse>
        <Collapse containerClass={'conversions-collapse'}>
          <Conversions           
            color={color}
            contrast={contrast}
            palType={palType}>
          </Conversions>
        </Collapse>
        <Collapse containerClass={'palettes-collapse'}>
          <Palette 
            color={color}
            contrast={contrast}
            setContrast={setContrast}
            palType={palType}
            setPalType={setPalType}
            showHidePalettes={showHidePalettes}>
          </Palette>
        </Collapse>
        </div>
      </div>
      <ExampleWebApp 
        color={color} 
        contrast={contrast}
        palType={palType}>
      </ExampleWebApp>
    </div>
  );
}
export default App;