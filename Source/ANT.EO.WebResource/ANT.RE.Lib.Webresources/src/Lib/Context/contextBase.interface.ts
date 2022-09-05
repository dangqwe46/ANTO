export interface IContextBase {

    /* context is Global Context or Form Context or Grid Context */
    context: any;

    /* set context */
    init(context: any): void

    /* Get Page Context D365 */
    get getPageContext(): any
}