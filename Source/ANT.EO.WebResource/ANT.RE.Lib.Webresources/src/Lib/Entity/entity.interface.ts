export interface IEntity {
    /* Returns a string representing the XML that will be sent to the server when the record is saved.
     Only data in columns that have changed or have their submit mode set to "always" are sent to the server. */
    getDataXml(): string

    /* Returns a string representing the logical name of the table for the record.*/
    getEntityName(): string

    /*  Returns a lookup value that references the record. */
    getEntityReference(): any

    /* Returns a string representing the GUID value for the record. */
    getId(): string

    /* Gets a string for the value of the primary column of the table. */
    getPrimaryAttributeValue(): string


}