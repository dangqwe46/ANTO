// import { // } from "..//////";
import { IContextBase } from "./contextBase.interface";

export class ContextBase implements IContextBase {
    private static _context: any;
    private static _globalContext: any;
    private static _excutionContext: any;
    private _gridContext: any;
    constructor() {
        ContextBase._globalContext = (window.parent as any)['Xrm']['Utility']['getGlobalContext']();
    }

    init(context: any, _top?: boolean): void {
        try {
            if (context.getFormContext) {
                ContextBase._context = context.getFormContext()
                ContextBase._excutionContext = ContextBase._context;
                if (_top) {
                    if (typeof (top as any).formContext === 'undefined') (top as any).formContext = ContextBase._context;
                }
                else {
                    if (typeof (window as any).formContext === 'undefined') (window as any).formContext = ContextBase._context;
                }
            }
            else {
                this._gridContext = context;
            }

            if (typeof (top as any).consts !== 'undefined') {
                if (typeof (window as any).consts === 'undefined') {
                    (window as any).consts = (top as any).consts
                }
            }
        }
        catch (e) {
            console.log(e)
            //.Error(e.message, "ContextBase.init")
        }
    }

    initFromPrimaryControl(primaryControl: any, _top?: boolean): void {
        try {
            if (typeof ContextBase._context === 'undefined') {
                if (primaryControl) {
                    ContextBase._context = primaryControl;
                    if (_top) {
                        if (typeof (top as any).formContext === 'undefined') (top as any).formContext = ContextBase._context;
                    }
                    else {
                        if (typeof (window as any).formContext === 'undefined') (window as any).formContext = ContextBase._context;
                    }
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    get getPageContext(): any {
        try {
            return Xrm.Utility.getPageContext();
        }
        catch (e) {
            //.Error(e.message, "ContextBase.getPageContext")
        }
    }
    get context(): any {
        return ContextBase._context;
    }
    get globalContext(): any {
        return ContextBase._globalContext;
    }
    get excutionContext(): any {
        return ContextBase._excutionContext;
    }
    get gridContext(): any {
        return this._gridContext
    }
}