import { useEffect } from "react";

function eventObjects(element) {
    let parent = document.querySelector('.' + element);
    let collapseContainer = parent.querySelector('.collapse-container');
    let collapseBtn = parent.querySelector('.collapse-btn');
    let eventObjArr = [parent, collapseContainer, collapseBtn]
    return eventObjArr;
}

export function Collapse( {children, containerClass, palType} ) {
    // useEffect(() => {
    //     collapse('conversions-collapse');
    //     collapse('palettes-collapse');
    //     alert('check how many times im triggered');
    // }, [])
    function handleClick({containerClass}) {
        let collapseBtn = eventObjects(containerClass)[2];
        let isExpanded = collapseBtn.textContent === 'collapse' ? true : false
        let eventObject = containerClass;
        autoCollapse(palType, eventObject);
        isExpanded ? collapse(eventObject) : expand(eventObject);
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

export function collapse(element) {
    let [parent, collapseContainer, collapseBtn] = eventObjects(element);
    parent.style.height = 8 + 'px';
    collapseContainer.style.height = 0 + 'px';
    collapseContainer.style.zIndex = -1;
    collapseBtn.textContent = '';
    collapseBtn.appendChild(document.createTextNode('expand'));
}

function expand(element) {
    let [parent, collapseContainer, collapseBtn] = eventObjects(element);
    parent.style.height = 'auto';
    collapseContainer.style.height = 'auto';
    collapseContainer.style.zIndex = 0;
    collapseBtn.textContent = '';
    collapseBtn.appendChild(document.createTextNode('collapse'));
}

function paletteContainerHeight(palType) {
    if (palType.name)
    if (palType.name === 'monochromatic') {
        return 255 + 14;
    } else if (palType.name === 'complementary') {
        return 387 + 14;
    } else {
        return 519 + 14;
    }
}

function heightAfterEvent(palType, eventElementClass) {
    function isCollapsed(className) {
        let collapseBtn = eventObjects(className)[2];
        let collapsed = collapseBtn.textContent === 'expand' ? true : false;
        collapsed = eventElementClass === className ? !collapsed : collapsed;
        return collapsed;
    }
    let settingsHeight = 51;
    let collapseHeight = 8 + 24;

    let colorHeight = isCollapsed('color-selector-collapse') ? collapseHeight :  454 + 24;
    let convHeight = isCollapsed('conversions-collapse') ? collapseHeight: 254 + 24 ;
    let paletteHeight = paletteContainerHeight(palType);
    paletteHeight = isCollapsed('palettes-collapse') ? collapseHeight : paletteHeight;

    let calcHeight = settingsHeight + colorHeight + convHeight + paletteHeight;
    return calcHeight;
}


function autoCollapse(palType, eventObj) {
    let mainContainer = document.querySelector('.main-app-container');
    let containersClassNames = [
        'color-selector-collapse', 
        'conversions-collapse',
        'palettes-collapse'
    ];
    let collapseClassNames = containersClassNames.filter(name => name !== eventObj);
    let availableWidth = window.screen.width;
    let availableHeight = mainContainer.offsetHeight;
    availableHeight = availableWidth > 1720 ? availableHeight * 2 : availableHeight;
    let contentHeight = heightAfterEvent(palType, eventObj);
    if (contentHeight > availableHeight) {
        collapseClassNames.forEach(element => collapse(element));
    }
}