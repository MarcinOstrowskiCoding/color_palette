export function Collapse( {children, containerClass} ) {
    function handleClick({containerClass}) {
        let parent = document.querySelector('.' + containerClass);
        let collapseContainer = parent.querySelector('.collapse-container');
        let collapseBtn = parent.querySelector('.collapse-btn');
        if (collapseBtn.textContent === 'collapse') {
            parent.style.height = 8 + 'px';
            collapseContainer.style.height = 0 + 'px';
            collapseContainer.style.zIndex = -1;
            collapseBtn.textContent = '';
            collapseBtn.appendChild(document.createTextNode('expand'));
        } else {
            parent.style.height = 'auto';
            collapseContainer.style.height = 'auto';
            collapseContainer.style.zIndex = 0;
            collapseBtn.textContent = '';
            collapseBtn.appendChild(document.createTextNode('collapse'));
        }
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