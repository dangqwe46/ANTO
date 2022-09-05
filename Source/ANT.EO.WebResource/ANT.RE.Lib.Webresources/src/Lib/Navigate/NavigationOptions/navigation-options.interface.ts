
export interface INavigationOptions {
    target: 1 | 2;
    width?: number | { value: number; unit: string };
    height?: number | { value: number; unit: string };
    position?: 1 | 2;
    title?: string;
}
