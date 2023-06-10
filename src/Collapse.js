import { useEffect, useState } from "react";

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

function expandAll(palType) {
    let containersClassNames = [
        'color-selector-collapse', 
        'conversions-collapse',
        'palettes-collapse'
    ];
    containersClassNames.forEach(className => expand(className, palType));
}

export function changeLayoutOnResize(palType) {
    let mainContainer = document.querySelector('.main-app-container');
    let settingsContainer = document.querySelector('.settings-container');
    let settingsEle = document.querySelector('.settings');
    let avaHeight = calcAvailableHeight();
    let avaWidth = calcAvailableWidth();
    let contentHeight = calcContentHeight(palType);
    if (avaWidth < 1080) {
        mainContainer.style.width = '540px';
        mainContainer.style.height = '88vh';
        mainContainer.style.flexWrap = 'nowrap';
        settingsContainer.style.flexDirection = 'column';
        settingsContainer.style.margin = '12px 8px';
        settingsEle.style.gap = '2px';
        settingsEle.style.height = '24px';
        settingsEle.style.margin = '0px 6px';
        if (contentHeight > avaHeight) {
            collapseAllNonactive('color-selector-collapse');
        }
    } else {
        mainContainer.style.width = '1080px';
        mainContainer.style.height = '90vh';
        mainContainer.style.flexWrap = 'wrap';
        settingsContainer.style.flexDirection = 'row';
        settingsContainer.style.margin = '4px 8px';
        settingsEle.style.gap = '8px';
        settingsEle.style.height = '30px';
        settingsEle.style.margin = '0px 6px 0px auto';
        expandAll(palType);
    }
}

export function NewComponent( {palType} ) {
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