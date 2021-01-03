
const POSITIONS = {
    TOP: 'top',
    LEFT: 'left',
    BOTTOM: 'bottom',
    RIGHT: 'right',
    AUTOLEFT: 'auto-left',
    AUTORIGHT: 'auto-right'
};

var myLibrary = {
    onload: function() {
        let tooltipElements = document.querySelectorAll('[data-toggle="tooltip"]');
        tooltipElements.forEach((elem) => {
            elem.addEventListener('mouseover', () => {
                let title = elem.getAttribute('title');
                this.createTooltip(title,elem.getBoundingClientRect());
            });
            elem.addEventListener('mouseout', () => {
                this.removeTooltip();
            });
        });
    },
    createTooltip: function(title,elemCoords) {
        let wrapper = document.getElementsByTagName("body")[0];
        let tooltipElem = document.createElement("div");
            tooltipElem.classList.add('tooltip');
            tooltipElem.innerHTML = '<div class="arrow"></div><div class="tooltip-inner">'+title+'</div>';
            wrapper.appendChild(tooltipElem);
        let tooltipElemCoordinates = {
            width: tooltipElem.clientWidth,
            height: tooltipElem.clientHeight
        }
        let tooltipPlacement = this.getTooltipPlacement(elemCoords, tooltipElemCoordinates);
        this.applyTooltipStyles(tooltipPlacement, tooltipElemCoordinates, elemCoords, tooltipElem);
    },
    removeTooltip: function() {
        const elem = document.querySelector('.tooltip');
        elem.remove();
    },
    getTooltipPlacement: function(coords, tooltipElemCoords) {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let tooltipPos = null;
        let elemTop = coords.top;
        let elemLeft = coords.left;
        let elemRight = coords.right;
        if((tooltipElemCoords.width + 10 < (windowWidth - elemRight)) && (elemTop - (tooltipElemCoords.height/2) + (coords.height/2) > 10) && (window.innerHeight > elemTop+(coords.height/2)+(tooltipElemCoords.height/2))) {
            tooltipPos = POSITIONS.RIGHT;
        } else if(tooltipElemCoords.width + 10 < elemLeft && (elemTop - (tooltipElemCoords.height/2) + (coords.height/2) > 10) && (window.innerHeight > elemTop+(coords.height/2)+(tooltipElemCoords.height/2))) {
            tooltipPos = POSITIONS.LEFT;
        } else if(elemTop - tooltipElemCoords.height > 30 && (coords.left + (coords.width/2) - (tooltipElemCoords.width /2) > 10) && (coords.right - (coords.width/2)+ (tooltipElemCoords.width/2) < windowWidth)) {
            tooltipPos = POSITIONS.TOP;
        } else if((elemTop + coords.height + tooltipElemCoords.height) < windowHeight && (coords.left + (coords.width/2) - (tooltipElemCoords.width /2) > 10) && (coords.right - (coords.width/2)+ (tooltipElemCoords.width/2) < windowWidth)) {
            tooltipPos = POSITIONS.BOTTOM;
        } else if((tooltipElemCoords.width + 10 < (windowWidth - elemRight))) {
            tooltipPos = POSITIONS.AUTORIGHT;
        } else if(tooltipElemCoords.width + 10 < elemLeft) {
            tooltipPos = POSITIONS.AUTOLEFT;
        }
        return tooltipPos;
    },
    applyTooltipStyles: function(tooltipPlacement, tooltipElemCoordinates, elemCoords, tooltipElem) {
        let windowHeight = window.innerHeight;
        let offsetTop = window.pageYOffset;
        let offsetLeft = window.pageXOffset;
        let left= 0,top =0;
        switch (tooltipPlacement) {
            case POSITIONS.TOP: 
                top = offsetTop + elemCoords.top - tooltipElemCoordinates.height - 10;
                left = offsetLeft + elemCoords.left + (elemCoords.width/2) - (tooltipElemCoordinates.width/2);
                tooltipElem.classList.add(POSITIONS.TOP);
                break;

            case POSITIONS.BOTTOM: 
                top = offsetTop + elemCoords.top + elemCoords.height + 10;
                left = offsetLeft + elemCoords.left + (elemCoords.width/2) - (tooltipElemCoordinates.width/2);
                tooltipElem.classList.add(POSITIONS.BOTTOM);
                break;

            case POSITIONS.LEFT: 
                top = offsetTop + elemCoords.top + (elemCoords.height/2) - (tooltipElemCoordinates.height/2);
                left = offsetLeft + elemCoords.left - tooltipElemCoordinates.width - 10;
                tooltipElem.classList.add(POSITIONS.LEFT);
                break;

            case POSITIONS.RIGHT: 
                top = offsetTop + elemCoords.top + (elemCoords.height/2) - (tooltipElemCoordinates.height/2);
                left = offsetLeft + elemCoords.right + 10;
                tooltipElem.classList.add(POSITIONS.RIGHT);
                break;

            case POSITIONS.AUTORIGHT: {
                let adjustTop = 0;
                if( elemCoords.top - (tooltipElemCoordinates.height/2) + (elemCoords.height/2)  < 0 ) {
                    adjustTop = (elemCoords.top - (tooltipElemCoordinates.height/2) + (elemCoords.height/2) )*-1 + 5;
                } else if( elemCoords.top + (elemCoords.height/2) - windowHeight + (tooltipElemCoordinates.height/2) >  0) {
                    adjustTop = (elemCoords.top + (elemCoords.height/2) - windowHeight + (tooltipElemCoordinates.height/2))*-1 - 5;
                }
                top = offsetTop + elemCoords.top + (elemCoords.height/2) - (tooltipElemCoordinates.height/2) + adjustTop;
                left = offsetLeft + elemCoords.right + 10;
                tooltipElem.classList.add(POSITIONS.RIGHT);
                break;
            }

            case POSITIONS.AUTOLEFT: {
                let adjustTop = 0;
                if( elemCoords.top - (tooltipElemCoordinates.height/2) + (elemCoords.height/2)  < 0 ) {
                    adjustTop = (elemCoords.top - (tooltipElemCoordinates.height/2) + (elemCoords.height/2) )*-1 + 5;
                } else if( elemCoords.top + (elemCoords.height/2) - windowHeight + (tooltipElemCoordinates.height/2) >  0) {
                    adjustTop = (elemCoords.top + (elemCoords.height/2) - windowHeight + (tooltipElemCoordinates.height/2))*-1 - 5;
                }
                top = offsetTop + elemCoords.top + (elemCoords.height/2) - (tooltipElemCoordinates.height/2)+ adjustTop;
                left = offsetLeft + elemCoords.left - tooltipElemCoordinates.width - 10;
                tooltipElem.classList.add(POSITIONS.LEFT);
                break;
            }
        
            default:
                break;
        }

        tooltipElem.style.top = top+'px';
        tooltipElem.style.left = left+'px';
    }
}


window.onload = function() {
    myLibrary.onload();
}