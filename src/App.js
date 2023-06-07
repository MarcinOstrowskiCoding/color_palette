import './App.css';
import { useState, useEffect } from "react";
import { ColorSelector } from './ColorSelector';
import { Palette } from './Palette';
import { ExampleWebApp } from './Example';
import { Settings } from './Settings';
import { Conversions } from './Conversions';
import { CollapseBtn } from './Collapse';
import { autoCollapse } from './Collapse';



function App() {
  const [color, setColor] = useState([0, 50, 50]);
  const [contrast, setContrast] = useState(80);
  const [palType, setPalType] = useState({name: 'monochromatic', hue: [0]});
  const [showHidePalettes, setSHPalettes] = useState('block');
  const [isMouseDown, setIsMouseDown ] = useState(false);
  useEffect(() => {
    autoCollapse(palType, 'color-selector-collapse');
}, [])
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
          >
        </Settings>
        <div className='main-app-container'>
        <CollapseBtn 
          containerClass={'color-selector-collapse'}
          palType={palType}>
          <ColorSelector 
            color={color} 
            setColor={setColor}
            palType={palType}
            isMouseDown={isMouseDown}
            >
          </ColorSelector>
        </CollapseBtn>
        <CollapseBtn 
          containerClass={'conversions-collapse'}
          palType={palType}>
          <Conversions           
            color={color}
            contrast={contrast}
            palType={palType}>
          </Conversions>
        </CollapseBtn>
        <CollapseBtn 
          containerClass={'palettes-collapse'}
          palType={palType}>
          <Palette 
            color={color}
            contrast={contrast}
            setContrast={setContrast}
            palType={palType}
            setPalType={setPalType}
            showHidePalettes={showHidePalettes}>
          </Palette>
        </CollapseBtn>
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