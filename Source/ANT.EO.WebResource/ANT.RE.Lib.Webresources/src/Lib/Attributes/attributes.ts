import { Constants } from '../../Constant/constants';
import { Attribute } from './Attribute/attribute';
class Attributes {

    private constructor() { }
    private static _instance: Attributes;
    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    getAttribute(name: string) {
        return new Attribute(name);
    }

    setRequiredLevels(attrs: string[], requirementLevel: Constants.RequiredLevel) {
        try {
            if (attrs && Array.isArray(attrs)) for (let attr of attrs) this.getAttribute(attr)?.setRequiredLevel(requirementLevel);
        } catch (ex: any) {
            console.log('[ERROR]: ' + ex.message);
        }
    }

    setSubmitModes(attrs: string[], mode: Constants.SubmitMode) {
        try {
            if (attrs && Array.isArray(attrs)) for (let attr of attrs) this.getAttribute(attr)?.setSubmitMode(mode);
        } catch (ex: any) {
            console.log('[ERROR]: ' + ex.message);
        }
    }

    clearAttributeValues(attrs: string[]) {
        if (attrs && Array.isArray(attrs)) for (let attr of attrs) this.getAttribute(attr).setValue(null);
    }

    getAll(): any[] {
        try {
            if (formContext['getAttribute']) return formContext['getAttribute']();
        } catch (ex: any) {
            console.log('[ERROR]: ' + ex.message);
        }
        return [];
    }
}

export const _Attributes = Attributes.getInstance();