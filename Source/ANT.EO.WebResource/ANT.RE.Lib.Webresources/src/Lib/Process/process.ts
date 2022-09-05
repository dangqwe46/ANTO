import { logger } from '../Logger/logger';
import { IProcess } from './process.interface';

class Process implements IProcess {
  constructor() {}

  getDisplayState(): any {
    try {
      return formContext.ui.process.getDisplayState();
    } catch (e: any) {
      logger.Error(e.message, 'Process.getDisplayState');
    }
  }
  getVisible(): any {
    try {
      return formContext.ui.process.getVisible();
    } catch (e: any) {
      logger.Error(e.message, 'Process.getVisible');
    }
  }
  reflow(updateUI: boolean, parentStage: string, nextStage: string): void {
    try {
      formContext.ui.process.reflow(updateUI, parentStage, nextStage);
    } catch (e: any) {
      logger.Error(e.message, 'Process.reflow');
    }
  }
  setDisplayState(state: string): void {
    try {
      formContext.ui.process.setDisplayState(state);
    } catch (e: any) {
      logger.Error(e.message, 'Process.setDisplayState');
    }
  }

  addOnPreProcessStatusChange(fuc: any): void {
    try {
      formContext['data']['process']['addOnPreProcessStatusChange'](fuc);
    } catch (e: any) {
      logger.Error(e.message, 'Process.addOnPreProcessStatusChange');
    }
  }
  removeOnPreProcessStatusChange(fuc: any): void {
    try {
      formContext['data']['process']['removeOnPreProcessStatusChange'](fuc);
    } catch (e: any) {
      logger.Error(e.message, 'Process.removeOnPreProcessStatusChange');
    }
  }
  addOnProcessStatusChange(fuc: any): void {
    try {
      formContext['data']['process']['addOnProcessStatusChange'](fuc);
    } catch (e: any) {
      logger.Error(e.message, 'Process.addOnProcessStatusChange');
    }
  }
  removeOnProcessStatusChange(fuc: any): void {
    try {
      formContext['data']['process']['removeOnProcessStatusChange'](fuc);
    } catch (e: any) {
      logger.Error(e.message, 'Process.removeOnProcessStatusChange');
    }
  }
  addOnStageChange(fuc: any): void {
    try {
      formContext['data']['process']['addOnStageChange'](fuc);
    } catch (e: any) {
      logger.Error(e.message, 'Process.addOnStageChange');
    }
  }
  removeOnStageChange(fuc: any): void {
    try {
      formContext['data']['process']['removeOnStageChange'](fuc);
    } catch (e: any) {
      logger.Error(e.message, 'Process.removeOnStageChange');
    }
  }
  addOnStageSelected(fuc: any): void {
    try {
      formContext['data']['process']['addOnStageSelected'](fuc);
    } catch (e: any) {
      logger.Error(e.message, 'Process.addOnStageSelected');
    }
  }
  removeOnStageSelected(fuc: any): void {
    try {
      formContext['data']['process']['removeOnStageSelected'](fuc);
    } catch (e: any) {
      logger.Error(e.message, 'Process.removeOnStageSelected');
    }
  }
  getActiveProcess() {
    try {
      formContext['data']['process']['getActiveProcess']();
    } catch (e: any) {
      logger.Error(e.message, 'Process.getActiveProcess');
    }
  }
  setActiveProcess(processId: string, callbackFunction: any): void {
    try {
      formContext['data']['process']['setActiveProcess'](processId, callbackFunction);
    } catch (e: any) {
      logger.Error(e.message, 'Process.setActiveProcess');
    }
  }
  getProcessInstances(callbackFunction: any): void {
    try {
      formContext['data']['process']['getProcessInstances'](callbackFunction);
    } catch (e: any) {
      logger.Error(e.message, 'Process.getProcessInstances');
    }
  }
  setActiveProcessInstance(processInstanceId: string, callbackFunction: any): void {
    try {
      formContext['data']['process']['setActiveProcessInstance'](processInstanceId, callbackFunction);
    } catch (e: any) {
      logger.Error(e.message, 'Process.setActiveProcessInstance');
    }
  }
  getInstanceId(): any {
    try {
      return formContext['data']['process']['getInstanceId']();
    } catch (e: any) {
      logger.Error(e.message, 'Process.getInstanceId');
    }
  }
  getInstanceName(): any {
    try {
      return formContext['data']['process']['getInstanceName']();
    } catch (e: any) {
      logger.Error(e.message, 'Process.getInstanceName');
    }
  }
  getStatus(): any {
    try {
      return formContext['data']['process']['getStatus']();
    } catch (e: any) {
      logger.Error(e.message, 'Process.getStatus');
    }
  }
  setStatus(status: string, callbackFunction: any): void {
    try {
      formContext['data']['process']['setStatus'](status, callbackFunction);
    } catch (e: any) {
      logger.Error(e.message, 'Process.setStatus');
    }
  }
  getActiveStage() {
    try {
      formContext['data']['process']['getActiveStage']();
    } catch (e: any) {
      logger.Error(e.message, 'Process.getActiveStage');
    }
  }
  setActiveStage(stageId: string, callbackFunction: any): void {
    try {
      formContext['data']['process']['setActiveStage'](stageId, callbackFunction);
    } catch (e: any) {
      logger.Error(e.message, 'Process.setActiveStage');
    }
  }
  moveNext(callbackFunction: any): void {
    try {
      formContext['data']['process']['moveNext'](callbackFunction);
    } catch (e: any) {
      logger.Error(e.message, 'Process.moveNext');
    }
  }
  movePrevious(callbackFunction: any): void {
    try {
      formContext['data']['process']['movePrevious'](callbackFunction);
    } catch (e: any) {
      logger.Error(e.message, 'Process.movePrevious');
    }
  }
  getActivePath(): any {
    try {
      formContext['data']['process']['getActivePath']();
    } catch (e: any) {
      logger.Error(e.message, 'Process.getActivePath');
    }
  }
  getEnabledProcesses(callbackFunction: any): void {
    try {
      formContext['data']['process']['getEnabledProcesses'](callbackFunction);
    } catch (e: any) {
      logger.Error(e.message, 'Process.getEnabledProcesses');
    }
  }
  getSelectedStage() {
    try {
      formContext['data']['process']['getSelectedStage']();
    } catch (e: any) {
      logger.Error(e.message, 'Process.getSelectedStage');
    }
  }
}

export const _Process = new Process();
