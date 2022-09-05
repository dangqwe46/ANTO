import { Grid } from "./grid";

export interface IGridContext extends Grid {
    /*  The logical name of the table data displayed in the grid. */
    getEntityName(): string

    /*  Gets the FetchXML query that represents the current data, including filtered and sorted data, in the grid control.	 */
    getFetchXml(): string

    /* Gets the grid type (grid or subgrid). 
        1	HomePageGrid
        2	Subgrid */
    getGridType(): string

    /*  A relationship object with the following:
        attributeName: String. Name of the column.
        name: String. Name of the relationship.
        navigationPropertyName: String. Name of the navigation property for this relationship.
        relationshipType: Number. Returns one of the following values to indicate the relationship type:
        0: OneToMany
        1: ManyToMany
        roleType: Number. Returns one of the following values to indicate the role type of relationship:
        1: Referencing
        2: AssociationEntity */
    getRelationship(): any;

    /*  Gets the URL of the current grid control.
     client	Number	No	Indicates the client type. You can specify one of the following values:
     0: Browser
     1: MobileApplication */

    getUrl(client: number): string

    /*  Method to access the ViewSelector available for the grid control. */
    getViewSelector(): any

    /* This method does nothing if the grid is not filtered based on a relationship. */
    openRelatedGrid(): void

    /* Refreshes the grid. */
    refresh(): any

    /*  Refreshes the ribbon rules for the grid control. */
    refreshRibbon(): any
}


