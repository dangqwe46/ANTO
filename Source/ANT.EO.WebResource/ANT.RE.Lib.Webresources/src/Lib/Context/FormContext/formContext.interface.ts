export interface IFormContext {

    /* Saves the record asynchronously with the option to set callback functions to be executed after the save operation is completed. */
    save(option: string): Promise<{}>;

    /* Asynchronously refreshes and optionally saves all the data of the form without reloading the page. The form data onload event occurs after the data is refreshed. */
    refresh(save: boolean): Promise<{}>;

    /* Gets the form type for the record.
    0	Undefined
    1	Create
    2	Update
    3	Read Only
    4	Disabled
    6	Bulk Edit */
    getFormType(): number;

    /* Causes the ribbon to re-evaluate data that controls what is displayed in it. */
    refreshRibbon(refreshAll: boolean): void;

    /*  Displays form level notifications. */
    setFormNotification(message: string, level: string, uniqueId: string): void;

    /* Removes form level notifications. */
    clearFormNotification(uniqueId: string): void;

    /*  Gets a boolean value indicating whether the form data has been modified. */
    getIsDirty(): boolean;

    /* Gets a boolean value indicating whether all of the form data is valid. 
    This includes the main table and any unbound columns. I
    f the form has empty, required columns on it, control-level error notifications is shown. */
    isValid(): boolean;

    /* The viewport is the area of the page containing form data. */
    getViewPortHeight(): number;

    /* The viewport is the area of the page containing form data. */
    getViewPortWidth(): number;

    /* The HTML Window.close method is suppressed.
    To close a form window, you must use this method.  */
    close(): void

    /*  A collection of all the form items accessible to the current user. */
    getFormSelector(id?: string): any

    /* Returns a reference to the form currently being shown. When only one form is available this method will return null */
    getCurrentItem(): any

    /* Return navigation item with method 
     getId	Returns the name of the item.
     getLabel	Returns the label for the item.
     getVisible	Returns a value that indicates whether the item is currently visible.
     setFocus	Sets the focus on the item.
     setLabel	Sets the label for the item.
     setVisible	Sets a value that indicates whether the item is visible. */
    navigation(): any

    quickForms(): any
}
