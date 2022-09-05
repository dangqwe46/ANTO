const devtools = {
    isOpen: false,
    orientation: undefined
};

const threshold = 160;

const emitEvent = (isOpen: boolean, orientation: any) => {
    (top?.window as any).dispatchEvent(new CustomEvent('devtoolschange', {
        detail: {
            isOpen,
            orientation
        }
    }));
};


export const DevTool = ({ emitEvents = true } = {}) => {
    const widthThreshold = (top?.window as any).outerWidth - (top?.window as any).innerWidth > threshold;
    const heightThreshold = (top?.window as any).outerHeight - (top?.window as any).innerHeight > threshold;
    const orientation: any = widthThreshold ? 'vertical' : 'horizontal';
    if (
        !(heightThreshold && widthThreshold) &&
        (((top?.window as any).Firebug && (top?.window as any).Firebug.chrome && (top?.window as any).Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
    ) {
        if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
            emitEvent(true, orientation);
        }

        devtools.isOpen = true;
        devtools.orientation = orientation;
    } else {
        if (devtools.isOpen && emitEvents) {
            emitEvent(false, undefined);
        }

        devtools.isOpen = false;
        devtools.orientation = undefined;
    }
    (window as any).devtools = devtools
};
