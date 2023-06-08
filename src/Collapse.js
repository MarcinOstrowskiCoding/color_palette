function eventObjects(element) {
    let parent = document.querySelector('.' + element);
    let collapseContainer = parent.querySelector('.collapse-container');
    let collapseBtn = parent.querySelector('.collapse-btn');
    let eventObjArr = [parent, collapseContainer, collapseBtn]
    return eventObjArr;
}

export function CollapseBtn( {children, containerClass, palType} ) {
    function handleClick({containerClass}) {
        let collapseBtn = eventObjects(containerClass)[2];
        let isExpanded = collapseBtn.textContent === 'collapse' ? true : false
        let eventObject = containerClass;
        isExpanded ? collapse(eventObject) : expand(eventObject);
        autoCollapse(palType, eventObject);
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

function collapse(element) {
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

function collapseAllNonactive(eventObj) {
    let containersClassNames = [
        'color-selector-collapse', 
        'conversions-collapse',
        'palettes-collapse'
    ];
    let collapseClassNames = containersClassNames.filter(name => name !== eventObj);
    collapseClassNames.forEach(element => collapse(element));
}

export function autoCollapse(palType, eventObj) {
    let avaWidth = calcAvailableWidth();
    let avaHeight = calcAvailableHeight();
    avaHeight = avaWidth > 1220 ? avaHeight * 2 : avaHeight;
    let contentHeight = calcContentHeight(palType);
    if (contentHeight > avaHeight) {
        collapseAllNonactive(eventObj);
    }
}

function handleWindowResize() {
    let mainContainer = document.querySelector('.main-app-container');
    if (window.innerWidth < 1080) {
        mainContainer.style.width = 580 + 'px';
    } else {
        mainContainer.style.width = 1080 + 'px';
    }
}