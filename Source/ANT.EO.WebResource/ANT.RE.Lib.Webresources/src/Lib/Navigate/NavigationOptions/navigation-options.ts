import { INavigationOptions } from "./navigation-options.interface";

export class NavigationOptions implements  INavigationOptions{
    constructor(
        public target: 1 | 2 = 1, 
        public width?: number | { value: number; unit: string },
        public height?:number | { value: number; unit: string },
        public position?: 1 | 2,
        public title?: string){
    }
}
