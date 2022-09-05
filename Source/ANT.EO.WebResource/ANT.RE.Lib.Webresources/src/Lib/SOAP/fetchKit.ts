import { GlobalContext } from "../Context/GlobalContext/globalcontext"
import { logger } from "../Logger/logger";
import { executeRequest, getFetchResult, injectPagingDetails, xmlEncode, $ } from "./common";
import { ISoapFetchKit } from "./fetchKit.interface";

export class FetchKit extends GlobalContext implements ISoapFetchKit {
    constructor() {
        super()
    }

    fetchMore = (fetchxml: any, opt_asyn: boolean) => {
        try {
            return _fetchMore(this.getClientUrl(), fetchxml, opt_asyn)
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.fetchMore")
        }
    }

    fetchAll = (fetchxml: any, opt_page: any) => {
        try {
            return _fetchAll(this.getClientUrl(), fetchxml, opt_page)

        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.fetchAll")
        }
    }

    fetch = (fetchxml: any, opt_asyn: boolean) => {
        try {
            return _fetch(this.getClientUrl(), fetchxml, opt_asyn);
        }
        catch (e: any) {
            logger.Critical(e.message, "SOAP.fetch")
        }
    }
}

/// Aync-only: Loads all records (recursive with paging cookie)
///
const _fetchAll = (clientUrl: string, fetchxml: any, opt_page: any) => {
    // defered object
    var dfd = $.Deferred(),
        allRecords: any = [],
        page = opt_page || 1;
    // execute the fetch an receive the details (paging-cookie..)
    _fetchMore(clientUrl, fetchxml, true).then(function (result: any) {
        // add the elements to the collection
        allRecords = allRecords.concat(result.entities);
        if (result.moreRecords) {
            // increase the page-number
            page++;
            // add page-number & paging-cookie
            var paging_fetchxml = injectPagingDetails(fetchxml, page, result.pagingCookie);
            // recursive call
            _fetchAll(clientUrl, paging_fetchxml, page).then(function (collection: any) {
                // add the items to the collection
                allRecords = allRecords.concat(collection);
                dfd.resolve(allRecords);
            }, dfd.reject);
        }
        else {
            dfd.resolve(allRecords);
        }
    }, dfd.reject);
    return dfd.promise();
}

const _fetchMore = (clientUrl: string, fetchxml: any, opt_asyn: boolean) => {
    // default is true
    opt_asyn = (opt_asyn === false) ? false : true;
    // defered object
    var dfd = $.Deferred(),
        request = ['<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">',
            ' <s:Body>',
            '  <Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services">',
            '     <request i:type="b:RetrieveMultipleRequest" xmlns:b="http://schemas.microsoft.com/xrm/2011/Contracts" ',
            '         xmlns:i="http://www.w3.org/2001/XMLSchema-instance">',
            '             <b:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic">',
            '             <b:KeyValuePairOfstringanyType>',
            '                 <c:key>Query</c:key>',
            '                 <c:value i:type="b:FetchExpression">',
            '                     <b:Query>',
            xmlEncode(fetchxml),
            '                     </b:Query>',
            '                 </c:value>',
            '             </b:KeyValuePairOfstringanyType>',
            '         </b:Parameters>',
            '         <b:RequestId i:nil="true"/>',
            '         <b:RequestName>RetrieveMultiple</b:RequestName>',
            '     </request>',
            ' </Execute>',
            '</s:Body></s:Envelope>'].join('');
    executeRequest(clientUrl, request, opt_asyn).then(function (data: any) {
        dfd.resolve(getFetchResult(data));
    }, dfd.reject);
    // return the promise object
    return dfd.promise();
}

///
/// Executes a fetch-request an returns a promies object
///
const _fetch = (clientUrl: string, fetchxml: any, opt_asyn: boolean) => {
    // default is true
    opt_asyn = (opt_asyn === false) ? false : true;
    // defered object
    var dfd = $.Deferred();
    _fetchMore(clientUrl, fetchxml, opt_asyn).then(function (result: any) {
        dfd.resolve(result.entities);
    })
        .fail(dfd.reject);
    return dfd.promise();
}
