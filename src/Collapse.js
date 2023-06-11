import { useEffect, useState } from "react";

// to figure out in future: how to declare global variables that
// refer to elements when those elements are still not renedered by react
let mainContainer = undefined;
let settingsContainer = undefined;
let settingsElement = undefined;
let hideExampleText = undefined;
let exampleContainer = undefined;
let appContainer = undefined;

function getLayoutElements(){
    mainContainer = document.querySelector('.main-app-container');
    settingsContainer = document.querySelector('.settings-container');
    settingsElement = document.querySelector('.settings');
    let hideExampleBtn = document.querySelector('.btn-hide-example');
    hideExampleText = hideExampleBtn.textContent;
    exampleContainer = document.querySelector('.ex-body-container');
    appContainer = document.querySelector('.App');
}

function eventObjects(element) {
    let parent = document.querySelector('.' + element);
    let collapseContainer = parent.querySelector('.collapse-container');
    let collapseBtn = parent.querySelector('.collapse-btn');
    let eventObjArr = [parent, collapseContainer, collapseBtn];
    return eventObjArr;
}

export function CollapseBtn( {children, containerClass, palType} ) {
    function handleClick({containerClass}) {
        let collapseBtn = eventObjects(containerClass)[2];
        let isExpanded = collapseBtn.textContent === 'collapse' ? true : false;
        let className = containerClass;
        isExpanded ? collapse(className) : expand(className, palType);
        autoCollapse(className, palType);
    }
    return(
        <div className={containerClass}> 
            <p className="collapse-btn"
                id="collapse-color-selector"
                onClick={() => handleClick({containerClass})}
            >collapse</p>
            <div className="collapse-container">
                {children}  
            </div>
        </div>
    )
}

function collapse(className) {
    let [parent, collapseContainer, collapseBtn] = eventObjects(className);
    parent.style.height = '8px';
    collapseContainer.style.height = '0px';
    collapseContainer.style.opacity = '0';
    collapseBtn.textContent = '';
    collapseBtn.appendChild(document.createTextNode('expand'));
}

export function expand(className, palType) {
    let [parent, collapseContainer, collapseBtn] = eventObjects(className);
    let containerHeight = getCollapseContainerHeight(className, palType);
    parent.style.height = `${containerHeight}px`;
    let margins = 12;
    collapseContainer.style.height = `${containerHeight - margins}px`;
    collapseContainer.style.opacity = '1';
    collapseBtn.textContent = '';
    collapseBtn.appendChild(document.createTextNode('collapse'));
}

function paletteContainerHeight(palType) {
    if (palType.name === 'monochromatic') {
        return 255 + 14;
    } else if (palType.name === 'complementary') {
        return 387 + 14;
    } else {
        return 519 + 14;
    }
}

function getCollapseContainerHeight(className, palType) {
    if (className === 'color-selector-collapse') {
        return 454;
    } else if (className === 'conversions-collapse') {
        return 254;
    } else {
        let margin = 14
        let containerHeight = paletteContainerHeight(palType) - margin;
        return containerHeight;
    }
}

function isCollapsed(className) {
    let collapseBtn = eventObjects(className)[2];
    let collapsed = collapseBtn.textContent === 'expand' ? true : false;
    return collapsed;
}

function calcContentHeight(palType) {
    let settingsHeight = 51;
    let collapseHeight = 8 + 24;
    let colorHeight = isCollapsed('color-selector-collapse') ? collapseHeight :  454 + 24;
    let convHeight = isCollapsed('conversions-collapse') ? collapseHeight: 254 + 24 ;
    let paletteHeight = paletteContainerHeight(palType);
    paletteHeight = isCollapsed('palettes-collapse') ? collapseHeight : paletteHeight;

    let calcHeight = settingsHeight + colorHeight + convHeight + paletteHeight;
    return calcHeight;
}

function calcAvailableWidth() {
    let root = document.querySelector('#root');
    let example = document.querySelector('.ex-body-container');
    let exampleBtn = document.querySelector('#btn-hide-example');
    let exampleWidth = example.offsetWidth;
    exampleWidth = exampleBtn.textContent === 'show example page' ? 0 : exampleWidth
    let availableWidth = root.offsetWidth - exampleWidth;
    return availableWidth;
}

