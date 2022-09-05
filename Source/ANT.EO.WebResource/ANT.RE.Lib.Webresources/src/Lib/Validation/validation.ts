class Validation {
  private constructor() {}
  private static _instance: Validation;
  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  isFetchXml(fetchXml: string): boolean {
    try {
      if (typeof fetchXml !== 'string') return false;
      const parser = new DOMParser();
      const dom = parser.parseFromString(fetchXml, 'text/xml');
      return dom.documentElement.nodeName === 'fetch';
    } catch (ex : any) {
      console.log(ex.message);
      return false;
    }
  }

  isEmail(email: string): boolean {
    try {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    } catch (ex: any) {
      console.log(ex.message);
      return false;
    }
  }

  isPhoneNumber(str: string): boolean {
    try {
      return /^\+?\d+$/.test(str);
    } catch (ex: any) {
      console.log(ex.message);
      return false;
    }
  }
}

export const _Validation = Validation.getInstance();
