export interface IProcess {
    /* Adds a function as an event handler for the OnPreProcessStatusChange event so that it will be called before the business process flow status changes. */
    addOnPreProcessStatusChange(fuc: any): void

    /* Removes an event handler from the OnPreProcessStatusChange event. */
    removeOnPreProcessStatusChange(fuc: any): void

    /* Adds a function as an event handler for the OnProcessStatusChange event so that it will be called when the business process flow status changes. */
    addOnProcessStatusChange(fuc: any): void

    /* Removes an event handler from the OnProcessStatusChange event. */
    removeOnProcessStatusChange(fuc: any): void

    /* Adds a function as an event handler for the OnStageChange event so that it will be called when the business process flow stage changes. */
    addOnStageChange(fuc: any): void

    /* Removes an event handler from the OnStageChange event. */
    removeOnStageChange(fuc: any): void

    /*  Adds a function as an event handler for the OnStageSelected event so that it will be called when a business process flow stage is selected. */
    addOnStageSelected(fuc: any): void

    /* Removes an event handler from the OnStageSelected event. */
    removeOnStageSelected(fuc: any): void

    /* Returns a Process object representing the active process. */
    getActiveProcess(): any

    /* Sets a Process as the active process. */
    setActiveProcess(processId: string, callbackFunction: any): void

    /* Returns all the process instances for the table record that the calling user has access to */
    getProcessInstances(callbackFunction: any): void

    /* Sets a process instance as the active instance. */
    setActiveProcessInstance(processInstanceId: string, callbackFunction: any): void;

    /*  Returns the unique identifier of the process instance. */
    getInstanceId(): string

    /*  Returns the name of the process instance. */
    getInstanceName(): string

    /* Returns the current status of the process instance. */
    getStatus(): string

    /*  Sets the current status of the active process instance. */
    setStatus(status: string, callbackFunction: any): void

    /*  Returns a Stage object representing the active stage. */
    getActiveStage(): any;

    /*  Sets a completed stage as the active stage. */
    setActiveStage(stageId: string, callbackFunction: any): void;

    /*  Progresses to the next stage. */
    moveNext(callbackFunction: any): void

    /* Moves to the previous stage. */
    movePrevious(callbackFunction: any): void;

    /* Gets a collection of stages currently in the active path with methods to interact with the stages displayed in the business process flow control. */
    getActivePath(): any;

    /* Asynchronously retrieves the business process flows enabled for a table that the current user can switch to. */
    getEnabledProcesses(callbackFunction: any): void;

    /*  Gets the currently selected stage. */
    getSelectedStage(): any

    /* Returns "expanded" or "collapsed" on the legacy web client; returns "expanded", "collapsed", or "floating" on Unified Interface. */
    getDisplayState(): string

    /* true if the control is visible; false otherwise. */
    getVisible(): boolean

    /*  updateUI	Boolean	No	Specify true to update the UI of the process control; false otherwise.
     parentStage	String	No	Specify the ID of the parent stage in the GUID format.
     nextStage	String	No	Specify the ID of the next stage in the GUID format. */
    reflow(updateUI: boolean, parentStage: string, nextStage: string): void

    /* state	String	Yes	Specify "expanded", "collapsed", or "floating".The value "floating" is not supported on the web client. */
    setDisplayState(state: string): void


}