function calcAvailableHeight() {
    let mainContainer = document.querySelector('.main-app-container');
    let availableHeight = mainContainer.offsetHeight;
    return availableHeight;
}

function collapseAllNonactive(className) {
    let containersClassNames = [
        'color-selector-collapse', 
        'conversions-collapse',
        'palettes-collapse'
    ];
    let collapseClassNames = containersClassNames.filter(name => name !== className);
    collapseClassNames.forEach(element => collapse(element));
}

export function autoCollapse(className, palType) {
    let avaWidth = calcAvailableWidth();
    let avaHeight = calcAvailableHeight();
    avaHeight = avaWidth > 1080 ? avaHeight * 2 : avaHeight;
    let contentHeight = calcContentHeight(palType);
    if (contentHeight > avaHeight) {
        collapseAllNonactive(className);
    }
}

export function expandAll(palType) {
    let containersClassNames = [
        'color-selector-collapse', 
        'conversions-collapse',
        'palettes-collapse'
    ];
    containersClassNames.forEach(className => expand(className, palType));
}

export function changeLayoutOnResize(palType) {
    getLayoutElements();
    let avaWidth = calcAvailableWidth();
    if (avaWidth < 1080) {
        setMainAppLayoutToOneColumn(palType);
    } else {
        setMainAppLayoutToTwoColumns(palType);
    }
}

export function changeLayoutOnExampleHide(palType) {
    getLayoutElements();
    if (hideExampleText === 'hide example page') {
        moveContentOutOffScreen();
        setTimeout(() => setMainAppLayoutToTwoColumns(palType), 380);
        setTimeout(() => moveContentBackOnScreen(), 600);
        setTimeout(() => setTransitionPropTo('top'), 2000);
    } else {
        moveContentOutOffScreen();
        setTimeout(() => setMainAppLayoutToOneColumn(palType), 380);
        setTimeout(() => moveContentBackOnScreen(), 600);
    }
}

function moveContentOutOffScreen() {
    mainContainer.style.top = '150vh';
    exampleContainer.style.top = '150vh';
    // mainContainer.style.transitionProperty = 'all';
    mainContainer.style.transitionProperty = 'top';
    appContainer.style.backgroundColor = 'hsl(220, 13%, 14%)';
}

function moveContentBackOnScreen() {
    mainContainer.style.top = '0vh';
    exampleContainer.style.top = '0vh';
    // mainContainer.style.transitionProperty = 'all';
    mainContainer.style.transitionProperty = 'top';
    appContainer.style.backgroundColor = '#282c34';
    //#282c34
}

function setTransitionPropTo(propValue) {
    mainContainer.style.transitionProperty = propValue;
}

function setMainAppLayoutToTwoColumns(palType) {
    mainContainer.style.width = '1080px';
    mainContainer.style.height = '90vh';
    mainContainer.style.flexWrap = 'wrap';
    settingsContainer.style.flexDirection = 'row';
    settingsContainer.style.margin = '4px 8px';
    settingsElement.style.gap = '8px';
    settingsElement.style.height = '30px';
    settingsElement.style.margin = '0px 6px 0px auto';
    expandAll(palType);
}

function setMainAppLayoutToOneColumn(palType) {
    let avaHeight = calcAvailableHeight();
    let contentHeight = calcContentHeight(palType);
    mainContainer.style.width = '540px';
    mainContainer.style.height = '88vh';
    mainContainer.style.flexWrap = 'nowrap';
    settingsContainer.style.flexDirection = 'column';
    settingsContainer.style.margin = '12px 8px';
    settingsElement.style.gap = '2px';
    settingsElement.style.height = '24px';
    settingsElement.style.margin = '0px 6px';
    if (contentHeight > avaHeight) {
        collapseAllNonactive('color-selector-collapse');
    };
}

export function ListenToResize( {palType} ) {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    useEffect(()=> {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
            changeLayoutOnResize(palType);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    
    })
    return <div></div>
}