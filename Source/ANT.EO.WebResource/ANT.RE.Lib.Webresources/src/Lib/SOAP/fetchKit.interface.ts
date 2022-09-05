export interface ISoapFetchKit {
    fetchMore(fetchxml: any, opt_asyn: boolean): any
    fetchAll(fetchxml: any, opt_page: any): any
    fetch(fetchxml: any, opt_asyn: boolean): any
}